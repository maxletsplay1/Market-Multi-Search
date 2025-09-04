import { storage } from '#imports';

export function useMarketsStorage() {
    const STORAGE_KEY = "markets"

    const loadMarkets = async (withInactive: boolean = false) => {
        const markets = await storage.getItem<any[]>(`local:${STORAGE_KEY}`)
        if (!markets?.length) return []
        return withInactive ? markets : markets.filter(m => m.active)
    }

    const saveMarkets = async (markets: any[]) => {
        await storage.setItem(`local:${STORAGE_KEY}`, markets)
    }

    const addMarket = async (market: any) => {
        const markets = await loadMarkets()
        markets.push(market)
        await saveMarkets(markets)
    }

    const updateMarket = async (id: number | string, updatedData: any) => {
        const markets = await loadMarkets()
        const index = markets.findIndex((m) => m.id === id)
        if (index !== -1) {
            markets[index] = { ...markets[index], ...updatedData }
            await saveMarkets(markets)
        }
    }

    const removeMarket = async (id: number | string) => {
        let markets = await loadMarkets()
        markets = markets.filter((m) => m.id !== id)
        await saveMarkets(markets)
    }

    return {
        loadMarkets,
        saveMarkets,
        addMarket,
        updateMarket,
        removeMarket,
    }
}
