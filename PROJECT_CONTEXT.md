# PROJECT_CONTEXT.md

# Nikita Puchko Portfolio — Project Handoff Context

Read this file completely before changing anything in the project.

This website already contains several custom interaction systems that depend on each other. Preserve the existing architecture unless the user explicitly asks to change it. Do not refactor working systems just because another implementation looks cleaner.

---

## 1. Project

Personal portfolio website for:

**Nikita Puchko — Graphic & Brand Designer**

Local project path:

```text
C:\Users\DesignMachine\Documents\nikita-portfolio
```

Tech:

- Astro
- vanilla JavaScript
- CSS
- no framework UI library
- IBM Plex Mono typography

Main files:

```text
src/pages/index.astro
src/styles/global.css
public/script.js
public/images/
astro.config.mjs
.github/workflows/deploy.yml
```

Run locally on Windows:

```powershell
cd C:\Users\DesignMachine\Documents\nikita-portfolio
npm.cmd run dev
```

Local URL:

```text
http://localhost:4321/
```

Important: PowerShell blocks `npm.ps1` on this machine, so use `npm.cmd`.

---

## 2. Git / Deployment

GitHub repository:

```text
nikitapuchko-stack/nikita-portfolio
```

Current GitHub Pages URL:

```text
https://nikitapuchko-stack.github.io/nikita-portfolio/
```

Deployment is automatic through GitHub Actions after push.

Normal update workflow:

```powershell
cd C:\Users\DesignMachine\Documents\nikita-portfolio
git add .
git commit -m "Update portfolio"
git push
```

Before risky changes, create a commit first.

---

## 3. GitHub Pages / BASE_URL — CRITICAL

The site is deployed inside the `/nikita-portfolio/` subpath.

Astro config conceptually uses:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://nikitapuchko-stack.github.io",
  base: "/nikita-portfolio",
});
```

In `index.astro` the project uses:

```astro
const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
```

Public assets must remain base-aware.

Correct:

```astro
<img src={`${base}images/cogs.png`} />
```

Incorrect:

```astro
<img src="/images/cogs.png" />
```

Do not replace base-aware asset paths with root absolute paths.

The favicon is also loaded through BASE_URL.

---

## 4. Global Layout Architecture

The header is outside the moving content views and must remain fixed/stable at the top.

Current high-level structure is approximately:

```text
.page
├── .site-header
└── .content-stage
    ├── .main-view
    │   └── .content-layout
    │       ├── .scroll-panel.sidebar-panel
    │       │   ├── .sidebar
    │       │   └── .scroll-ui
    │       └── .scroll-panel.work-panel
    │           ├── .carousel
    │           └── .scroll-ui
    │
    └── .project-detail-view
        └── .project-detail-scroller
            └── .project-detail-content
```

Important sizing chain:

- `body` uses `overflow: hidden`
- `.page` fills viewport
- `.content-stage` fills remaining space under header
- `.main-view` and `.project-detail-view` are positioned inside `.content-stage`
- internal scrolling happens inside dedicated scrollers

Do not casually change height / min-height / overflow relationships. They previously broke all scrolling.

Important working fix:

```css
.content-layout {
  width: 100%;
  height: 100%;
  min-height: 0;
}
```

and:

```css
.main-view {
  width: 100%;
  height: 100%;
  min-height: 0;
}
```

On mobile, `.content-layout` should use the available parent height rather than an old hardcoded `calc(100dvh - 88px)`.

---

## 5. Header

Header must remain visually and structurally stable.

Current navigation:

```text
Home
Work
About
Contacts
```

Design:

- full width
- background `#ECECEC`
- thin blue bottom line
- plain text links
- no pills
- black text
- active / hover blue

The header must NOT move during project page transitions.

Project transitions happen below the header.

---

## 6. Desktop Main View

Desktop is a split layout:

```text
[ LEFT SIDEBAR ][ RIGHT WORK PANEL ]
```

Both sides scroll independently.

Approximate desktop columns:

```css
grid-template-columns: minmax(320px, 38%) minmax(0, 1fr);
```

Do not change desktop column proportions unless explicitly requested.

---

## 7. Sidebar Scrolling

The actual sidebar scroller is `.sidebar`.

It uses:

```css
height: 100%;
min-height: 0;
overflow-y: auto;
overflow-x: hidden;
```

The native scrollbar is hidden.

