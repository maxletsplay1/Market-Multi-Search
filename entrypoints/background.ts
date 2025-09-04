import {useMarketsStorage} from "@/composables/useMarketsStorage";
import markets from "@/assets/markets.json"

export default defineBackground(async () => {
    browser.runtime.onInstalled.addListener(async (details) => {
        if (details.reason === "install") {
            const marketsStorage = useMarketsStorage()
            await marketsStorage.saveMarkets(markets)
        }
    })
});
