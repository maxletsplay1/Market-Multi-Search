import { createApp } from 'vue';
import MainPopup from '@/pages/MainPopup.vue';
import PrimeVue from 'primevue/config';
import Tooltip from "primevue/tooltip";
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import {MyPreset} from "@/primevue/CustomTheme";

const app = createApp(MainPopup);

app.use(PrimeVue, {
    theme: {
        preset: MyPreset
    }
});

app.use(ToastService);
app.use(ConfirmationService);
app.directive('tooltip', Tooltip);
app.mount('#app');
