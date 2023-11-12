import VueApexCharts from "vue3-apexcharts";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { CopyIcon } from "~/utils/copy";

export default defineNuxtPlugin((nuxtApp) => {
  marked.use({
    async: true,
    gfm: true,
    breaks: true,
  });
  marked.use(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return CopyIcon(code, hljs.highlight(code, { language }).value);
      },
    })
  );
  nuxtApp.vueApp.use(VueApexCharts);
  return {
    provide: {
      marked,
    },
  };
});
