import animation from "../data/intro-dots.json";

// Original GIF frame boundaries, including repeated frames and blank pauses.
const frameEnds = [];
animation.delays.reduce((elapsed, delay) => {
  frameEnds.push(elapsed + delay);
  return elapsed + delay;
}, 0);

export function introDotFrameAt(elapsed) {
  const time = ((elapsed % animation.duration) + animation.duration) % animation.duration;
  let low = 0, high = frameEnds.length - 1;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (time < frameEnds[middle]) high = middle;
    else low = middle + 1;
  }
  return low;
}

export function initIntroDots(view, signal) {
  const svg = view.querySelector("[data-intro-dots]");
  if (!svg || signal.aborted) return;
  const circles = [...svg.querySelectorAll("circle")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const options = { signal };
  let visible = new Set();
  let previousState = -1;
  let raf = null;
  let startedAt = performance.now();
  let elapsed = 0;
  let running = false;

  function render(frame) {
    const state = animation.timeline[frame];
    if (state === previousState) return;
    previousState = state;
    const next = new Set(animation.states[state]);
    for (const id of visible) if (!next.has(id)) circles[id].setAttribute("opacity", "0");
    for (const id of next) if (!visible.has(id)) circles[id].setAttribute("opacity", "1");
    visible = next;
  }

  function tick(now) {
    if (!running || signal.aborted) return;
    // No interpolation or random noise: preserve the reference's 25 fps flicker.
    render(introDotFrameAt(elapsed + now - startedAt));
    raf = requestAnimationFrame(tick);
  }

  function pause() {
    if (running) elapsed += performance.now() - startedAt;
    running = false;
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
  }

  function resume() {
    if (signal.aborted || document.hidden || view.hidden || view.dataset.open === "false") return;
    if (reducedMotion.matches) {
      render(animation.reducedMotionFrame);
    } else if (!running) {
      startedAt = performance.now();
      running = true;
      render(introDotFrameAt(elapsed));
      raf = requestAnimationFrame(tick);
    }
  }

  document.addEventListener("visibilitychange", () => document.hidden ? pause() : resume(), options);
  window.addEventListener("pagehide", pause, options);
  window.addEventListener("pageshow", resume, options);
  view.addEventListener("intro:pause", pause, options);
  view.addEventListener("intro:resume", resume, options);
  reducedMotion.addEventListener("change", () => { pause(); resume(); }, options);
  signal.addEventListener("abort", pause, { once: true });
  resume();
}
