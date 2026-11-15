// Собственный двухтональный дверной звонок; повторяемая генерация без внешних ассетов.
import { writeFile } from "node:fs/promises";

const sampleRate = 48000;
const seconds = 0.7;
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
  const note = t < 0.32 ? t : t - 0.32;
  const frequency = t < 0.32 ? 784 : 622.25;
  const envelope = Math.min(1, note / 0.008) * Math.exp(-note * 10) * Math.min(1, (seconds - t) / 0.03);
  const sound = Math.sin(2 * Math.PI * frequency * note) + 0.22 * Math.sin(2 * Math.PI * frequency * 2 * note);
  wav.writeInt16LE(Math.round(sound * envelope * 0.45 * 32767), 44 + i * 2);
}
await writeFile(new URL("../public/sfx/ep01-doorbell.wav", import.meta.url), wav);
console.log("public/sfx/ep01-doorbell.wav: 0.7 с");
