import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite'
// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: "MultiSearch",
    description: 'Расширение для поиска товаров сразу на нескольких площадках',
    version: "0.0.3",
    permissions: ["tabs", "background", "storage"],
    host_permissions: ["<all_urls>"],
  },
});

