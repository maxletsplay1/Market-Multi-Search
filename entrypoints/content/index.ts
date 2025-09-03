import { createApp } from "vue";
import SelectionPopup from "@/pages/SelectionPopup.vue";
import "@/assets/tailwind.css";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Tooltip from 'primevue/tooltip';

function mountVueApp(query: string, container: HTMLElement) {
  const app = createApp(SelectionPopup, { query });

  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  });
  app.directive('tooltip', Tooltip);
  app.mount(container);
}

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    let popup: HTMLDivElement | null = null;

    document.addEventListener("mouseup", () => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
        showPopup(selection);
      } else {
        removePopup();
      }
    });

    function showPopup(query: string) {
      removePopup();

      const range = window.getSelection()?.getRangeAt(0);
      if (!range) return;

      const rect = range.getBoundingClientRect();

      popup = document.createElement("div");
      popup.id = "markets-popup";
      popup.style.position = "absolute";
      popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
      popup.style.left = `${rect.left + window.scrollX}px`;
      popup.style.zIndex = "999999";
      popup.style.background = "#fff";
      popup.style.borderRadius = "10px";
      popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
      popup.style.padding = "4px";
      popup.style.cursor = "pointer";

      document.body.appendChild(popup);

      mountVueApp(query, popup);
    }

    function removePopup() {
      if (popup) {
        popup.remove();
        popup = null;
      }
    }
  },
});
