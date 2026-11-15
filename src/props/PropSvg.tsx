import React from "react";

export type PropProps = Omit<React.SVGProps<SVGSVGElement>, "width" | "height"> & {
  width?: number;
};

/** Все предметы масштабируются по ширине, сохраняя исходное соотношение сторон. */
export const PropSvg: React.FC<PropProps & {
  canvas: readonly [number, number]; label: string;
}> = ({ canvas: [w, h], label, width = w, children, style, ...props }) => (
  <svg {...props} viewBox={`0 0 ${w} ${h}`} width={width} height={width * h / w}
    style={{ overflow: "visible", ...style }} role="img" aria-label={label}>
    {children}
  </svg>
);
