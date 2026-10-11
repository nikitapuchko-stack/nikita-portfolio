// Keep browser chrome and overscroll backgrounds in step with the rendered intro.
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
  // Recent Safari samples fixed surfaces at viewport edges. Give each edge
  // its own small, opaque surface rather than the full-screen animated dialog.
  const edges = ["top", "bottom"].map(edge => {
    const element = document.createElement("div");
    element.className = `intro-browser-edge intro-browser-edge-${edge}`;
    element.setAttribute("aria-hidden", "true");
    Object.assign(element.style, {
      position: "fixed", left: "0", right: "0", [edge]: "0",
      height: `max(4px, env(safe-area-inset-${edge}, 0px))`,
      zIndex: "1001", pointerEvents: "none", display: "none",
    });
    document.body.append(element);
    return element;
  });
  let raf = null;
  let until = 0;
  let lastColor = null;

  function restore() {
    for (const edge of edges) edge.style.display = "none";
    if (lastColor === null) return;
    for (const { element, value, priority } of backgrounds) {
      if (value) element.style.setProperty("background-color", value, priority);
      else element.style.removeProperty("background-color");
    }
    if (!existingMeta) meta.remove();
    else if (originalContent === null) meta.removeAttribute("content");
    else meta.setAttribute("content", originalContent);
    lastColor = null;
  }

  function sync(now) {
    raf = null;
    if (signal.aborted || !mobile.matches || view.hidden) {
      restore();
      return;
    }
    // Sample the actual CSS transition rather than jumping to its target color.
    const color = getComputedStyle(view).backgroundColor;
    if (color !== lastColor) {
      if (!meta.isConnected) document.head.append(meta);
      meta.setAttribute("content", color);
      for (const { element } of backgrounds) element.style.setProperty("background-color", color);
      for (const edge of edges) {
        edge.style.display = "block";
        edge.style.backgroundColor = color;
      }
      lastColor = color;
    }
    if (now < until) raf = requestAnimationFrame(sync);
  }

  function schedule() {
    if (signal.aborted) return;
    until = performance.now() + 550;
    if (raf === null) raf = requestAnimationFrame(sync);
  }

  const observer = new MutationObserver(schedule);
  observer.observe(view, { attributes: true, attributeFilter: ["style", "class", "hidden"] });
  mobile.addEventListener("change", schedule, { signal });
  window.addEventListener("pageshow", schedule, { signal });
  window.visualViewport?.addEventListener("resize", schedule, { signal });
  signal.addEventListener("abort", () => {
    observer.disconnect();
    if (raf !== null) cancelAnimationFrame(raf);
    restore();
    for (const edge of edges) edge.remove();
  }, { once: true });
  schedule();
}
