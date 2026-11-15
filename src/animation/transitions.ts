export type TransitionSpec = {
  type: "flash" | "zoom" | "wipe";
  durationInFrames: number;
  color?: string;
  direction?: "left" | "right" | "up" | "down";
  zoom?: number;
};

export type SceneTiming = {
  id: string;
  durationInFrames: number;
  /** Переход ИЗ предыдущей сцены В эту. У первой сцены его нет. */
  transition?: TransitionSpec;
};

/** Окно эффекта центрировано на склейке; длительность сцен не меняется. */
export const getTransitionWindows = (scenes: readonly SceneTiming[]) => {
  const ids = new Set<string>();
  let start = 0;
  return scenes.map((scene, index) => {
    if (!scene.id || ids.has(scene.id)) throw new Error("У сцен должны быть разные непустые id.");
    ids.add(scene.id);
    if (!Number.isInteger(scene.durationInFrames) || scene.durationInFrames <= 0) {
      throw new Error("Длительность сцены должна быть положительным целым числом кадров.");
    }
    const transition = scene.transition;
    if (transition) {
      const duration = transition.durationInFrames;
      const lead = Math.floor(duration / 2);
      const tail = duration - lead - 1;
      if (
        index === 0 || !Number.isInteger(duration) || duration < 4 ||
        lead > scenes[index - 1].durationInFrames || tail >= scene.durationInFrames ||
        !["flash", "zoom", "wipe"].includes(transition.type) ||
        (transition.zoom !== undefined && (!Number.isFinite(transition.zoom) || transition.zoom < 1))
      ) {
        throw new Error(`Переход сцены ${scene.id} не помещается между соседними сценами.`);
      }
    }
    const incomingTail = transition ? transition.durationInFrames - Math.floor(transition.durationInFrames / 2) - 1 : 0;
    const outgoing = scenes[index + 1]?.transition;
    const outgoingLead = outgoing ? Math.floor(outgoing.durationInFrames / 2) : 0;
    if (incomingTail + outgoingLead >= scene.durationInFrames) {
      throw new Error(`Переходы перекрываются внутри сцены ${scene.id}.`);
    }
    const window = {
      start,
      from: start - (transition ? Math.floor(transition.durationInFrames / 2) : 0),
      transition,
    };
    start += scene.durationInFrames;
    return window;
  });
};
