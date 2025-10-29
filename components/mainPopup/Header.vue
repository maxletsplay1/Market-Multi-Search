<template>
  <div class="grid grid-cols-3 items-center relative">
    <div/>

    <div class="flex items-center justify-center gap-2">
      <img src="/icon/128.png" alt="" class="w-6 h-6 -mt-1">
      <h1 class="text-2xl -ml-2">ultiSearch</h1>
      <h1 v-if="page === 'settings'" class="text-2xl -ml-2">&nbsp;- Настройки</h1>
    </div>

    <div class="flex gap-2 justify-end">
      <ImportSettings v-if="page === 'settings'" @reload="emit('updateSettings')" />
      <ExportSettings v-if="page === 'settings'" />
    </div>
  </div>

  <VersionChecker/>
  <div
      v-if="page !== 'settings'"
      class="absolute top-2 right-2"
  >
    <a href="#settings" target="_blank">
      <i
          class="pi pi-cog"
          style="font-size: 1.2rem"
      />
    </a>

  </div>
</template>

<script setup lang="ts">
import VersionChecker from './VersionChecker.vue';
import ImportSettings from "@/components/settings/ImportSettings.vue";
import ExportSettings from "@/components/settings/ExportSettings.vue";
const emit = defineEmits(['updateSettings'])

defineProps({
  page: {
    type: String,
    required: false,
  }
})
</script>