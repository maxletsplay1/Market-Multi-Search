import { createApp } from 'vue';
import MainPopup from '@/pages/MainPopup.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Tooltip from "primevue/tooltip";
import ToastService from 'primevue/toastservice';

const app = createApp(MainPopup);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService);
app.directive('tooltip', Tooltip);
app.mount('#app');
