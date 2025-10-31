export interface Market {
    active: boolean;
    iconUrl: string;
    id: number;
    name: string;
    searchUrl: string;
    separator: string;
}

export type Markets = Market[];
