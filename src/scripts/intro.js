import { initIntroDots } from "./intro-dots";
import { initIntroPalette } from "./intro-palette";
import { initIntroCarousel } from "./intro-carousel";

export function initIntroView() {
  const view = document.querySelector(".intro-view");
  const page = document.querySelector(".page");
  const button = view?.querySelector(".intro-enter");
  if (!view || !page || !button || view.dataset.initialized) return;
  view.dataset.initialized = "true";
  view.dataset.open = "true";

  const images = JSON.parse(view.querySelector("#intro-images").textContent);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const inputs = new AbortController();
  const options = { signal: inputs.signal };
  const wasInert = page.inert;
  page.inert = true;
  view.focus({ preventScroll: true });

  const activeIndex = Number(view.dataset.activeIndex);
  let closed = false;
  const modulo = value => (value % images.length + images.length) % images.length;

  view.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      event.preventDefault();
      button.focus({ preventScroll: true });
    }
  }, options);

  function closeIntroView() {
    if (closed) return;
    closed = true;
    view.dataset.open = "false";
    view.dispatchEvent(new Event("intro:pause"));
    document.dispatchEvent(new Event("intro:visibility"));
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
  document.querySelector('[data-nav="home"]')?.addEventListener("click", () => {
    if (!closed || !view.hidden) return;
    closed = false;
    view.dataset.open = "true";
    page.inert = true;
    view.hidden = false;
    view.inert = false;
    button.disabled = false;
    // Establish the offscreen position after display:none before transitioning in.
    if (!reducedMotion.matches) void view.offsetWidth;
    view.classList.remove("is-closing");
    view.dispatchEvent(new Event("intro:resume"));
    document.dispatchEvent(new Event("intro:visibility"));
    view.focus({ preventScroll: true });
  });

  // Keep the default palette and masks until every teaser has finished decoding.
  // Entry to the portfolio remains available even on a slow or failed connection.
  async function preloadIntroImages() {
    const started = performance.now();
    const order = [...new Set([0, -1, 1, -2, 2, -3, 3, ...images.map((_, i) => i)].map(offset => modulo(activeIndex + offset)))];
    async function worker() {
      while (order.length) {
        const image = new Image();
        image.src = images[order.shift()].src;
        try { await image.decode(); } catch { /* A failed asset must not trap the intro. */ }
      }
    }
    await Promise.all(Array.from({ length: 4 }, worker));
    await Promise.allSettled([...view.querySelectorAll('.intro-card img')].map(image => image.decode()));
    await new Promise(resolve => setTimeout(resolve, Math.max(0, 1000 - (performance.now() - started))));
    view.classList.add('is-revealing');
    await new Promise(resolve => setTimeout(resolve, reducedMotion.matches ? 0 : 470));
    view.classList.add('is-ready');
    initIntroDots(view, inputs.signal);
    const updateIntroPaletteForActiveCard = initIntroPalette(view, inputs.signal);
    initIntroCarousel(view, images, inputs.signal, updateIntroPaletteForActiveCard);
    if (closed) view.dispatchEvent(new Event("intro:pause"));
  }
  void preloadIntroImages();
}
