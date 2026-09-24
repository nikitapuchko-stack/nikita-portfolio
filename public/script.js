const basePath = document.body.dataset.basePath || "/";

const projectDefinitions = {
  cogs: {
    title: "COGS Cycling Community",
    category: "Brand identity",
    hero: `${basePath}images/cogs.png`,
    meta: {
      type: "Brand identity",
      role: "Art-director, graphic designer",
      client: "COGS pet-project",
      year: "2026"
    },
    overview: "COGS Cycling Community is a club-first identity system built to bring together training culture, local community, and a premium cycling aesthetic.",
    sections: [
      { type: "text", eyebrow: "Design task", text: "Build a versatile brand that feels premium, contemporary, and rooted in the energy of urban cycling culture while staying memorable across print, motion, and digital outputs." },
      { type: "text", eyebrow: "Solution", text: "The identity balances a confident wordmark, bold editorial rhythm, and a modular system that supports both community messaging and product storytelling." },
      { type: "text", eyebrow: "Design system", text: "A simple palette, expressive typography, and repeatable asset language produce a system that scales cleanly from jerseys to social graphics, campaign posters, and event materials." },
      { type: "image", src: `${basePath}images/cogs.png`, alt: "COGS Cycling Community identity application" },
      { type: "grid", items: [
        { label: "Typography", value: "Bold, condensed wordmarks paired with editorial spacing for maximum clarity and energy." },
        { label: "Brand assets", value: "The system combines logotype, badge work, and flexible campaign templates to support everyday club communications." },
        { label: "Applications", value: "From poster systems to digital touchpoints, the design remains visually consistent without feeling rigid." },
        { label: "Atmosphere", value: "A sharp blue palette and confident geometry create a sense of motion, trust, and identity-driven momentum." }
      ] }
    ]
  },
  kenya: {
    title: "COIL Coffee",
    category: "Packaging design",
    hero: `${basePath}images/kenya-coffee.png`,
    meta: {
      type: "Brand identity",
      role: "Art-director, graphic designer",
      client: "COIL pet-project",
      year: "2025"
    },
    overview: "COIL Coffee packaging brings the terroir and craft of Kenyan coffee into a refined retail language built for premium shelf presence.",
    sections: [
      { type: "text", eyebrow: "Design task", text: "Create a packaging system that feels premium, traceable, and globally legible while celebrating the origin story of the coffee." },
      { type: "text", eyebrow: "Solution", text: "The system balances clarity, warmth, and regional identity through material cues, confident typography, and a higher-end product narrative." },
      { type: "image", src: `${basePath}images/kenya-coffee.png`, alt: "COIL Coffee packaging detail" }
    ]
  },
  beincrypto: {
    title: "BeInCrypto Awards 2026",
    category: "Campaign identity",
    hero: `${basePath}images/beincrypto.png`,
    meta: {
      type: "Event identity",
      role: "Art-director, graphic designer",
      client: "BeInCrypto",
      year: "2026"
    },
    overview: "An outdoor campaign identity designed to spotlight the event with strong visibility, premium pacing, and bold digital-first communication.",
    sections: [
      { type: "text", eyebrow: "Design task", text: "Structure a clean yet high-energy campaign system that can carry a large event narrative across multiple formats and touchpoints." },
      { type: "text", eyebrow: "Solution", text: "The visual direction uses strong modular blocks, precise hierarchy, and a high-contrast palette to keep the campaign immediate and professional." },
      { type: "image", src: `${basePath}images/beincrypto.png`, alt: "BeInCrypto Awards 2026 campaign imagery" }
    ]
  },
  heineken: {
    title: "Heineken × Formula 1",
    category: "Experiential kit",
    hero: `${basePath}images/heineken.png`,
    meta: {
      type: "Experiential kit",
      role: "Art-director, graphic designer, 3D artist",
      client: "Heineken x F1",
      year: "2025"
    },
    overview: "A kits-of-parts experiential direction built to support event presence, creator moments, and premium brand storytelling at the intersection of sport and culture.",
    sections: [
      { type: "text", eyebrow: "Design task", text: "Develop a compact yet premium kit that communicates speed, design discipline, and hospitality across experiential moments." },
      { type: "text", eyebrow: "Solution", text: "Clear modular layouts, precise product shots, and a strong visual cadence create a polished, fast-moving brand language for the event environment." },
      { type: "image", src: `${basePath}images/heineken.png`, alt: "Heineken Formula 1 kit" }
    ]
  },
  moretti: {
    title: "Birra Moretti Chalice",
    category: "Packaging design",
    hero: `${basePath}images/moretti.png`,
    meta: {
      type: "Packaging design",
      role: "Graphic designer, 3D artist",
      client: "Birra Moretti",
      year: "2025"
    },
    overview: "A premium chalice packaging concept built around ritual, craft, and celebratory cues while staying rooted in a recognizable premium beverage culture.",
    sections: [
      { type: "text", eyebrow: "Design task", text: "Translate the product story into a premium object with a memorable silhouette, tactile presence, and a distinct brand voice." },
      { type: "text", eyebrow: "Solution", text: "The design uses a simplified packaging system with elevated finishes and a warm, celebratory visual language that feels premium without becoming heavy." },
      { type: "image", src: `${basePath}images/moretti.png`, alt: "Birra Moretti chalice packaging design" }
    ]
  }
};