A custom scrollbar UI exists in `.sidebar-panel`:

- small blue top rectangle
- draggable blue dot
- small blue bottom rectangle

Initializer:

```js
initSidebarCustomScrollbar()
```

The custom scrollbar depends on `.sidebar` being the actual scrolling element.

Do not move scrolling to `.sidebar-panel` without updating the JS.

---

## 8. Skill Set Animation

The Skill Set section animates progress bars when it enters the visible part of the sidebar.

Important:

- IntersectionObserver root is `.sidebar`
- animation resets when Skill Set leaves
- animation repeats when re-entering

Do not change observer root to window/document.

Current skill levels:

```text
Adobe Illustrator 100%
Adobe Photoshop 100%
Figma 93%
Blender 3D 93%
Cavalry 42%
AI tools (GPT, Mj, NB) 76%
Vibecoding 42%
```

---

## 9. Work Carousel — VERY IMPORTANT

The right panel contains a vertical infinite-loop carousel.

The actual scroller is:

```text
.work-panel .carousel
```

The carousel creates three rendered sets:

```text
clone
original working set
clone
```

Key functions:

```js
destroyWorkLoopCarousel()
initWorkLoopCarousel()
setupWorkCarouselLifecycle()
```

The loop measures real rendered DOM distances, not detached clones.

It calculates:

```js
cycleSpan
middleStart
```

The working loop boundaries are conceptually:

```js
const lowerBoundary = middleStart;
const upperBoundary = middleStart + cycleSpan;
```

Crossing the boundary shifts scrollTop by exactly one `cycleSpan`.

Do not rewrite this loop unless explicitly asked.

---

## 10. Carousel Resize / Breakpoint Lifecycle

The carousel is rebuilt when crossing the mobile breakpoint.

Current breakpoint:

```text
max-width: 960px
```

The lifecycle destroys and recreates the loop after the layout settles.

It uses nested `requestAnimationFrame()` before reinitializing.

This was necessary because measuring before the responsive layout finished caused broken loop metrics.

Do not remove the lifecycle or replace it with an immediate reinit.

---

## 11. Project Click Handling — EVENT DELEGATION

This is critical.

Carousel slides are recreated through `cloneNode()` / `replaceChildren()` during loop rebuilds.

Therefore project click handlers must NOT be attached directly to individual `.slide` elements.

Use event delegation on the stable carousel element.

Correct concept:

```js
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
```

Do not revert to listeners attached directly to each slide.

That caused project clicks to stop working after:
- desktop/mobile switch
- responsive carousel rebuild
- returning after layout changes

---

## 12. Mobile Home / Work Navigation

On mobile the left and right panels act as horizontally sliding screens.

Default:

```text
HOME / SIDEBAR visible
WORK panel offscreen to the right
```

Pressing Work:

```text
sidebar -> left
work panel -> into viewport
```

The current state is controlled using:

```text
.content-layout.is-work-open
```

Relevant initializer:

```js
initMobileWorkPanel()
```

Do not replace this with display:none or DOM removal.

Scroll positions should be preserved.

---

## 13. Mobile Carousel

Mobile carousel cards currently use their own responsive proportions.

Do not assume desktop and mobile card geometry is identical.

The mobile overlay / project caption behavior is controlled by:

```js
initMobileProjectOverlay()
```

It marks the active card using:

```text
.is-top
```

Do not remove this logic.

---

## 14. Project Detail View

Clicking a project opens a project detail screen.

Behavior:

1. header stays fixed
2. `.main-view` slides completely left
3. `.project-detail-view` slides in from the right
4. transition happens below the header
5. project detail has its own vertical scroll
6. Back reverses the transition
7. previous sidebar/work scroll positions are restored

Project view state includes saved scroll positions.

Core functions include:

```js
renderProjectDetail(projectId)
openProjectDetailView(projectId)
closeProjectDetailView()
initProjectDetailView()
```

Do not move project detail inside the carousel.

It must remain a sibling of `.main-view` inside `.content-stage`.

---

## 15. Project Detail Scroll

Actual project page scroller:

```text
.project-detail-scroller
```

It should use:

```css
height: 100%;
min-height: 0;
overflow-y: auto;
overflow-x: hidden;
```

Do not make body/document the project page scroller.

Header must remain outside this scroll.

---

## 16. Project Hero Images

Hero image rules:

- full available project-detail width
- natural image aspect ratio
- no crop
- no fixed aspect ratio
- no fixed/clamp height

