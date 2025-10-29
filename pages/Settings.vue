<template>
    <div class="flex flex-col gap-2">
      <MarketsDataTable ref="table" />
    </div>
  <ConfirmDialog/>
</template>

<script setup lang="ts">
import MarketsDataTable from "@/components/settings/MarketsDataTable.vue";
import ConfirmDialog from 'primevue/confirmdialog';

const table = ref<InstanceType<typeof MarketsDataTable> | null>(null)
const updateTable = () => {
  table.value?.getServices()
}
defineExpose({ updateTable })
</script>