// Собственные короткие тестовые звуки. Генерация повторяема и не требует FFmpeg.
import { mkdir, writeFile } from "node:fs/promises";

const sampleRate = 48000;
const output = new URL("../public/sfx/", import.meta.url);
await mkdir(output, { recursive: true });

const writeWav = async (name, seconds, sample) => {
  const count = Math.round(seconds * sampleRate);
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
    const p = i / (count - 1);
    // Нулевая амплитуда на краях предотвращает щелчок при включении.
    const envelope = Math.sin(Math.PI * p) ** 2;
    const value = Math.max(-1, Math.min(1, sample(t, p) * envelope * 0.55));
    wav.writeInt16LE(Math.round(value * 32767), 44 + i * 2);
  }
  await writeFile(new URL(name, output), wav);
  console.log(`public/sfx/${name}: ${seconds} с`);
};

await writeWav("flash.wav", 0.25, (t) =>
  0.7 * Math.sin(2 * Math.PI * 1046.5 * t) + 0.3 * Math.sin(2 * Math.PI * 1569.75 * t));
await writeWav("zoom.wav", 0.4, (t) =>
  Math.sin(2 * Math.PI * (150 * t + 1500 * t * t)));
await writeWav("wipe.wav", 0.6, (t) =>
  (Math.sin(2 * Math.PI * (2200 * t - 1300 * t * t)) + Math.sin(2 * Math.PI * 2917 * t)) / 2);
await writeWav("shake.wav", 0.5, (t) =>
  Math.sin(2 * Math.PI * 78 * t) * Math.sin(2 * Math.PI * 17 * t));
