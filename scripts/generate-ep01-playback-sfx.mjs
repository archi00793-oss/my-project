// Собственные короткие эффекты для сцен 4–6; речь и музыка не синтезируются.
import { writeFile } from "node:fs/promises";

const sampleRate = 48000;
const noise = (i) => {
  let n = Math.imul(i + 1, 374761393);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 2147483648 - 1;
};
const thud = (t, start) => {
  const dt = t - start;
  return dt < 0 ? 0 : Math.sin(2 * Math.PI * 87 * dt) * Math.exp(-dt * 22);
};
const effects = [
  ["boxes", 1.25, (t, i) => (thud(t, 0.3) + thud(t, 0.55) + thud(t, 0.8)) * 0.6 + noise(i) * 0.12 * Math.exp(-t * 3)],
  ["dust", 0.8, (t, i) => noise(i) * Math.sin(Math.PI * t / 0.8) ** 2 * 0.5],
  ["insert", 0.6, (t, i) => Math.sin(2 * Math.PI * (160 * t + 45 * t * t)) * 0.12 + noise(i) * 0.1 + thud(t, 0.4) * 0.6],
  ["static", 3, (t, i) => noise(i) * (0.27 + 0.08 * Math.sin(t * 41))],
  ["marker", 2.6, (t, i) => noise(i) * Math.max(0, Math.sin(t * 31)) ** 2 * 0.28],
  ["tape-stop", 0.25, (t, i) => thud(t, 0) * 0.6 + noise(i) * 0.25 * Math.exp(-t * 35)],
];
for (const [name, duration, sound] of effects) {
  const count = Math.round(duration * sampleRate);
  const wav = Buffer.alloc(44 + count * 2);
  wav.write("RIFF", 0);
  wav.writeUInt32LE(wav.length - 8, 4);
  wav.write("WAVEfmt ", 8);
  wav.writeUInt32LE(16, 16);
  wav.writeUInt16LE(1, 20);
  wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(sampleRate, 24);
  wav.writeUInt32LE(sampleRate * 2, 28);
  wav.writeUInt16LE(2, 32);
  wav.writeUInt16LE(16, 34);
  wav.write("data", 36);
  wav.writeUInt32LE(count * 2, 40);
  for (let i = 0; i < count; i++) {
    const t = i / sampleRate;
    const envelope = Math.min(1, t / 0.004, (duration - t) / 0.015);
    wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, sound(t, i) * envelope)) * 32767), 44 + i * 2);
  }
  await writeFile(new URL(`../public/sfx/ep01-${name}.wav`, import.meta.url), wav);
  console.log(`ep01-${name}.wav: ${duration} с`);
}
