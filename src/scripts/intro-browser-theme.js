// Apply the final palette synchronously, independently of the visible transition.
export function initIntroBrowserTheme(view, signal) {
  const mobile = window.matchMedia("(max-width: 960px)");
  const existingMeta = document.querySelector('meta[name="theme-color"]');
  const meta = existingMeta || document.createElement("meta");
  meta.name = "theme-color";
  const originalContent = meta.getAttribute("content");
  const backgrounds = [document.documentElement, document.body].map(element => ({
    element,
    value: element.style.getPropertyValue("background-color"),
    priority: element.style.getPropertyPriority("background-color"),
  }));
  const edges = ["top", "bottom"].map(edge => {
    const element = document.createElement("div");
    element.className = `safari-tint-sampler safari-tint-sampler--${edge}`;
    element.setAttribute("aria-hidden", "true");
    document.body.append(element);
    return element;
  });
  const initialStyle = getComputedStyle(view);
  let currentPalette = {
    background: initialStyle.getPropertyValue("--intro-bg").trim(),
    foreground: initialStyle.getPropertyValue("--intro-fg").trim(),
  };
  let applied = false;

  function restore() {
    for (const edge of edges) edge.classList.remove("is-active");
    if (!applied) return;
    for (const { element, value, priority } of backgrounds) {
      if (value) element.style.setProperty("background-color", value, priority);
      else element.style.removeProperty("background-color");
    }
    if (!existingMeta) meta.remove();
    else if (originalContent === null) meta.removeAttribute("content");
    else meta.setAttribute("content", originalContent);
    applied = false;
  }

  function applyIntroPalette({ background, foreground } = currentPalette) {
    if (signal.aborted) return;
    currentPalette = { background, foreground };
    view.style.setProperty("--intro-bg", background);
    view.style.setProperty("--intro-fg", foreground);
    if (view.hidden || !mobile.matches) {
      restore();
      return;
    }
    for (const { element } of backgrounds) element.style.backgroundColor = background;
    for (const edge of edges) {
      edge.style.setProperty("--intro-bg", background);
      edge.classList.add("is-active");
    }
    if (!meta.isConnected) document.head.append(meta);
    meta.setAttribute("content", background);
    applied = true;
  }

  const sync = () => applyIntroPalette();
  mobile.addEventListener("change", sync, { signal });
  window.addEventListener("pageshow", sync, { signal });
  signal.addEventListener("abort", () => {
    restore();
    for (const edge of edges) edge.remove();
  }, { once: true });
  sync();
  return { applyIntroPalette, restore };
}
