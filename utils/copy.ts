import { h, createApp } from "vue";
import Copy from "@/components/Copy.vue";

export const CopyIcon = (text: string, html: string) => {
  const app = createApp(
    h(Copy, {
      source: text,
      html: html,
    })
  );
  const div = document.createElement("div");
  app.mount(div);
  const innerHTML = div.innerHTML;
  app.unmount();
  div.remove();
  return innerHTML;
};
