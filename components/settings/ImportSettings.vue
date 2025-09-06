<template>
    <Button
        label="Импортировать настройки"
        @click="triggerFileInput"
        icon="pi pi-file-import"
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

const marketsStorage = useMarketsStorage()
const fileInput = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['reload'])

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
    emit('reload')

    alert("JSON успешно загружен и сохранён!")
  } catch (err) {
    alert(err)
  }
}
</script>
