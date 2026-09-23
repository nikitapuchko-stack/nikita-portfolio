function initSidebarCustomScrollbar() {
  const sidebarPanel = document.querySelector(".scroll-panel.sidebar-panel");

  if (!sidebarPanel) return;

  const scroller = sidebarPanel.querySelector(".sidebar");
  const track = sidebarPanel.querySelector(".scroll-dot-track");
  const dot = sidebarPanel.querySelector(".scroll-dot");
  const upButton = sidebarPanel.querySelector(".scroll-up");
  const downButton = sidebarPanel.querySelector(".scroll-down");

  if (!scroller || !track || !dot) return;

  let dragging = false;

  function updateDot() {
    if (dragging) return;

    const maxScroll =
      scroller.scrollHeight - scroller.clientHeight;

    const maxDotTravel =
      track.clientHeight - dot.offsetHeight;

    if (maxScroll <= 0 || maxDotTravel <= 0) {
      dot.style.top = "0px";
      return;
    }

    const progress =
      scroller.scrollTop / maxScroll;

    dot.style.top =
      `${progress * maxDotTravel}px`;
  }

  upButton?.addEventListener("click", () => {
    scroller.scrollBy({
      top: -300,
      behavior: "smooth"
    });
  });

  downButton?.addEventListener("click", () => {
    scroller.scrollBy({
      top: 300,
      behavior: "smooth"
    });
  });

  dot.addEventListener("pointerdown", (event) => {
    dragging = true;

    dot.setPointerCapture(event.pointerId);

    event.preventDefault();
  });

  dot.addEventListener("pointermove", (event) => {
    if (!dragging) return;

    const trackRect =
      track.getBoundingClientRect();

    const maxDotTravel =
      track.clientHeight - dot.offsetHeight;

    let y =
      event.clientY -
      trackRect.top -
      dot.offsetHeight / 2;

    y = Math.max(
      0,
      Math.min(y, maxDotTravel)
    );

    dot.style.top = `${y}px`;

    const progress =
      maxDotTravel > 0
        ? y / maxDotTravel
        : 0;

    const maxScroll =
      scroller.scrollHeight -
      scroller.clientHeight;

    scroller.scrollTop =
      progress * maxScroll;
  });

  dot.addEventListener("pointerup", (event) => {
    dragging = false;

    if (dot.hasPointerCapture(event.pointerId)) {
      dot.releasePointerCapture(event.pointerId);
    }

    updateDot();
  });

  dot.addEventListener("pointercancel", () => {
    dragging = false;
    updateDot();
  });

  scroller.addEventListener("scroll", updateDot, { passive: true });
  window.addEventListener("resize", updateDot);

  updateDot();
}

function initSkillSetAnimation() {
  const sidebarElement = document.querySelector(".sidebar");
  const skillsBlock = document.querySelector(".skills");

  if (!sidebarElement || !skillsBlock) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    skillsBlock.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      root: sidebarElement,
      threshold: 0.1,
      rootMargin: "0px 0px -30% 0px"
    }
  );

  observer.observe(skillsBlock);
}

function destroyWorkLoopCarousel() {
  const scroller = document.querySelector(".work-panel .carousel");

  if (!scroller) return;

  if (scroller._loopScrollHandler) {
    scroller.removeEventListener(
      "scroll",
      scroller._loopScrollHandler
    );
  }

  if (scroller._loopResizeHandler) {
    window.removeEventListener(
      "resize",
      scroller._loopResizeHandler
    );
  }

  if (scroller._loopRafId) {
    cancelAnimationFrame(scroller._loopRafId);
  }

  if (scroller._loopResizeRafId) {
    cancelAnimationFrame(scroller._loopResizeRafId);
  }

  /*
   * В рабочем loop средний набор НЕ является clone.
   * Поэтому берём именно его как источник оригиналов.
   */
  let originals = Array.from(
    scroller.querySelectorAll(
      ".slide:not(.is-loop-clone)"
    )
  );

  /*
   * Fallback только если DOM по какой-то причине
   * уже не содержит original set.
   */
  if (
    !originals.length &&
    Array.isArray(scroller._originalSlides)
  ) {
    originals = scroller._originalSlides;
  }

  const restoredSlides = originals.map((slide) => {
    const clone = slide.cloneNode(true);

    clone.classList.remove(
      "is-loop-clone",
      "is-top"
    );

    return clone;
  });

  scroller.replaceChildren(...restoredSlides);

  scroller._originalSlides = restoredSlides.map(
    (slide) => slide.cloneNode(true)
  );

  scroller._loopScrollHandler = null;
  scroller._loopResizeHandler = null;
  scroller._loopRafId = null;
  scroller._loopResizeRafId = null;

  scroller.dataset.loopReady = "false";

  scroller.scrollTop = 0;
}