Important:

`.project-detail-hero` must NOT contain leftover:

```css
aspect-ratio
height
min-height
padding-bottom
```

that forces extra empty space.

Hero concept:

```css
.project-detail-hero {
  display: block;
  width: 100%;
  height: auto;
  min-height: 0;
  overflow: hidden;
  background: transparent;
  line-height: 0;
}

.project-detail-hero img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
}
```

A previous bug came from a mobile:

```css
aspect-ratio: 4 / 3;
```

remaining on `.project-detail-hero`.

Do not reintroduce it.

---

## 17. Project Content Width System

Current intended logic:

### Desktop

There are two visual widths.

**Wide**
- project detail title bar
- hero image

**Content width**
- project metadata
- Overview
- Design Task
- Solution
- Design System
- all other text
- all project images BELOW the hero

All non-hero project images on desktop should align to the same left/right boundaries as metadata and text.

Do not create a third width.

### Mobile

Do not change the current mobile image width behavior unless explicitly requested.

The desktop narrowing of non-hero images is desktop-only.

---

## 18. Project Images Below Hero

All future case-study images should use the same reusable `.project-image` structure.

There will eventually be approximately 10–12 additional images per project.

Image behavior:

```css
display: block;
width: 100%;
height: auto;
```

Natural original ratio only.

Do not use:

```css
aspect-ratio
object-fit: cover
fixed height
height: clamp(...)
```

for case-study images.

On desktop `.project-image` should match the project content width.

Hero remains wider.

---

## 19. Project Metadata

Each project page contains a metadata section with four columns:

```text
project type
my role
client
year
```

Each column has:

1. thin blue line on top
2. small lowercase heading
3. individual blue value box

Important:
- not one continuous blue strip
- no black dividers
- each value is its own blue rectangle
- metadata uses the same content width as text
- metadata and text should align pixel-for-pixel left and right

The heading text should have the same left inset as the text inside the blue value box, while the top blue line still spans the full column width.

Mobile metadata grid is currently 2 columns.

---

## 20. Project Data

Internal IDs should remain stable unless absolutely necessary.

Current project IDs:

```text
cogs
kenya
beincrypto
heineken
moretti
```

Important: the visible project formerly called `Kenya Drip` was renamed to:

```text
COIL Coffee
```

Keep internal ID:

```text
data-project="kenya"
```

unless there is a strong reason to migrate it.

This avoids breaking existing JS references.

### COGS

```text
Title: COGS Cycling Community
Project type: Brand identity
Role: Art-director, graphic designer
Client/project: COGS pet-project
Year: 2026
```

### COIL Coffee

```text
Title: COIL Coffee
Internal ID: kenya
Project type: Brand identity
Role: Art-director, graphic designer
Client/project: COIL pet-project
Year: 2025
```

### BeInCrypto Awards 2026

```text
Project type: Event identity
Role: Art-director, graphic designer
Client: BeInCrypto
Year: 2026
```

### Heineken × Formula 1

```text
Project type: Experiential kit
Role: Art-director, graphic designer, 3D artist
Client: Heineken x F1
Year: 2025
```

### Birra Moretti Chalice

```text
Project type: Packaging design
Role: Graphic designer, 3D artist
Client: Birra Moretti
Year: 2025
```

---

## 21. Project Section Titles

Above Overview, do NOT display the project category again.

Wrong:

```text
BRAND IDENTITY
Overview
```

Correct:

```text
OVERVIEW
```

Use a reusable class such as:

```text
.project-section-title
```

for future headings:

```text
OVERVIEW
DESIGN TASK
SOLUTION
DESIGN SYSTEM
```

These headings are uppercase.

Do not create separate one-off styles for each heading.

---

## 22. Current Sidebar Content

Current sidebar includes:

- brand block
- Bio
- Design Habits
- Inspiration Sources
- Values
- What I do
- Skill Set
- additional separator / footer content

Do not rewrite those sections when working on only the brand block.

---

## 23. CURRENT NEXT TASK — Brand Block Redesign

This is the next planned change.

Only the existing `.brand-block` should be redesigned.

Reference direction:

```text
large blue card
├── top section
│   ├── circular portrait with white border
│   └── Nikita Puchko
│       Graphic & Brand Designer
│
├── thin white divider
│
└── status row
    ├── WORK EXPERIENCE: X years Y days
    └── STATUS: OPEN TO WORK
```