const projectDetailState = {
  savedSidebarTop: 0,
  savedWorkTop: 0,
  wasWorkOpen: false,
  openProjectId: null
};

function renderProjectSection(section) {
  if (!section) return "";

  if (section.type === "text") {
    return `
      <section class="project-block project-text">
        <div class="project-block-label">${section.eyebrow}</div>
        <p>${section.text}</p>
      </section>
    `;
  }

  if (section.type === "image") {
    return `
      <figure class="project-block project-image">
        <img src="${section.src}" alt="${section.alt || "Project image"}" />
        ${section.caption ? `<figcaption>${section.caption}</figcaption>` : ""}
      </figure>
    `;
  }

  if (section.type === "grid") {
    const items = (section.items || []).map((item) => `
      <div class="project-grid-item">
        <strong>${item.label}</strong>
        <p>${item.value}</p>
      </div>
    `).join("");

    return `
      <section class="project-block project-grid">
        <div class="project-grid-items">
          ${items}
        </div>
      </section>
    `;
  }

  return "";
}

function renderProjectDetail(projectId) {
  const project = projectDefinitions[projectId];
  const projectDetailContent = document.querySelector(".project-detail-content");

  if (!project || !projectDetailContent) return;

  const sections = (project.sections || []).map(renderProjectSection).join("");
  const metaItems = project.meta
    ? [
        project.meta.type,
        project.meta.role,
        project.meta.client,
        project.meta.year
      ]
    : [];

  const metadataMarkup = metaItems.length
    ? `
      <section class="project-meta" aria-label="Project information">
        <div class="project-meta-column">
          <div class="project-meta-heading">project type</div>
          <div class="project-meta-value">${project.meta.type}</div>
        </div>

        <div class="project-meta-column">
          <div class="project-meta-heading">my role</div>
          <div class="project-meta-value">${project.meta.role}</div>
        </div>

        <div class="project-meta-column">
          <div class="project-meta-heading">client</div>
          <div class="project-meta-value">${project.meta.client}</div>
        </div>

        <div class="project-meta-column">
          <div class="project-meta-heading">year</div>
          <div class="project-meta-value">${project.meta.year}</div>
        </div>
      </section>
    `
    : "";

  projectDetailContent.innerHTML = `
    <div class="project-detail-title-bar">
      <button class="project-back-button" type="button" aria-label="Back to work">← Back</button>
      <h1>${project.title}</h1>
    </div>

    <section class="project-detail-hero">
      <img src="${project.hero}" alt="${project.title}" />
    </section>

    ${metadataMarkup}

    <article class="project-case-study">
      <section class="project-block project-overview">
        <h2 class="project-section-title">OVERVIEW</h2>
        <p>${project.overview}</p>
      </section>
      ${sections}
    </article>
  `;

  const backButton = projectDetailContent.querySelector(".project-back-button");
  backButton?.addEventListener("click", closeProjectDetailView);
}