function initWorkLoopCarousel() {
  const scroller = document.querySelector(
    ".work-panel .carousel"
  );

  if (
    !scroller ||
    scroller.dataset.loopReady === "true"
  ) {
    return;
  }

  /*
   * Здесь берём ТОЛЬКО реальные элементы,
   * которые уже находятся внутри DOM.
   */
  const originals = Array.from(
    scroller.querySelectorAll(
      ".slide:not(.is-loop-clone)"
    )
  );

  if (originals.length < 2) return;

  const templates = originals.map((slide) => {
    const clone = slide.cloneNode(true);

    clone.classList.remove(
      "is-loop-clone",
      "is-top"
    );

    return clone;
  });

  const count = templates.length;

  scroller._originalSlides = templates.map(
    (slide) => slide.cloneNode(true)
  );

  scroller.replaceChildren();

  /*
   * Создаём три набора:
   *
   * clone
   * ORIGINAL / working set
   * clone
   */
  for (let setIndex = 0; setIndex < 3; setIndex++) {
    templates.forEach((template) => {
      const slide = template.cloneNode(true);

      if (setIndex !== 1) {
        slide.classList.add("is-loop-clone");
      } else {
        slide.classList.remove("is-loop-clone");
      }

      scroller.appendChild(slide);
    });
  }

  let isSyncing = false;
  let metrics = null;

  /*
   * Измеряем настоящий rendered layout,
   * а не detached clones.
   */
  function measureLoop() {
    const slides = Array.from(
      scroller.querySelectorAll(".slide")
    );

    if (slides.length < count * 3) {
      return null;
    }

    const middleFirst = slides[count];
    const thirdFirst = slides[count * 2];

    if (!middleFirst || !thirdFirst) {
      return null;
    }

    const scrollerRect =
      scroller.getBoundingClientRect();

    const middleRect =
      middleFirst.getBoundingClientRect();

    const thirdRect =
      thirdFirst.getBoundingClientRect();

    /*
     * Реальное расстояние между одинаковыми
     * точками двух соседних циклов.
     *
     * Оно автоматически учитывает:
     * - slide heights
     * - responsive aspect-ratio
     * - gap
     */
    const cycleSpan =
      thirdRect.top - middleRect.top;

    const middleStart =
      middleRect.top -
      scrollerRect.top +
      scroller.scrollTop;

    if (
      !Number.isFinite(cycleSpan) ||
      cycleSpan <= 0
    ) {
      return null;
    }

    return {
      cycleSpan,
      middleStart
    };
  }

  function handleLoopScroll() {
    if (isSyncing || !metrics) return;

    const {
      cycleSpan,
      middleStart
    } = metrics;

    const current = scroller.scrollTop;

    /*
     * Пользователь остаётся примерно
     * внутри среднего набора.
     */
    const lowerBoundary = middleStart;
    const upperBoundary = middleStart + cycleSpan;

    if (current < lowerBoundary) {
      isSyncing = true;

      scroller.scrollTop =
        current + cycleSpan;

      scroller._loopRafId =
        requestAnimationFrame(() => {
          isSyncing = false;
        });

      return;
    }

    if (current >= upperBoundary) {
      isSyncing = true;

      scroller.scrollTop =
        current - cycleSpan;

      scroller._loopRafId =
        requestAnimationFrame(() => {
          isSyncing = false;
        });
    }
  }

  /*
   * Resize внутри одного breakpoint:
   * пересчитываем реальные dimensions.
   */
  function handleResize() {
    if (scroller._loopResizeRafId) {
      cancelAnimationFrame(
        scroller._loopResizeRafId
      );
    }

    scroller._loopResizeRafId =
      requestAnimationFrame(() => {
        const oldMetrics = metrics;

        let relativePosition = 0;

        if (
          oldMetrics &&
          oldMetrics.cycleSpan > 0
        ) {
          relativePosition =
            (
              scroller.scrollTop -
              oldMetrics.middleStart
            ) /
            oldMetrics.cycleSpan;
        }

        const newMetrics =
          measureLoop();

        if (!newMetrics) return;

        metrics = newMetrics;

        /*
         * Сохраняем приблизительно ту же
         * позицию внутри текущего цикла.
         */
        if (oldMetrics) {
          isSyncing = true;

          scroller.scrollTop =
            metrics.middleStart +
            relativePosition *
              metrics.cycleSpan;

          scroller._loopRafId =
            requestAnimationFrame(() => {
              isSyncing = false;
            });
        }
      });
  }

  scroller._loopScrollHandler =
    handleLoopScroll;

  scroller._loopResizeHandler =
    handleResize;

  scroller.addEventListener(
    "scroll",
    handleLoopScroll,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    handleResize
  );

  /*
   * Всё уже вставлено в DOM,
   * поэтому теперь можно корректно измерить layout.
   */
  metrics = measureLoop();

  if (!metrics) {
    console.warn(
      "Work carousel: loop metrics could not be calculated."
    );

    scroller.dataset.loopReady = "false";
    return;
  }

  scroller.dataset.loopReady = "true";

  /*
   * Начинаем со среднего набора.
   */
  scroller.scrollTop =
    metrics.middleStart;

  /*
   * У тебя mobile overlay также слушает scroll.
   * Это заставит его сразу обновиться после rebuild.
   */
  scroller.dispatchEvent(
    new Event("scroll")
  );
}

