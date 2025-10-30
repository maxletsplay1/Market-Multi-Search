export function useDomainsStorage() {
    const STORAGE_KEY = "MMS-domains"

    const loadDomains = async () => {
        const links = await storage.getItem<string[]>(`sync:${STORAGE_KEY}`)
        return links ?? []
    }

    const saveDomains = async (links: string[]) => {
        await storage.setItem(`sync:${STORAGE_KEY}`, links)
    }

    const removeDomain = async (link: string) => {
        const links = await loadDomains()
        const filtered = links.filter(l => l !== link)
        await saveDomains(filtered)
    }

    return {
        loadDomains,
        saveDomains,
        removeDomain,
    }
}
