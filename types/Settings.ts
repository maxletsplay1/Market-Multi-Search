import type { Market } from '@/types/Markets';

export type OldSettings = Market[];

export interface NewSettings {
    markets: Market[];
    domains: string[];
}
