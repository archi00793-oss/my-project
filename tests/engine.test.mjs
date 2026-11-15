import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getCameraState } from "../src/animation/camera.ts";
import { getTransitionWindows } from "../src/animation/transitions.ts";
import { getCaptionWords, loadCaptionsFromSrt, parseSrtCaptions } from "../src/animation/captions.ts";
import { getSfxVolume } from "../src/animation/audio.ts";

test("Камера удерживает крайние положения и наследует незаданные координаты", () => {
  const keys = [{ frame: 10, zoom: 1, x: 20 }, { frame: 30, zoom: 1.2, y: -10 }];
  assert.deepEqual(getCameraState(0, keys), { zoom: 1, x: 20, y: 0, rotation: 0 });
  assert.deepEqual(getCameraState(40, keys), { zoom: 1.2, x: 20, y: -10, rotation: 0 });
  const middle = getCameraState(20, keys);
  assert.ok(Math.abs(middle.zoom - 1.1) < 1e-10);
  assert.equal(middle.x, 20);
  assert.equal(middle.y, -5);
});

test("Тряска повторяема при перемотке и не выходит за свои границы", () => {
  const shakes = [{ from: 15, durationInFrames: 12, strength: 20, seed: "test" }];
  const state = getCameraState(20, [], shakes);
  getCameraState(24, [], shakes);
  assert.deepEqual(getCameraState(20, [], shakes), state);
  assert.notDeepEqual(state, getCameraState(20));
  for (const frame of [0, 14, 15, 26, 27, 100]) {
    assert.deepEqual(getCameraState(frame, [], shakes), getCameraState(frame));
  }
  assert.ok(Math.abs(state.x) <= 20 && Math.abs(state.y) <= 20);
});

test("Камера отвергает повторные кадры и недопустимый zoom", () => {
  assert.throws(() => getCameraState(0, [{ frame: 10 }, { frame: 10 }]));
  assert.throws(() => getCameraState(0, [{ frame: 0, zoom: 0 }]));
  assert.throws(() => getCameraState(0, [], [{ from: 0, durationInFrames: 1 }]));
});

test("Все переходы центрируются на склейках без сдвига следующей сцены", () => {
  const windows = getTransitionWindows([
    { id: "a", durationInFrames: 75 },
    { id: "b", durationInFrames: 75, transition: { type: "flash", durationInFrames: 12 } },
    { id: "c", durationInFrames: 75, transition: { type: "zoom", durationInFrames: 13 } },
    { id: "d", durationInFrames: 75, transition: { type: "wipe", durationInFrames: 18 } },
  ]);
  assert.deepEqual(windows.map((w) => w.start), [0, 75, 150, 225]);
  assert.deepEqual(windows.map((w) => w.from), [0, 69, 144, 216]);
});

test("Переходы отвергают конфликтующие окна и повторные id", () => {
  assert.throws(() => getTransitionWindows([{ id: "a", durationInFrames: 5, transition: { type: "flash", durationInFrames: 4 } }]));
  assert.throws(() => getTransitionWindows([{ id: "a", durationInFrames: 5 }, { id: "a", durationInFrames: 5 }]));
  assert.throws(() => getTransitionWindows([{ id: "a", durationInFrames: 5 }, { id: "b", durationInFrames: 5, transition: { type: "wipe", durationInFrames: 30 } }]));
});

test("SRT: BOM, CRLF, несколько строк и пересчёт под разные fps", () => {
  const input = "\uFEFF1\r\n00:00:01,250 --> 00:00:02,500\r\nПервая строка\r\nвторая строка\r\n";
  assert.deepEqual(parseSrtCaptions(input, 24), [{ text: "Первая строка вторая строка", from: 30, to: 60 }]);
  assert.deepEqual(parseSrtCaptions(input, 60), [{ text: "Первая строка вторая строка", from: 75, to: 150 }]);
});

test("SRT: короткая реплика не теряется, ошибочный файл не скрывается", () => {
  assert.deepEqual(parseSrtCaptions("1\n00:00:00,001 --> 00:00:00,002\nКоротко\n", 30), [{ text: "Коротко", from: 0, to: 1 }]);
  assert.throws(() => parseSrtCaptions("это не SRT", 30));
  assert.throws(() => parseSrtCaptions("1\n00:00:02,000 --> 00:00:01,000\nОшибка\n", 30));
  assert.throws(() => parseSrtCaptions("", 0));
});

test("Слова распределяются по кадрам и сохраняют неразрывный пробел", () => {
  assert.deepEqual(getCaptionWords({ text: "До цели 30\u00a0дней", from: 10, to: 20 }), [
    { text: "До", from: 10, to: 13 },
    { text: "цели", from: 13, to: 16 },
    { text: "30\u00a0дней", from: 16, to: 20 },
  ]);
  assert.deepEqual(getCaptionWords({ text: "  ", from: 0, to: 30 }), []);
});

test("SRT-загрузчик сообщает об отсутствии файла и запрещает выход из audio", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response("Not found", { status: 404 });
    await assert.rejects(loadCaptionsFromSrt("missing.srt", 30), /HTTP 404/);
    await assert.rejects(loadCaptionsFromSrt("../private.srt", 30), /public\/audio/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Демонстрационные субтитры лежат в границах 10-секундной сцены", async () => {
  const input = await readFile(new URL("../public/audio/ep00-engine.srt", import.meta.url), "utf8");
  const captions = parseSrtCaptions(input, 30);
  assert.equal(captions.length, 3);
  assert.ok(captions.every((c) => c.from >= 75 && c.from < c.to && c.to <= 300));
});

test("SFX: громкость затухает к краям и не появляется вне окна", () => {
  const envelope = { volume: 0.6, durationInFrames: 15, fadeInFrames: 2, fadeOutFrames: 3 };
  assert.equal(getSfxVolume(-1, envelope), 0);
  assert.equal(getSfxVolume(0, envelope), 0);
  assert.equal(getSfxVolume(2, envelope), 0.6);
  assert.equal(getSfxVolume(7, envelope), 0.6);
  assert.equal(getSfxVolume(14, envelope), 0);
  assert.equal(getSfxVolume(15, envelope), 0);
  assert.throws(() => getSfxVolume(0, { volume: 2 }));
  assert.throws(() => getSfxVolume(0, { fadeOutFrames: 3 }));
});

test("SFX: четыре WAV-файла имеют корректный PCM-заголовок и ненулевой звук", async () => {
  for (const file of ["shake", "flash", "zoom", "wipe"]) {
    const wav = await readFile(new URL(`../public/sfx/${file}.wav`, import.meta.url));
    assert.equal(wav.toString("ascii", 0, 4), "RIFF");
    assert.equal(wav.readUInt32LE(4), wav.length - 8);
    assert.equal(wav.toString("ascii", 8, 16), "WAVEfmt ");
    assert.equal(wav.readUInt32LE(24), 48000);
    assert.ok(wav.subarray(44).some((value) => value !== 0));
  }
});
