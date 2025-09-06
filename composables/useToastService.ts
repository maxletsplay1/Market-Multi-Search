import { useToast } from 'primevue/usetoast';
import errorAudio from "@/assets/error.mp3";
import successAudio from "@/assets/success.mp3";
const errorSound = new Audio(errorAudio);
const successSound = new Audio(successAudio);

export const  useToastService = () => {
    const toast = useToast();

    const addSuccess = (message: string) => {
        successSound.volume = 0.1;
        toast.add({
            severity: "success",
            summary: "Успех",
            detail: message,
            life: 4000,
        });
        successSound.play();
    }

    const addError = (message: string) => {
        errorSound.volume = 0.1;
        toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: message,
            life: 4000,
        });
        errorSound.play();
    }
    return {
        addSuccess,
        addError,
    }
}