// Загрузка шрифтов из public/fonts. Импортируется один раз в Root.tsx.
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { FONTS } from "./video";

loadFont({
  family: FONTS.caption,
  url: staticFile("fonts/oswald-cyrillic-700-normal.woff2"),
  weight: "700",
  unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116",
});

loadFont({
  family: FONTS.caption,
  url: staticFile("fonts/oswald-latin-700-normal.woff2"),
  weight: "700",
  unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2212, U+2215",
});
