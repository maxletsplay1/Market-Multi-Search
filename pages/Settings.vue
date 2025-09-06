<template>
  <div class="flex flex-col gap-4 grow">
    <div class="flex gap-2 justify-center">
      <ImportSettings @reload="updateTable"/>
      <ExportSettings/>
    </div>
    <div class="flex flex-col gap-2">
      <MarketsDataTable ref="table" />
    </div>
  </div>
  <ConfirmDialog/>
</template>

<script setup lang="ts">
import ImportSettings from "@/components/settings/ImportSettings.vue";
import ExportSettings from "@/components/settings/ExportSettings.vue";
import MarketsDataTable from "@/components/settings/MarketsDataTable.vue";
import ConfirmDialog from 'primevue/confirmdialog';

const table = ref<InstanceType<typeof MarketsDataTable> | null>(null)
const updateTable = () => {
  table.value?.getServices()
}
</script>