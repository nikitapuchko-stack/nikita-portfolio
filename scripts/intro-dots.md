# Intro dot animation

`extract-intro-dots.mjs` is an offline authoring tool, not a build or browser dependency. It reads the reference GIF and writes the vector data in `src/data/intro-dots.json` plus a per-frame analysis report. Regenerate from the repository root with:

```sh
node scripts/extract-intro-dots.mjs
```

The source is 868 × 140, with 576 frames of 40 ms: a 23,040 ms loop. Its eight phrases each occupy 72 frames / 2,880 ms:

| Start | Phrase |
| --- | --- |
| 0 ms | BRAND IDENTITY |
| 2,880 ms | LOGO DESIGN |
| 5,760 ms | KEY VISUALS |
| 8,640 ms | PRINT & PRODUCTION |
| 11,520 ms | EDITORIAL DESIGN |
| 14,400 ms | WEB & LANDING PAGE |
| 17,280 ms | 3D DESIGN |
| 20,160 ms | ART DIRECTION |

The apparent motion comes from visibility changes at fixed dot positions, not traveling particles. For the first phrase, frames 1–9 assemble, 10–43 hold, 44–53 dissolve, and 54–71 are blank. The generated timeline retains the actual visibility set for every frame, including the different per-dot flicker patterns in each phrase. No random animation or interpolated fades are added.

Each connected white component becomes a circle whose center is its subpixel centroid and whose area equals the source component's area. There are 1,031 distinct geometries across the entire sequence, at most 408 visible at once, and 161 unique visibility states. All SVG circles persist in the DOM; JavaScript only toggles opacity on changed circles. The equal-area circular approximation has 98.41% binary pixel-mask intersection-over-union over all source frames; browser vector antialiasing intentionally differs from the GIF's hard raster edges.

`IntroDots.astro` owns the SVG and its responsive placement. `intro-dots.js` replays the timeline using elapsed time, pauses in hidden tabs, and stops through the intro's existing AbortSignal when the CTA is pressed. Reduced motion displays the first complete phrase without flicker.

Every circle uses `fill="currentColor"`. Set `--intro-fg` on `.intro-view` (or an ancestor) to recolor the animation; the default is `--blue`. The website never fetches or decodes the reference GIF. The original file is retained only as an authoring reference.
