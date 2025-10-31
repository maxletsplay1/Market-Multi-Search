<template>
    <Button
        label="Импорт настроек"
        @click="triggerFileInput"
        icon="pi pi-download"
        size="small"
    />
    <input
        ref="fileInput"
        type="file"
        accept="application/json"
        class="hidden"
        @change="importSettings"
    />
</template>

<script setup lang="ts">
import { ref } from "vue"
import Button from "primevue/button"
import {useToastService} from "@/composables/useToastService";
import {eventBus} from "@/composables/eventBus";
import {useSettingsValidation} from "@/composables/useSettingsValidation";
const toast = useToastService();
const marketsStorage = useMarketsStorage()
const domainStorage = useDomainsStorage()
const fileInput = ref<HTMLInputElement | null>(null)
const { isOldSettings, isNewSettings } = useSettingsValidation();

const triggerFileInput = () => {
  fileInput.value?.click()
}

const importSettings = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  try {
    const text = await file.text()
    const json = JSON.parse(text)
    if (isOldSettings(json)) {
      await marketsStorage.saveMarkets(json)
    } else if (isNewSettings(json)) {
      await marketsStorage.saveMarkets(json.markets)
      await domainStorage.saveDomains(json.domains)
    } else {
      throw new Error('Неправильный формат данных');
    }

    toast.addSuccess('Настройки импортированы')
  } catch (err:any) {
    toast.addError(err.message)
  } finally {
    eventBus.emit('refresh-services');
  }
}
</script>
