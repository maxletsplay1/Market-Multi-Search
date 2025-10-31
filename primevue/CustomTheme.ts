import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

export const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                light: {
                    primary: {
                        color: '#98fb98',
                        hoverColor: '#c8ffc8',
                        activeColor: 'rgba(200,255,200,0.8)',
                        text: '#000000'
                    }
                },
            },
            dark: {
                primary: {
                    color: '#98fb98',
                    hoverColor: '#c8ffc8',
                    activeColor: 'rgba(200,255,200,0.8)',
                    text: '#000000'
                }
            }
        }
    },
})
