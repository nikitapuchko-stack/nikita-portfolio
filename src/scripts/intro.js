import { initIntroDots } from "./intro-dots";
import { initIntroPalette } from "./intro-palette";
import { initIntroCarousel } from "./intro-carousel";

export function initIntroView() {
  const view = document.querySelector(".intro-view");
  const page = document.querySelector(".page");
  const button = view?.querySelector(".intro-enter");
  if (!view || !page || !button || view.dataset.initialized) return;
  view.dataset.initialized = "true";

  const images = JSON.parse(view.querySelector("#intro-images").textContent);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const inputs = new AbortController();
  const options = { signal: inputs.signal };
  initIntroDots(view, inputs.signal);
  const updateIntroPaletteForActiveCard = initIntroPalette(view, inputs.signal);
  const wasInert = page.inert;
  page.inert = true;
  view.focus({ preventScroll: true });

  const activeIndex = Number(view.dataset.activeIndex);
  let closed = false;
  const modulo = value => (value % images.length + images.length) % images.length;
  initIntroCarousel(view, images, inputs.signal, updateIntroPaletteForActiveCard);

  view.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      event.preventDefault();
      button.focus({ preventScroll: true });
    }
  }, options);

  function closeIntroView() {
    if (closed) return;
    closed = true;
    inputs.abort();
    view.classList.add("is-closing");
    button.disabled = true;
    let finishTimer;
    const finish = () => {
      clearTimeout(finishTimer);
      view.removeEventListener("transitionend", onEnd);
      view.hidden = true;
      view.inert = true;
      page.inert = wasInert;
      page.querySelector(".nav-link.is-active")?.focus({ preventScroll: true });
    };
    const onEnd = event => {
      if (event.target === view && event.propertyName === "transform") finish();
    };
    if (reducedMotion.matches) finish();
    else {
      view.addEventListener("transitionend", onEnd);
      finishTimer = window.setTimeout(finish, 550);
    }
  }
  button.addEventListener("click", closeIntroView, options);

  // Warm the initial stack first, then the remaining assets one at a time.
  // This never holds up the overlay, CTA, or the existing site's initialization.
  async function preloadIntroImages() {
    const order = [...new Set([0, -1, 1, -2, 2, -3, 3, ...images.map((_, i) => i)].map(offset => modulo(activeIndex + offset)))];
    for (const index of order) {
      if (closed) break;
      const image = new Image();
      image.src = images[index].src;
      try { await image.decode(); } catch { /* A failed preview must not block entry. */ }
    }
  }
  if (images.length) void preloadIntroImages();
}
