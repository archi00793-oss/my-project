import { useEffect, useState } from "react";
import { useDelayRender, useVideoConfig } from "remotion";
import { loadCaptionsFromSrt } from "../animation/captions";
import type { Caption } from "../animation/captions";

/** Ожидает SRT перед рендером; ошибка файла останавливает рендер с сообщением. */
export const useSrtCaptions = (filename: string): Caption[] | null => {
  const { fps } = useVideoConfig();
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [loaded, setLoaded] = useState<{ filename: string; fps: number; captions: Caption[] } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const handle = delayRender(`Загрузка субтитров: ${filename}`);
    let active = true;
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      continueRender(handle);
    };
    loadCaptionsFromSrt(filename, fps, controller.signal)
      .then((captions) => { if (active) setLoaded({ filename, fps, captions }); })
      .catch((error: unknown) => { if (active) cancelRender(error instanceof Error ? error : new Error(String(error))); })
      .finally(release);
    return () => {
      active = false;
      controller.abort();
      release();
    };
  }, [filename, fps, delayRender, continueRender, cancelRender]);

  return loaded?.filename === filename && loaded.fps === fps ? loaded.captions : null;
};