function openProjectDetailView(projectId) {
  const stage = document.querySelector(".content-stage");
  const layout = document.querySelector(".content-layout");
  const projectDetailScroller = document.querySelector(".project-detail-scroller");
  const sidebarScroller = document.querySelector(".scroll-panel.sidebar-panel .sidebar");
  const workScroller = document.querySelector(".work-panel .carousel");

  const project = projectDefinitions[projectId];

  if (!stage || !project) return;

  projectDetailState.savedSidebarTop = sidebarScroller ? sidebarScroller.scrollTop : 0;
  projectDetailState.savedWorkTop = workScroller ? workScroller.scrollTop : 0;
  projectDetailState.wasWorkOpen = window.matchMedia("(max-width: 960px)").matches && !!(layout && layout.classList.contains("is-work-open"));
  projectDetailState.openProjectId = projectId;

  renderProjectDetail(projectId);
  stage.classList.add("is-project-open");

  if (projectDetailScroller) {
    projectDetailScroller.scrollTop = 0;
  }
}

function closeProjectDetailView() {
  const stage = document.querySelector(".content-stage");
  const layout = document.querySelector(".content-layout");
  const sidebarScroller = document.querySelector(".scroll-panel.sidebar-panel .sidebar");
  const workScroller = document.querySelector(".work-panel .carousel");

  if (!stage) return;

  stage.classList.remove("is-project-open");

  if (layout && window.matchMedia("(max-width: 960px)").matches) {
    if (projectDetailState.wasWorkOpen) {
      layout.classList.add("is-work-open");
    } else {
      layout.classList.remove("is-work-open");
    }
  }

  if (sidebarScroller) {
    sidebarScroller.scrollTop = projectDetailState.savedSidebarTop;
  }

  if (workScroller) {
    workScroller.scrollTop = projectDetailState.savedWorkTop;
  }

  projectDetailState.openProjectId = null;
}

function initProjectDetailView() {
  const carousel = document.querySelector(".work-panel .carousel");

  if (!carousel) return;

  carousel.addEventListener("click", (event) => {
    const slide = event.target.closest(".slide[data-project]");

    if (!slide || !carousel.contains(slide)) return;

    openProjectDetailView(slide.dataset.project);
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const slide = event.target.closest(".slide[data-project]");

    if (!slide || !carousel.contains(slide)) return;

    event.preventDefault();

    openProjectDetailView(slide.dataset.project);
  });
}

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

function initWorkExperienceCounter() {
  const yearsElement = document.querySelector(".work-years");
  const daysElement = document.querySelector(".work-days");

  if (!yearsElement || !daysElement) return;

  const now = new Date();
  const startDate = new Date(2022, 0, 1);
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  let years = today.getFullYear() - startDate.getFullYear();

  const anniversaryThisYear = new Date(
    today.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  if (today < anniversaryThisYear) {
    years -= 1;
  }

  const lastAnniversary = new Date(
    startDate.getFullYear() + years,
    startDate.getMonth(),
    startDate.getDate()
  );

  const anniversaryDate = new Date(
    lastAnniversary.getFullYear(),
    lastAnniversary.getMonth(),
    lastAnniversary.getDate()
  );

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const days = Math.max(
    0,
    Math.floor((today - anniversaryDate) / millisecondsPerDay)
  );

  yearsElement.textContent = String(years);
  daysElement.textContent = String(days);
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
  initWorkExperienceCounter();
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
      initProjectDetailView();
      initMobileWorkPanel();
      initMobileProjectOverlay();
    }
  );
} else {
  initCustomScrollbars();
  initProjectDetailView();
  initMobileWorkPanel();
  initMobileProjectOverlay();
}