<template>
    <Button
        label="Экспортировать настройки"
        @click="exportMarkets"
        severity="secondary"
        size="small"
        icon="pi pi-file-export"
    />
</template>

<script setup lang="ts">
import Button from "primevue/button"
import { useMarketsStorage } from "@/composables/useMarketsStorage"
import {useToastService} from "@/composables/useToastService";

const { loadMarkets } = useMarketsStorage()
const toast = useToastService()
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
    toast.addSuccess('Настройки экспортированы')
  } catch (err) {
    toast.addError('Не удалось экспортировать JSON')
    console.error(err)
  }
}
</script>
