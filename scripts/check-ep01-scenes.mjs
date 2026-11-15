// По два основных still на сцену из общей шкалы; аргументы 4-6 и 7-9 ограничивают проверку.
import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import path from "node:path";

await mkdir("out", { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), outDir: path.resolve("out/ep01-check-bundle") });
const browser = await openBrowser("chrome");
try {
  const composition = await selectComposition({ serveUrl, id: "Ep01-Kasseta", puppeteerInstance: browser });
  if (composition.durationInFrames !== 57 * composition.fps) throw new Error("Сцены 1–9 должны занимать 57 секунд.");
  const shots = [
    ["scene01-a", 1], ["scene01-b", 3.5],
    ["scene02-a", 4.5], ["scene02-b", 9],
    ["scene03-a", 11.2], ["scene03-b", 17],
    ["scene04-a", 18.9], ["scene04-b", 21.7],
    ["scene05-a", 26.8], ["scene05-b", 37.1],
    ["scene06-a", 39.5], ["scene06-b", 42.6],
    ["scene07-a", 45.4], ["scene07-b", 47],
    ["scene08-a", 48.9], ["scene08-b", 52.6],
    ["scene09-a", 55.8], ["scene09-b", 56.6],
  ];
  const selected = process.argv[2] === "4" ? shots.slice(6, 8)
    : process.argv[2] === "4-6" ? shots.slice(6, 12)
    : process.argv[2] === "7-9" ? shots.slice(12)
    : process.argv[2] === "4-6-details" ? [
      ["scene04-start", 18], ["scene04-dust", 20.05], ["scene04-insert", 21.05],
    ]
    : process.argv[2] === "7-9-motion" ? [
      ["scene08-moving", 49.55],
      ["scene09-start", 53], ["scene09-middle", 54.65], ["scene09-before-cut", 56.267],
    ] : shots;
  for (const [name, seconds] of selected) {
    const frame = Math.round(seconds * composition.fps);
    const output = path.resolve(`out/ep01-${name}.png`);
    await renderStill({ serveUrl, composition, frame, output, imageFormat: "png", puppeteerInstance: browser });
    console.log(`${output}: кадр ${frame}`);
  }
} finally {
  await browser.close({ silent: true });
}
