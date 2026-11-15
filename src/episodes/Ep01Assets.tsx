import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, FONTS, sec, VIDEO } from "../config/video";
import { Lyokha } from "../characters/Lyokha";
import { Ded } from "../characters/Ded";
import { Doshirak, Phone, Scooter, TapeBox, Tv, Vcr, VhsTape } from "../props";

export const EP01_ASSETS_DURATION = sec(4);

const Label: React.FC<{ children: React.ReactNode; sub?: string }> = ({ children, sub }) => (
  <div style={{ textAlign: "center", color: COLORS.paper, fontSize: 28, lineHeight: 1.2 }}>
    {children}
    {sub && <div style={{ marginTop: 5, fontSize: 21, color: COLORS.grayHairShadow }}>{sub}</div>}
  </div>
);

const SectionTitle: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => (
  <div style={{ position: "absolute", left: 64, right: 64, top, display: "flex", alignItems: "center", gap: 18,
    color: COLORS.courier, fontSize: 24, letterSpacing: 3 }}>
    {children}<div style={{ height: 2, flex: 1, background: COLORS.plasticLight }} />
  </div>
);

/** Технический лист ассетов, без сцен и событий за пределами сценария. */
export const Ep01Assets: React.FC = () => (
  <AbsoluteFill style={{ width: VIDEO.width, height: VIDEO.height, background: COLORS.night,
    fontFamily: FONTS.caption, color: COLORS.paper }}>
    <div style={{ position: "absolute", top: 174, left: 64, right: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ fontSize: 92, lineHeight: 1 }}>ЛЁХИНО<span style={{ color: COLORS.courier }}>.</span></div>
      <div style={{ padding: "10px 20px", background: COLORS.courier, color: COLORS.night,
        borderRadius: 12, fontSize: 28 }}>01 / КАССЕТА</div>
    </div>
    <div style={{ position: "absolute", top: 274, left: 67, fontSize: 26, letterSpacing: 2, color: COLORS.grayHairShadow }}>
      ПЕРСОНАЖИ И РЕКВИЗИТ · ЛИСТ АССЕТОВ
    </div>

    <SectionTitle top={329}>ЛЁХА / 27 ЛЕТ</SectionTitle>
    <div style={{ position: "absolute", top: 365, left: 64, right: 64, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      <div style={{ textAlign: "center" }}>
        <Lyokha width={210} expression="neutral" headTilt={-3} />
        <Label sub="Куртка + телефон">ПОСЛЕ СМЕНЫ</Label>
      </div>
      <div style={{ textAlign: "center" }}>
        <Lyokha width={210} expression="sad" jacket={false} headTilt={9} eyesOpen={0.85} lookX={-0.5} />
        <Label sub="Куртка снята">РАСТЕРЯННОСТЬ</Label>
      </div>
      <div style={{ textAlign: "center" }}>
        <Lyokha width={210} expression="surprised" mouthOpen={0.7} armLeft={62} armRight={34} headTilt={-7} />
        <Label sub="Руки / рот / наклон">«…КОМУ?»</Label>
      </div>
    </div>

    <SectionTitle top={839}>ДЕД МИХАЛЫЧ / ВИДЕОЗАПИСЬ</SectionTitle>
    <div style={{ position: "absolute", top: 878, left: 64, right: 64, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      <div style={{ textAlign: "center" }}>
        <Ded width={177} headTilt={-4} />
        <Label>ХИТРЫЙ ПРИЩУР</Label>
      </div>
      <div style={{ textAlign: "center" }}>
        <Ded width={177} expression="serious" headTilt={3} mouthOpen={0.3} />
        <Label>«НЕ ОТДАВАЙ»</Label>
      </div>
      <div style={{ textAlign: "center" }}>
        <Ded width={177} expression="happy" armRight={55} mouthOpen={0.5} />
        <Label>«НЕ РЕВИ»</Label>
      </div>
    </div>

    <SectionTitle top={1144}>РЕКВИЗИТ / СЕРИЯ 01</SectionTitle>
    <div style={{ position: "absolute", top: 1185, left: 64, right: 64, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
      <div>
        <div style={{ height: 157, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <VhsTape width={218} label="Открой, когда меня не станет" />
        </div>
        <Label>КАССЕТА</Label>
      </div>
      <div>
        <div style={{ height: 157, display: "flex", alignItems: "center", justifyContent: "center" }}><TapeBox width={180} /></div>
        <Label>КОРОБКА</Label>
      </div>
      <div>
        <div style={{ height: 157, display: "flex", alignItems: "center", justifyContent: "center" }}><Vcr width={218} /></div>
        <Label>ВИДИК</Label>
      </div>
      <div>
        <div style={{ height: 157, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Tv width={210} noise={0.18}>
            <div style={{ width: "100%", height: "100%", background: COLORS.forestDark,
              display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
              <Ded width={230} />
            </div>
          </Tv>
        </div>
        <Label>ТВ / ПОМЕХИ</Label>
      </div>
    </div>
    <div style={{ position: "absolute", top: 1402, left: 64, right: 64, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      <div>
        <div style={{ height: 189, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Phone width={95}>
            <div style={{ padding: "63px 12px 0", color: COLORS.paper, fontFamily: FONTS.caption }}>
              <div style={{ fontSize: 17, color: COLORS.grayHair }}>НА КАРТЕ</div>
              <div style={{ fontSize: 39, marginTop: 10 }}>400 ₽</div>
              <div style={{ height: 5, background: COLORS.courier, borderRadius: 3, marginTop: 23 }} />
              <div style={{ fontSize: 13, marginTop: 12, whiteSpace: "nowrap" }}>НА ДОРОГУ: 3 000 ₽</div>
            </div>
          </Phone>
        </div>
        <Label>ТЕЛЕФОН</Label>
      </div>
      <div>
        <div style={{ height: 189, display: "flex", alignItems: "center", justifyContent: "center" }}><Doshirak width={230} /></div>
        <Label>ДОШИК</Label>
      </div>
      <div>
        <div style={{ height: 189, display: "flex", alignItems: "center", justifyContent: "center" }}><Scooter width={211} /></div>
        <Label>САМОКАТ</Label>
      </div>
    </div>
  </AbsoluteFill>
);
