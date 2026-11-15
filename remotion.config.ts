import { Config } from "@remotion/cli/config";

// Настройки рендера по умолчанию. Размер и FPS задаются в src/config/video.ts.
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setCodec("h264");
