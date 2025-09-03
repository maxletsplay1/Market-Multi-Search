import { createApp } from 'vue';
import MainPopup from '@/pages/MainPopup.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Tooltip from "primevue/tooltip";

const app = createApp(MainPopup);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.directive('tooltip', Tooltip);
app.mount('#app');
