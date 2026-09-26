const basePath = document.body.dataset.basePath || "/";

const projectDefinitions = {
  cogs: {
    leadImage: { src: `${basePath}images/Project_img/Cogs_1.jpg`, layout: "full" },
    gallery: [
      { src: `${basePath}images/Project_img/Cogs_2.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Cogs_3.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Cogs_4.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Cogs_5.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Cogs_6.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Cogs_7.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Cogs_8.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Cogs_9.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Cogs_10.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Cogs_11.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Cogs_12.jpg`, layout: "full" }
    ],
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
      { type: "text", eyebrow: "Design system", text: "A simple palette, expressive typography, and repeatable asset language produce a system that scales cleanly from jerseys to social graphics, campaign posters, and event materials." }
    ]
  },
  kenya: {
    leadImage: { src: `${basePath}images/Project_img/Coil_1.jpg`, layout: "full" },
    gallery: [
      { src: `${basePath}images/Project_img/Coil_2_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Coil_3_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Coil_4.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Coil_5.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Coil_6.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Coil_7.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Coil_8.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Coil_9.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Coil_10_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Coil_11_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Coil_12_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Coil_13_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Coil_14.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Coil_15_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Coil_16_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Coil_17.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Coil_18.jpg`, layout: "full" }
    ],
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
      { type: "text", eyebrow: "Solution", text: "The system balances clarity, warmth, and regional identity through material cues, confident typography, and a higher-end product narrative." }
    ]
  },
  beincrypto: {
    leadImage: { src: `${basePath}images/Project_img/Beincrypto_1.jpg`, layout: "full" },
    gallery: [
      { src: `${basePath}images/Project_img/Beincrypto_2.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Beincrypto_3_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Beincrypto_4_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Beincrypto_5.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Beincrypto_6.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Beincrypto_7.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Beincrypto_8.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Beincrypto_9.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Beincrypto_10_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Beincrypto_11_gr.jpg`, layout: "grid" }
    ],
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
      { type: "text", eyebrow: "Solution", text: "The visual direction uses strong modular blocks, precise hierarchy, and a high-contrast palette to keep the campaign immediate and professional." }
    ]
  },
  heineken: {
    leadImage: { src: `${basePath}images/Project_img/Heineken_case_1.jpg`, layout: "full" },
    gallery: [
      { src: `${basePath}images/Project_img/Heineken_case_2.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Heineken_case_3.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Heineken_case_4.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Heineken_case_5.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Heineken_case_6.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Heineken_case_7.jpg`, layout: "full" }
    ],
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
      { type: "text", eyebrow: "Solution", text: "Clear modular layouts, precise product shots, and a strong visual cadence create a polished, fast-moving brand language for the event environment." }
    ]
  },
  moretti: {
    leadImage: { src: `${basePath}images/Project_img/Birra_1.jpg`, layout: "full" },
    gallery: [
      { src: `${basePath}images/Project_img/Birra_2.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Birra_3.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Birra_4.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Birra_5_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Birra_6_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Birra_7.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Birra_8.jpg`, layout: "full" },
      { src: `${basePath}images/Project_img/Birra_9_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Birra_10_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Birra_11_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Birra_12_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Birra_13_gr.jpg`, layout: "grid" },
      { src: `${basePath}images/Project_img/Birra_14_gr.jpg`, layout: "grid" }
    ],
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
      { type: "text", eyebrow: "Solution", text: "The design uses a simplified packaging system with elevated finishes and a warm, celebratory visual language that feels premium without becoming heavy." }
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
        <img src="${section.src}" alt="${section.alt || "Project image"}" loading="lazy" />
        ${section.caption ? `<figcaption>${section.caption}</figcaption>` : ""}
      </figure>
    `;
  }

  return "";
}

function renderProjectGallery(images = [], title = "Project") {
  return images.map((image, index) => `
    <figure class="project-gallery-item ${image.layout === "full" ? "is-full" : "is-grid"}">
      <img src="${image.src}" alt="${image.alt || title + ' project image ' + (index + 2)}" loading="lazy" />
    </figure>
  `).join("");
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
      ${renderProjectSection({ type: "image", ...project.leadImage, alt: project.title + " project image 1" })}
      ${sections}
      <div class="project-block project-gallery">
        ${renderProjectGallery(project.gallery, project.title)}
      </div>
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
  setActiveNav("work");

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
  updateSidebarActiveNav();
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

function setActiveNav(navName) {
  const links = document.querySelectorAll(".site-header .nav-link[data-nav]");
  // Clear other links first so even synchronous changes never create two actives.
  links.forEach((link) => {
    if (link.dataset.nav !== navName) link.classList.remove("is-active");
  });
  links.forEach((link) => {
    if (link.dataset.nav === navName) link.classList.add("is-active");
  });
}

function updateSidebarActiveNav() {
  const layout = document.querySelector(".content-layout");
  if (projectDetailState.openProjectId ||
      (window.matchMedia("(max-width: 960px)").matches && layout?.classList.contains("is-work-open"))) {
    setActiveNav("work");
    return;
  }

  const sidebar = document.querySelector(".sidebar");
  const skills = sidebar?.querySelector(".what-i-do");
  const contacts = sidebar?.querySelector(".footer");
  if (!sidebar || !skills || !contacts) return;

  const sidebarTop = sidebar.getBoundingClientRect().top;
  const topInsideSidebar = (element) => sidebar.scrollTop + element.getBoundingClientRect().top - sidebarTop;
  const activationLine = sidebar.scrollTop + sidebar.clientHeight * 0.28;
  const distanceFromBottom = sidebar.scrollHeight - sidebar.scrollTop - sidebar.clientHeight;

  if (distanceFromBottom <= 20 || activationLine >= topInsideSidebar(contacts)) {
    setActiveNav("contacts");
  } else if (activationLine >= topInsideSidebar(skills)) {
    setActiveNav("skills");
  } else {
    setActiveNav("about");
  }
}

function initMobileWorkPanel() {
  const layout = document.querySelector(".content-layout");
  const toggle = document.querySelector(".work-toggle");

  if (!layout || !toggle) return;

  const setOpen = (isOpen, { fromSwipe = false } = {}) => {
    if (!fromSwipe) cancelSwipe();
    layout.classList.toggle("is-work-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      setActiveNav("work");
    } else {
      updateSidebarActiveNav();
    }
  };

  const sidebar = document.querySelector(".sidebar");
  const sidebarLinks = document.querySelectorAll(".site-header [data-sidebar-target]");
  const cancelSwipe = initMobilePanelSwipe(layout, setOpen);
  let navScrollRaf = null;
  const scheduleActiveUpdate = () => {
    if (navScrollRaf !== null) return;
    navScrollRaf = requestAnimationFrame(() => {
      navScrollRaf = null;
      updateSidebarActiveNav();
    });
  };
  sidebar?.addEventListener("scroll", scheduleActiveUpdate, { passive: true });
  updateSidebarActiveNav();

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = sidebar?.querySelector(link.hash) || (link.hash === "#about" ? sidebar : null);
      if (!sidebar || !target) return;

      event.preventDefault();
      if (projectDetailState.openProjectId) closeProjectDetailView();
      setOpen(false);
      setActiveNav(link.dataset.nav);

      requestAnimationFrame(() => {
        const top = target === sidebar ? 0 : sidebar.scrollTop +
          target.getBoundingClientRect().top - sidebar.getBoundingClientRect().top;
        sidebar.scrollTo({ top, behavior: "smooth" });
      });
    });
  });

  toggle.addEventListener("click", (event) => {
    const wasProjectOpen = !!projectDetailState.openProjectId;
    if (wasProjectOpen) closeProjectDetailView();
    const isMobile = window.matchMedia("(max-width: 960px)").matches;

    if (!isMobile) {
      setActiveNav("work");
      return;
    }

    event.preventDefault();
    setOpen(wasProjectOpen || !layout.classList.contains("is-work-open"));
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 960px)").matches) {
      setOpen(false);
    }
    scheduleActiveUpdate();
  });
}

function initMobilePanelSwipe(layout, setOpen) {
  const mobileQuery = window.matchMedia("(max-width: 960px)");
  const sidebarPanel = layout.querySelector(".sidebar-panel");
  const workPanel = layout.querySelector(".work-panel");
  if (!sidebarPanel || !workPanel) return () => {};

  const panels = [sidebarPanel, workPanel];
  let gesture = null;
  let dragRaf = null;
  let settleTimer = null;
  let finishTransition = null;
  let suppressClickUntil = 0;

  function renderPosition(sidebarX, width) {
    sidebarPanel.style.transform = `translate3d(${sidebarX}px, 0, 0)`;
    workPanel.style.transform = `translate3d(${width + sidebarX}px, 0, 0)`;
  }

  function releaseCapture(id) {
    if (id !== undefined && layout.hasPointerCapture(id)) layout.releasePointerCapture(id);
  }

  // Also used by header navigation and resize; never touches either scroller.
  function cleanup() {
    const id = gesture?.id;
    gesture = null;
    if (dragRaf !== null) cancelAnimationFrame(dragRaf);
    dragRaf = null;
    clearTimeout(settleTimer);
    settleTimer = null;
    if (finishTransition) workPanel.removeEventListener("transitionend", finishTransition);
    finishTransition = null;
    if (layout.classList.contains("is-swipe-dragging") || layout.classList.contains("is-swipe-settling")) {
      layout.classList.add("is-swipe-dragging");
      layout.classList.remove("is-swipe-settling");
      panels.forEach((panel) => panel.style.removeProperty("transform"));
      layout.style.removeProperty("--swipe-duration");
      // Resolve the existing CSS state without animating a second time.
      void sidebarPanel.offsetWidth;
      layout.classList.remove("is-swipe-dragging");
    }
    releaseCapture(id);
  }

  function updatePosition(event) {
    const dx = event.clientX - gesture.startX;
    gesture.dragX = gesture.workOpen
      ? Math.min(gesture.width, Math.max(0, dx))
      : Math.max(-gesture.width, Math.min(0, dx));
    const elapsed = event.timeStamp - gesture.lastTime;
    if (event.clientX !== gesture.lastX && elapsed > 0) {
      gesture.velocityX = (event.clientX - gesture.lastX) / elapsed;
      gesture.lastX = event.clientX;
      gesture.lastTime = event.timeStamp;
    }
  }

  function settle(cancelled, event) {
    if (!gesture) return;
    if (!gesture.didHorizontalDrag) {
      gesture = null;
      return;
    }
    if (!cancelled) updatePosition(event);
    const current = gesture;
    gesture = null;
    if (dragRaf !== null) cancelAnimationFrame(dragRaf);
    dragRaf = null;
    suppressClickUntil = performance.now() + 600;
    releaseCapture(current.id);

    const progress = Math.abs(current.dragX) / current.width;
    // A held finger has zero release velocity, even after a fast initial move.
    const velocity = event.timeStamp - current.lastTime <= 100 ? current.velocityX : 0;
    const forwardVelocity = current.workOpen ? velocity : -velocity;
    const commit = !cancelled && (progress >= 0.3 || (progress > 0 && forwardVelocity >= 0.5));
    const targetOpen = commit ? !current.workOpen : current.workOpen;
    const remaining = commit ? 1 - progress : progress;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0 : 120 + Math.max(0, Math.min(1, remaining)) * 160;

    renderPosition((current.workOpen ? -current.width : 0) + current.dragX, current.width);
    void sidebarPanel.offsetWidth;
    layout.style.setProperty("--swipe-duration", `${duration}ms`);
    layout.classList.remove("is-swipe-dragging");
    layout.classList.add("is-swipe-settling");

    finishTransition = (transitionEvent) => {
      if (transitionEvent && (transitionEvent.target !== workPanel || transitionEvent.propertyName !== "transform")) return;
      // Commit only at the endpoint. Keep transforms while the shared setter
      // synchronizes the class, aria-expanded and the single active nav link.
      layout.classList.add("is-swipe-dragging");
      layout.classList.remove("is-swipe-settling");
      if (commit) setOpen(targetOpen, { fromSwipe: true });
      cleanup();
    };
    workPanel.addEventListener("transitionend", finishTransition);
    renderPosition(targetOpen ? -current.width : 0, current.width);
    // transitionend is absent for zero distance/reduced motion or a hidden tab.
    settleTimer = setTimeout(() => finishTransition?.(), duration + 50);
  }

  layout.addEventListener("pointerdown", (event) => {
    if (!mobileQuery.matches || event.pointerType !== "touch") return;
    if (!event.isPrimary) {
      settle(true, event);
      return;
    }
    suppressClickUntil = 0;
    if (projectDetailState.openProjectId || settleTimer !== null) return;
    if (event.target.closest("button, input, textarea, select, [contenteditable], .scroll-ui")) return;
    if (panels.some((panel) => panel.getAnimations().some((animation) => animation.playState === "running"))) return;
    gesture = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      startTime: event.timeStamp,
      lastTime: event.timeStamp,
      velocityX: 0,
      dragX: 0,
      width: layout.clientWidth,
      workOpen: layout.classList.contains("is-work-open"),
      didHorizontalDrag: false,
    };
  }, { passive: true });

  layout.addEventListener("pointermove", (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    if (projectDetailState.openProjectId) return cleanup();
    if (!gesture.didHorizontalDrag) {
      const dx = Math.abs(event.clientX - gesture.startX);
      const dy = Math.abs(event.clientY - gesture.startY);
      if (Math.max(dx, dy) < 8) return;
      if (dy > dx) {
        gesture = null;
        return;
      }
      if (dx <= dy * 1.2 || !gesture.width) return;
      gesture.didHorizontalDrag = true;
      layout.classList.add("is-swipe-dragging");
      layout.setPointerCapture(event.pointerId);
    }
    updatePosition(event);
    if (dragRaf === null) {
      dragRaf = requestAnimationFrame(() => {
        dragRaf = null;
        if (gesture) renderPosition((gesture.workOpen ? -gesture.width : 0) + gesture.dragX, gesture.width);
      });
    }
  }, { passive: true });

  layout.addEventListener("pointerup", (event) => {
    if (gesture?.id === event.pointerId) settle(false, event);
  }, { passive: true });
  const cancelGesture = (event) => {
    if (gesture?.id === event.pointerId) settle(true, event);
  };
  layout.addEventListener("pointercancel", cancelGesture, { passive: true });
  layout.addEventListener("lostpointercapture", (event) => {
    // Transferring implicit touch capture from a card to the layout also
    // emits this event on the card; only losing our own capture cancels.
    if (event.target === layout) cancelGesture(event);
  }, { passive: true });
  layout.addEventListener("click", (event) => {
    if (event.detail === 0 || event.pointerType === "mouse" || performance.now() > suppressClickUntil) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickUntil = 0;
  }, { capture: true });

  window.addEventListener("resize", cleanup);
  window.addEventListener("blur", cleanup);
  mobileQuery.addEventListener("change", cleanup);
  return cleanup;
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

function initNavDotSpread() {
  const spread = 0.12;

  document.querySelectorAll(".site-header .nav-svg svg").forEach((svg) => {
    const { x, y, width, height } = svg.viewBox.baseVal;
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    svg.querySelectorAll("[data-nav-dot]").forEach((dot) => {
      const box = dot.getBBox();
      const dx = (box.x + box.width / 2 - centerX) * spread;
      const dy = (box.y + box.height / 2 - centerY) * spread;
      // CSS translations on SVG geometry use SVG user units. The SVG viewport
      // maps them to screen pixels, including after responsive resizing.
      // Multiplying by the rendered/viewBox ratio here would apply it twice.
      dot.style.setProperty("--nav-dot-x", `${dx}px`);
      dot.style.setProperty("--nav-dot-y", `${dy}px`);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      initNavDotSpread();
      initCustomScrollbars();
      initProjectDetailView();
      initMobileWorkPanel();
      initMobileProjectOverlay();
    }
  );
} else {
  initNavDotSpread();
  initCustomScrollbars();
  initProjectDetailView();
  initMobileWorkPanel();
  initMobileProjectOverlay();
}
