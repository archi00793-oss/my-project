import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, ease, mouthFlap } from "../../animation/motion";
import { Lyokha } from "../../characters/Lyokha";
import { Camera } from "../../components/Camera";
import { Captions, isTalking, type Caption } from "../../components/Captions";
import { Sfx } from "../../components/Sfx";
import { sec } from "../../config/video";
import { TapeBox, VhsTape } from "../../props";
import { Apartment } from "../../scenes/Apartment";
import { Doorway } from "../../scenes/Doorway";
import { LyokhaCloseup } from "./LyokhaCloseup";
import { FIRST_TAPE_LABEL } from "./Scene01";

export const SCENE03_DURATION = sec(8);

const captions: Caption[] = [
  { text: "Дед…", from: sec(5.8), to: sec(6.5) },
  { text: "У тебя даже", from: sec(6.5), to: sec(7.2) },
  { text: "видика не было.", from: sec(7.2), to: SCENE03_DURATION },
];

/** 0:10–0:18. Закрытая посылка → пустая площадка → перенос → распаковка. */
export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const door = ease(frame, sec(0.8), sec(1.5));
  const approach = ease(frame, 0, sec(0.7));
  const crouch = ease(frame, sec(1.5), sec(1.95)) * (1 - ease(frame, sec(2.1), sec(2.7)));
  const lift = ease(frame, sec(2.1), sec(2.7));
  const inside = frame >= sec(2.9);
  const unpacked = frame >= sec(3.4);
  const reaction = frame >= sec(5.8);
  const heroX = 210 + approach * 180 - door * 290;
  const boxX = 430;
  const boxY = 1280 - lift * 380;
  const scale = 500 / 600;
  const handY = (boxY + 100 - 620) / scale;
  return (
    <AbsoluteFill>
      {reaction ? <LyokhaCloseup expression="sad" headTilt={9}
        mouthOpen={mouthFlap(frame, isTalking(captions, frame)) * 0.65} /> :
      <Camera transformOrigin="0 0" keyframes={[{ frame: 0, zoom: unpacked ? 1.65 : 1,
        x: unpacked ? -330 : 0, y: unpacked ? -900 : 0 }]}>
        {inside ? <Apartment /> : <Doorway openProgress={door} />}
        {!inside ? <>
          <TapeBox open={false} width={300} style={{ position: "absolute", left: boxX, top: boxY }} />
          <Lyokha width={500} jacket holdingPhone={false} crouch={crouch} expression="confused"
            handRight={frame < sec(1.5) ? [(700 - door * 420 - heroX) / scale, (1040 + door * 20 - 620) / scale] : [(boxX + 250 - heroX) / scale, handY]}
            handLeft={frame >= sec(1.8) ? [(boxX + 45 - heroX) / scale, handY] : undefined}
            eyesOpen={blink(frame)} style={{ position: "absolute", left: heroX, top: 620 }} />
        </> : <>
          <Lyokha width={570} holdingPhone={false} expression="confused" headTilt={6}
            handLeft={[170, 650]} handRight={[470, 650]}
            style={{ position: "absolute", left: 280, top: 440 }} />
          <TapeBox open={unpacked} labels={["", "", "", ""]} width={500}
            style={{ position: "absolute", left: 310, top: 970 }} />
          {unpacked && <VhsTape label={FIRST_TAPE_LABEL} width={400}
            style={{ position: "absolute", left: 360, top: 865 }} />}
        </>}
      </Camera>}

      <Captions captions={captions} fontSize={124} top={1360} />
      <Sfx src="ep01-doorbell.wav" name="Звонок в дверь" from={0} durationInFrames={sec(0.7)} volume={0.65} />
    </AbsoluteFill>
  );
};