function setupWorkCarouselLifecycle() {
  const mobileQuery = window.matchMedia("(max-width: 960px)");

  const refreshLoopForViewport = () => {
    destroyWorkLoopCarousel();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initWorkLoopCarousel();
      });
    });
  };

  const onBreakpointChange = () => {
    refreshLoopForViewport();
  };

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", onBreakpointChange);
  } else if (typeof mobileQuery.addListener === "function") {
    mobileQuery.addListener(onBreakpointChange);
  }

  initWorkLoopCarousel();
}

function initCustomScrollbars() {
  initSidebarCustomScrollbar();
  initSkillSetAnimation();
  setupWorkCarouselLifecycle();
}

function initMobileWorkPanel() {
  const layout = document.querySelector(".content-layout");
  const toggle = document.querySelector(".work-toggle");

  if (!layout || !toggle) return;

  const setOpen = (isOpen) => {
    layout.classList.toggle("is-work-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.classList.toggle("is-active", isOpen);
  };

  toggle.addEventListener("click", (event) => {
    const isMobile = window.matchMedia("(max-width: 960px)").matches;

    if (!isMobile) {
      return;
    }

    event.preventDefault();
    setOpen(!layout.classList.contains("is-work-open"));
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 960px)").matches) {
      setOpen(false);
    }
  });
}

function initMobileProjectOverlay() {
  const carousel = document.querySelector(".work-panel .carousel");

  if (!carousel) return;

  const updateTopSlide = () => {
    if (!window.matchMedia("(max-width: 960px)").matches) {
      carousel.querySelectorAll(".slide").forEach((slide) => {
        slide.classList.remove("is-top");
      });
      return;
    }

    const slides = [...carousel.querySelectorAll(".slide")];

    if (!slides.length) return;

    const containerTop = carousel.getBoundingClientRect().top;
    const triggerY = window.innerHeight * 0.5;
    let activeSlide = slides[0];

    slides.forEach((slide) => {
      const rect = slide.getBoundingClientRect();
      const isPastTrigger = rect.top <= triggerY;
      const isStillVisible = rect.top >= containerTop - 16;

      if (isPastTrigger && isStillVisible) {
        activeSlide = slide;
      }
    });

    slides.forEach((slide) => {
      slide.classList.toggle("is-top", slide === activeSlide);
    });
  };

  updateTopSlide();
  carousel.addEventListener("scroll", updateTopSlide, { passive: true });
  window.addEventListener("resize", updateTopSlide);
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      initCustomScrollbars();
      initMobileWorkPanel();
      initMobileProjectOverlay();
    }
  );
} else {
  initCustomScrollbars();
  initMobileWorkPanel();
  initMobileProjectOverlay();
}