const modulo = (value, length) => ((value % length) + length) % length;
const slotStates = [
  { x: 0, scale: 1, opacity: 1 },
  { x: 21, scale: 0.8, opacity: 1 },
  { x: 42, scale: 0.6, opacity: 1 },
  { x: 55, scale: 0, opacity: 0 },
];

export function getInterpolatedSlotState(relativePosition) {
  const distance = Math.min(3, Math.abs(relativePosition));
  const lower = Math.min(2, Math.floor(distance));
  const fraction = distance - lower;
  const from = slotStates[lower], to = slotStates[lower + 1];
  const lerp = key => from[key] + (to[key] - from[key]) * fraction;
  return {
    x: Math.sign(relativePosition) * lerp("x"),
    scale: lerp("scale"),
    opacity: lerp("opacity"),
    zIndex: Math.round(30 - distance * 10),
  };
}

export function normalizeWheelDelta(event, viewportHeight) {
  const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewportHeight : 1;
  // Bound a single abnormal impulse, while retaining proportional small trackpad deltas.
  return Math.max(-1200, Math.min(1200, event.deltaY * unit));
}

export function initIntroCarousel(view, images, signal, onCenterChange) {
  const carousel = view.querySelector(".intro-carousel");
  const cards = [...carousel.querySelectorAll(".intro-card")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const options = { signal };
  const pixelsPerCard = 240;
  const wheelSensitivity = 0.012;
  let activeIndex = Number(view.dataset.activeIndex);
  let currentPosition = activeIndex;
  let targetPosition = activeIndex;
  let visualCenter = activeIndex;
  let carouselRaf = null, scrollEndTimer;
  let lastMotionTime = 0;
  let snapping = false;
  let touch = null;
  // The seven DOM nodes form a ring keyed by virtual index, never by array order.
  const pool = new Map(cards.map(card => [modulo(activeIndex + Number(card.dataset.slot), cards.length), card]));

  function renderIntroCarouselPosition() {
    if (signal.aborted || !images.length) return;
    const nearest = Math.round(currentPosition);
    for (let slot = -3; slot <= 3; slot++) {
      const virtualIndex = nearest + slot;
      const card = pool.get(modulo(virtualIndex, cards.length));
      const image = images[modulo(virtualIndex, images.length)];
      if (card.getAttribute("src") !== image.src) {
        card.src = image.src;
        card.width = image.width;
        card.height = image.height;
        card.alt = image.alt;
      }
      const state = getInterpolatedSlotState(virtualIndex - currentPosition);
      card.dataset.slot = String(slot);
      card.dataset.virtualIndex = String(virtualIndex);
      card.style.setProperty("--intro-x", `${state.x}%`);
      card.style.setProperty("--intro-scale", String(state.scale));
      card.style.opacity = String(state.opacity);
      card.style.zIndex = String(state.zIndex);
      if (slot === 0) card.setAttribute("aria-current", "true");
      else card.removeAttribute("aria-current");
      card.setAttribute("aria-hidden", String(slot !== 0));
    }
    view.dataset.carouselPosition = String(currentPosition);
    if (nearest !== visualCenter) {
      visualCenter = nearest;
      onCenterChange();
    }
  }

  function updateIntroCarouselMotion(now) {
    carouselRaf = null;
    if (signal.aborted) return;
    const deltaTime = Math.min(0.05, Math.max(0, (now - lastMotionTime) / 1000));
    lastMotionTime = now;
    const lambda = snapping ? 14 : 10;
    currentPosition = reducedMotion.matches ? targetPosition
      : currentPosition + (targetPosition - currentPosition) * (1 - Math.exp(-lambda * deltaTime));
    const settled = Math.abs(targetPosition - currentPosition) < 0.0005;
    if (settled) currentPosition = targetPosition;
    renderIntroCarouselPosition();
    if (!settled) carouselRaf = requestAnimationFrame(updateIntroCarouselMotion);
    else if (snapping) {
      activeIndex = modulo(Math.round(targetPosition), images.length);
      view.dataset.activeIndex = String(activeIndex);
      snapping = false;
    }
  }

  function startMotion() {
    if (carouselRaf !== null || signal.aborted) return;
    lastMotionTime = performance.now();
    carouselRaf = requestAnimationFrame(updateIntroCarouselMotion);
  }

  function cancelSnap() {
    clearTimeout(scrollEndTimer);
    snapping = false;
  }

  function snapIntroCarousel(target = Math.round(targetPosition)) {
    cancelSnap();
    if (signal.aborted || !images.length) return;
    targetPosition = target;
    snapping = true;
    startMotion();
  }

  function moveBy(delta, sensitivity = 1 / pixelsPerCard) {
    cancelSnap();
    if (signal.aborted || images.length < 2) return;
    // Accumulate intent even while the current position is still catching up.
    targetPosition = Math.round((targetPosition + delta * sensitivity) * 1e9) / 1e9;
    startMotion();
  }

  view.addEventListener("wheel", event => {
    if (event.ctrlKey) return;
    event.preventDefault();
    event.stopPropagation();
    const delta = normalizeWheelDelta(event, view.clientHeight);
    if (!delta) return;
    moveBy(delta, wheelSensitivity);
    scrollEndTimer = setTimeout(() => snapIntroCarousel(), 120);
  }, { ...options, passive: false });

  carousel.addEventListener("touchstart", event => {
    cancelSnap();
    touch = event.touches.length === 1
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY, vertical: false }
      : null;
  }, { ...options, passive: true });
  carousel.addEventListener("touchmove", event => {
    if (!touch) return;
    if (event.touches.length !== 1) { touch = null; snapIntroCarousel(); return; }
    const point = event.touches[0];
    const dy = touch.y - point.clientY, dx = touch.x - point.clientX;
    if (!touch.vertical && Math.abs(dy) > 4 && Math.abs(dy) > Math.abs(dx)) touch.vertical = true;
    if (!touch.vertical) return;
    event.preventDefault();
    moveBy(dy);
    touch.y = point.clientY;
    touch.x = point.clientX;
  }, { ...options, passive: false });
  const finishTouch = () => { touch = null; snapIntroCarousel(); };
  carousel.addEventListener("touchend", finishTouch, options);
  carousel.addEventListener("touchcancel", finishTouch, options);

  view.addEventListener("keydown", event => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    snapIntroCarousel(Math.round(targetPosition) + direction);
  }, options);

  signal.addEventListener("abort", () => {
    cancelSnap();
    if (carouselRaf !== null) cancelAnimationFrame(carouselRaf);
    carouselRaf = null;
    touch = null;
  }, { once: true });
  renderIntroCarouselPosition();
}
