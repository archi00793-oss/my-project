import React from "react";
import { COLORS } from "../config/video";
import { PropSvg, type PropProps } from "./PropSvg";

export type PhoneProps = PropProps & { children?: React.ReactNode };

export const Phone: React.FC<PhoneProps> = ({ children, ...props }) => (
  <PropSvg canvas={[180, 340]} label="Телефон Лёхи" {...props}>
    <rect x={11} y={4} width={158} height={332} rx={29} fill={COLORS.shoes} />
    <rect x={5} y={73} width={6} height={39} rx={3} fill={COLORS.plasticLight} />
    <rect x={169} y={90} width={6} height={50} rx={3} fill={COLORS.plasticLight} />
    <foreignObject x={20} y={14} width={140} height={312}>
      <div style={{ width: "100%", height: "100%", borderRadius: 21, overflow: "hidden",
        position: "relative", background: COLORS.glass }}>
        {children}
      </div>
    </foreignObject>
    <rect x={61} y={20} width={58} height={14} rx={7} fill={COLORS.shoes} />
    <rect x={61} y={312} width={58} height={5} rx={2.5} fill={COLORS.paper} />
  </PropSvg>
);
