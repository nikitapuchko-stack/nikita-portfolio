export function relativeLuminance(rgb) {
  const linear = rgb.map(channel => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

export function contrastRatio(a, b) {
  const first = relativeLuminance(a), second = relativeLuminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

const mix = (rgb, target, amount) => rgb.map(channel => Math.round(channel + (target - channel) * amount));

export function getRepresentativeColors(imageData) {
  const pixels = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i + 3] < 128) continue;
    const rgb = Array.from(imageData.data.slice(i, i + 3));
    pixels.push({ rgb, luminance: relativeLuminance(rgb) });
  }
  if (!pixels.length) return null;
  pixels.sort((a, b) => a.luminance - b.luminance);
  // Trim extreme shadows/highlights, then trim channel outliers within each band.
  const representative = (from, to) => {
    const group = pixels.slice(Math.floor(pixels.length * from), Math.max(Math.floor(pixels.length * from) + 1, Math.ceil(pixels.length * to)));
    return [0, 1, 2].map(channel => {
      const values = group.map(pixel => pixel.rgb[channel]).sort((a, b) => a - b);
      const trim = Math.floor(values.length * 0.1);
      const kept = values.slice(trim, values.length - trim);
      return Math.round(kept.reduce((sum, value) => sum + value, 0) / kept.length);
    });
  };
  const darkColor = representative(0.1, 0.3);
  const lightColor = representative(0.7, 0.9);
  const darkLuminance = relativeLuminance(darkColor);
  const lightLuminance = relativeLuminance(lightColor);
  const midpoint = (darkLuminance + lightLuminance) / 2;
  const lightCount = pixels.filter(pixel => pixel.luminance >= midpoint).length;
  // A uniform image has no meaningful split: use its actual perceived lightness.
  const lightDominant = lightLuminance - darkLuminance < 0.025
    ? pixels[Math.floor(pixels.length / 2)].luminance >= 0.215
    : lightCount >= pixels.length - lightCount;
  let dark = darkColor, light = lightColor;
  // At most 30% correction toward the endpoints, keeping the extracted hues.
  for (let amount = 0.05; contrastRatio(dark, light) < 4.5 && amount <= 0.301; amount += 0.05) {
    dark = mix(darkColor, 0, amount);
    light = mix(lightColor, 255, amount);
  }
  const background = lightDominant ? dark : light;
  let foreground = lightDominant ? light : dark;
  if (contrastRatio(background, foreground) < 4.5) {
    foreground = contrastRatio(background, [0, 0, 0]) >= contrastRatio(background, [255, 255, 255])
      ? [0, 0, 0] : [255, 255, 255];
  }
  return { background, foreground };
}

export function initIntroPalette(view, signal) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 48;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const cache = new Map();
  let version = 0;
  let cancelPending = () => {};

  function analyzeIntroImagePalette(image) {
    if (!context || !image.complete || !image.naturalWidth) return null;
    try {
      context.clearRect(0, 0, 48, 48);
      context.drawImage(image, 0, 0, 48, 48);
      return getRepresentativeColors(context.getImageData(0, 0, 48, 48));
    } catch {
      return null; // Retain the current palette if an asset cannot be sampled.
    }
  }

  function applyIntroPalette(palette) {
    if (!palette) return;
    view.style.setProperty("--intro-bg", `rgb(${palette.background.join(", ")})`);
    view.style.setProperty("--intro-fg", `rgb(${palette.foreground.join(", ")})`);
  }

  function updateIntroPaletteForActiveCard() {
    cancelPending();
    const requestedVersion = ++version;
    if (signal.aborted) return;
    const image = view.querySelector('.intro-card[data-slot="0"]');
    if (!image) return;
    const src = image.src;
    const ready = () => {
      cancelPending();
      if (signal.aborted || requestedVersion !== version || image.src !== src || image.dataset.slot !== "0") return;
      if (!cache.has(src)) {
        const palette = analyzeIntroImagePalette(image);
        if (palette) cache.set(src, palette);
      }
      applyIntroPalette(cache.get(src));
    };
    if (cache.has(src)) applyIntroPalette(cache.get(src));
    else if (image.complete) ready();
    else {
      const cleanup = () => {
        image.removeEventListener("load", ready);
        image.removeEventListener("error", cleanup);
      };
      cancelPending = cleanup;
      image.addEventListener("load", ready, { once: true });
      image.addEventListener("error", cleanup, { once: true });
    }
  }
  signal.addEventListener("abort", () => { version++; cancelPending(); cache.clear(); }, { once: true });
  updateIntroPaletteForActiveCard();
  return updateIntroPaletteForActiveCard;
}
