import { createApp } from "vue";
import SelectionPopup from "@/pages/SelectionPopup.vue";
import tailwindStyles from "@/assets/tailwind.css?inline";

function mountVueApp(query: string, container: HTMLElement) {
  const app = createApp(SelectionPopup, { query });
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
      popup.style.borderRadius = "10px";
      popup.style.background = "#ffffff";
      popup.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
      popup.style.padding = "4px";
      popup.style.cursor = "pointer";

      document.body.appendChild(popup);

      const shadow = popup.attachShadow({ mode: "open" });

      const style = document.createElement("style");
      style.textContent = tailwindStyles;
      shadow.appendChild(style);

      const container = document.createElement("div");
      shadow.appendChild(container);

      mountVueApp(query, container);
    }

    function removePopup() {
      if (popup) {
        popup.remove();
        popup = null;
      }
    }
  },
});
