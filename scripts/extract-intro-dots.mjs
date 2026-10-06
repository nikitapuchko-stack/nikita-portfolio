// Offline authoring tool. The website uses only the generated vector data.
// Run from the repository root: node scripts/extract-intro-dots.mjs
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const source = "public/images/Loading_page_assets/What_i_do.gif";
const metadata = await sharp(source).metadata();
const { width, height, pages, delay } = metadata;
const raw = await sharp(source, { animated: true }).ensureAlpha().raw().toBuffer();
const atlas = [];
const atlasIds = new Map();
const frames = [];
const counts = [];
let sourcePixels = 0;
let intersection = 0;
let union = 0;
const round = value => Math.round(value * 100) / 100;

for (let frame = 0; frame < pages; frame++) {
  const offset = frame * width * height * 4;
  const visited = new Uint8Array(width * height);
  const visible = [];
  for (let pixel = 0; pixel < visited.length; pixel++) {
    if (visited[pixel] || !raw[offset + pixel * 4 + 3]) continue;
    // Eight-connected components: each isolated white island is one actual dot.
    const pixels = [pixel];
    visited[pixel] = 1;
    let sumX = 0, sumY = 0;
    for (let head = 0; head < pixels.length; head++) {
      const position = pixels[head];
      const x = position % width, y = Math.floor(position / width);
      sumX += x + 0.5;
      sumY += y + 0.5;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy, next = ny * width + nx;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height || visited[next] || !raw[offset + next * 4 + 3]) continue;
          visited[next] = 1;
          pixels.push(next);
        }
      }
    }
    if (pixels.length > 40) throw new Error(`Merged dots in frame ${frame}; inspect before regenerating.`);
    // Subpixel centroid and equal-area radius retain the source's small size variations.
    const dot = [round(sumX / pixels.length), round(sumY / pixels.length), round(Math.sqrt(pixels.length / Math.PI))];
    const key = dot.join(",");
    if (!atlasIds.has(key)) { atlasIds.set(key, atlas.length); atlas.push(dot); }
    visible.push(atlasIds.get(key));
    sourcePixels += pixels.length;
    const original = new Set(pixels);
    const [cx, cy, radius] = dot;
    let overlap = 0, drawn = 0;
    for (let y = Math.floor(cy - radius); y <= Math.ceil(cy + radius); y++) {
      for (let x = Math.floor(cx - radius); x <= Math.ceil(cx + radius); x++) {
        if ((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 <= radius ** 2) {
          drawn++;
          if (original.has(y * width + x)) overlap++;
        }
      }
    }
    intersection += overlap;
    union += pixels.length + drawn - overlap;
  }
  visible.sort((a, b) => a - b);
  frames.push(visible);
  counts.push(visible.length);
}

// Identical holds and blank pauses share one state. Every original frame keeps its timing.
const states = [], stateIds = new Map();
const timeline = frames.map(visible => {
  const key = visible.join(",");
  if (!stateIds.has(key)) { stateIds.set(key, states.length); states.push(visible); }
  return stateIds.get(key);
});
const phrases = ["BRAND IDENTITY", "LOGO DESIGN", "KEY VISUALS", "PRINT & PRODUCTION", "EDITORIAL DESIGN", "WEB & LANDING PAGE", "3D DESIGN", "ART DIRECTION"];
const data = {
  width, height,
  duration: delay.reduce((total, ms) => total + ms, 0),
  delays: delay,
  phrases: phrases.map((text, index) => ({ text, startFrame: index * 72 })),
  reducedMotionFrame: 24,
  dots: atlas,
  states,
  timeline,
};
await mkdir("src/data", { recursive: true });
await writeFile("src/data/intro-dots.json", JSON.stringify(data) + "\n");
const report = {
  source, sha256: createHash("sha256").update(await readFile(source)).digest("hex"),
  width, height, frames: pages, delays: [...new Set(delay)], duration: data.duration,
  uniqueDots: atlas.length, uniqueStates: states.length, maxVisibleDots: Math.max(...counts),
  sourcePixels, binaryCircleIntersectionOverUnion: intersection / union,
  visibleDotsPerFrame: counts,
};
await writeFile("src/data/intro-dots-analysis.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ ...report, visibleDotsPerFrame: undefined }, null, 2));
