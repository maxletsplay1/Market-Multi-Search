<template>
    <Button
        label="Экспортировать настройки"
        @click="exportMarkets"
        severity="secondary"
        icon="pi pi-file-export"
    />
</template>

<script setup lang="ts">
import Button from "primevue/button"
import { useMarketsStorage } from "@/composables/useMarketsStorage"

const { loadMarkets } = useMarketsStorage()

const exportMarkets = async () => {
  try {
    const markets = await loadMarkets(true)
    const blob = new Blob([JSON.stringify(markets, null, 2)], {
      type: "application/json",
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    const now = new Date()
    const formattedDate = now
        .toLocaleString("sv-SE")
        .replace(" ", "_")
        .replace(/:/g, "-")

    a.download = `Multi-Search-Settings-${formattedDate}.json`
    a.click()
    URL.revokeObjectURL(url)
  } catch (err) {
    alert("Не удалось экспортировать JSON")
  }
}
</script>
