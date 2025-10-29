<template>
    <Button
        label="Импортировать настройки"
        @click="triggerFileInput"
        icon="pi pi-download"
        size="small"
    />
    <input
        ref="fileInput"
        type="file"
        accept="application/json"
        class="hidden"
        @change="handleFileChange"
    />
</template>

<script setup lang="ts">
import { ref } from "vue"
import Button from "primevue/button"
import {useMarketsStorage} from "@/composables/useMarketsStorage";
import {useToastService} from "@/composables/useToastService";
import {eventBus} from "@/composables/eventBus";
const toast = useToastService();
const marketsStorage = useMarketsStorage()
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  try {
    const text = await file.text()
    const json = JSON.parse(text)
    await marketsStorage.saveMarkets(json)
    eventBus.emit('refresh-services');

    toast.addSuccess('Настройки импортированы')
  } catch (err) {
    toast.addError(err.message)
  }
}
</script>
