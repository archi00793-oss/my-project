// По два still на сцену из общей шкалы времени; аргумент 4-6 проверяет новые сцены.
import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import path from "node:path";

await mkdir("out", { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), outDir: path.resolve("out/ep01-check-bundle") });
const browser = await openBrowser("chrome");
try {
  const composition = await selectComposition({ serveUrl, id: "Ep01-Kasseta", puppeteerInstance: browser });
  if (composition.durationInFrames !== 43 * composition.fps) throw new Error("Сцены 1–6 должны занимать 43 секунды.");
  const shots = [
    ["scene01-a", 1], ["scene01-b", 3.5],
    ["scene02-a", 4.5], ["scene02-b", 9],
    ["scene03-a", 11.2], ["scene03-b", 17],
    ["scene04-a", 18.9], ["scene04-b", 21.7],
    ["scene05-a", 26.8], ["scene05-b", 37.1],
    ["scene06-a", 39.5], ["scene06-b", 42.6],
  ];
  const selected = process.argv[2] === "4-6" ? shots.slice(6) : shots;
  for (const [name, seconds] of selected) {
    const frame = Math.round(seconds * composition.fps);
    const output = path.resolve(`out/ep01-${name}.png`);
    await renderStill({ serveUrl, composition, frame, output, imageFormat: "png", puppeteerInstance: browser });
    console.log(`${output}: кадр ${frame}`);
  }
} finally {
  await browser.close({ silent: true });
}
