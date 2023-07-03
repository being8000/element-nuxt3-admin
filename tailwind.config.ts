import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
export default <Partial<Config>>{
  darkMode: "class",
  content: [
    "components/**/*.{vue,js,ts}",
    "layouts/**/*.vue",
    "pages/**/*.vue",
    "composables/**/*.{js,ts}",
    "plugins/**/*.{js,ts}",
    "App.{js,ts,vue}",
    "app.{js,ts,vue}",
    "Error.{js,ts,vue}",
    "error.{js,ts,vue}",
    "content/**/*.md",
  ],
  googleFonts: {
    families: {
      Roboto: true, // 配置全局google 字体，用 font-Roboto  来使用
    },
  },
  theme: {
    ...defaultTheme,
    extend: {
      colors: {},
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
