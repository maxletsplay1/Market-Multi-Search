import type { OldSettings, NewSettings } from '@/types/Settings';

export const useSettingsValidation = () => {
    const isOldSettings = (data: any): data is OldSettings => {
        return Array.isArray(data) && data.every(item =>
            typeof item.active === 'boolean' &&
            typeof item.iconUrl === 'string' &&
            typeof item.id === 'number' &&
            typeof item.name === 'string' &&
            typeof item.searchUrl === 'string' &&
            typeof item.separator === 'string'
        );
    };

    const isNewSettings = (data: any): data is NewSettings => {
        return data &&
            Array.isArray(data.markets) &&
            Array.isArray(data.domains) &&
            data.markets.every(item =>
                typeof item.active === 'boolean' &&
                typeof item.iconUrl === 'string' &&
                typeof item.id === 'number' &&
                typeof item.name === 'string' &&
                typeof item.searchUrl === 'string' &&
                typeof item.separator === 'string'
            ) &&
            data.domains.every(d => typeof d === 'string');
    };

    return { isOldSettings, isNewSettings };
};
