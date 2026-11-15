// Шесть still из общей шкалы времени: проверяются также стыки и локальные кадры сцен.
import { bundle } from "@remotion/bundler";
import { openBrowser, renderStill, selectComposition } from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import path from "node:path";

await mkdir("out", { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), outDir: path.resolve("out/ep01-check-bundle") });
const browser = await openBrowser("chrome");
try {
  const composition = await selectComposition({ serveUrl, id: "Ep01-Kasseta", puppeteerInstance: browser });
  if (composition.durationInFrames !== 18 * composition.fps) throw new Error("Сцены 1–3 должны занимать 18 секунд.");
  const shots = [
    ["scene01-a", 1], ["scene01-b", 3.5],
    ["scene02-a", 4.5], ["scene02-b", 9],
    ["scene03-a", 11.2], ["scene03-b", 17],
  ];
  for (const [name, seconds] of shots) {
    const frame = Math.round(seconds * composition.fps);
    const output = path.resolve(`out/ep01-${name}.png`);
    await renderStill({ serveUrl, composition, frame, output, imageFormat: "png", puppeteerInstance: browser });
    console.log(`${output}: кадр ${frame}`);
  }
} finally {
  await browser.close({ silent: true });
}