Important visual requirements:

- one solid blue rectangular card
- no border radius
- circular portrait with clean white outline
- name and role in white
- name lighter than the previous bold version
- white horizontal divider
- two white status boxes inside blue card
- labels in blue
- important values bold
- spacing should match the supplied design reference
- leave a clear vertical gap between brand block and Bio

Do not change the sidebar width or scroll architecture to achieve this.

---

## 24. Work Experience Counter

The Work Experience value must be dynamic.

Start date:

```text
01 January 2022
```

Display format:

```text
WORK EXPERIENCE: X years Y days
```

Meaning:

- X = completed full years since 01.01.2022
- Y = days since the most recent January 1 anniversary

Example:

```text
24 September 2026 -> 4 years 266 days
01 January 2027 -> 5 years 0 days
```

Do NOT calculate this as:

```text
totalDays / 365
```

Do not hardcode the current number.

Add a small isolated function, e.g.:

```js
initWorkExperienceCounter()
```

Call it inside the existing initialization flow.

Do not add another unnecessary independent DOMContentLoaded listener.

Do not mix this function into carousel logic.

---

## 25. CSS Philosophy

Avoid solving layout bugs by appending many conflicting overrides at the end of `global.css`.

Before adding a new rule:

1. find the existing selector
2. update it when possible
3. remove obsolete conflicting properties

This is especially important for:

```text
.brand-block
.brand
.logo
.brand-text
.name
.role
.project-detail-hero
.project-image
.project-meta
.project-block
```

The project previously accumulated conflicting `aspect-ratio`, width and padding rules. Avoid repeating that pattern.

---

## 26. JavaScript Philosophy

Do not rewrite `public/script.js` as a whole.

Add isolated functionality.

Current systems are interconnected:

- custom sidebar scrollbar
- Skill Set animation
- carousel infinite loop
- carousel responsive lifecycle
- mobile Work panel
- mobile project overlay
- project detail rendering
- project open/close state

Before editing JS, identify which existing function owns the behavior.

Do not move unrelated code.

---

## 27. Responsive Testing Checklist

After any layout / JS change, verify all of these.

### Desktop

- sidebar scroll works
- custom sidebar scrollbar works
- Work carousel scroll works
- infinite loop works
- project cards open
- project detail slides in
- header stays fixed
- project detail scroll works
- Back works
- old work scroll position is restored

### Mobile

- Home/sidebar scroll works
- Work button opens Work panel
- Work carousel scrolls
- loop still works
- mobile project caption behavior works
- project cards open
- Back returns to Work, not Home
- previous Work scroll position remains

### Resize

Test:

```text
desktop -> mobile -> desktop
```

and:

```text
mobile -> desktop -> mobile
```

Project cards must remain clickable after responsive rebuild.

---

## 28. Things That Must Not Be Broken

Do not change these without explicit instruction:

- GitHub Pages base path
- base-aware asset paths
- header positioning
- body overflow model
- independent sidebar scrolling
- Work carousel independent scrolling
- custom sidebar scrollbar
- infinite loop carousel
- carousel resize lifecycle
- event delegation for project clicks
- project detail slide transition
- project detail independent scroll
- saved scroll restoration
- mobile Home / Work transition
- mobile project overlay
- Skill Set observer root
- internal project IDs
- working responsive breakpoints

---

## 29. Before Making Any Change

When receiving a new task:

1. inspect the current relevant HTML, CSS and JS
2. identify the smallest set of selectors/functions involved
3. preserve unrelated systems
4. make the smallest targeted change
5. check desktop
6. check mobile
7. check desktop/mobile resize
8. run build

Build command:

```powershell
npm.cmd run build
```

Do not consider a change complete if the target looks right but scrolling, carousel looping, mobile navigation or project clicks stop working.

---

## 30. Recommended First Message for a New AI Agent

Use this when opening the project from a new account:

```text
Read PROJECT_CONTEXT.md completely before making any changes.

This is an existing Astro portfolio with custom independent scrolling, an infinite vertical carousel, responsive mobile panel transitions, and sliding project detail views.

Preserve the current architecture and working behavior. Do not refactor unrelated systems.

Before editing anything, inspect the relevant current files and make the smallest targeted change required by my request.

After every change, verify desktop, mobile, scrolling, carousel loop, project card clicks, project page transitions and responsive resize.
```
