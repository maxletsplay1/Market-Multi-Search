<template>
    <div class="flex flex-col gap-2">
      <MarketsDataTable/>
    </div>
  <ConfirmDialog/>
</template>

<script setup lang="ts">
import MarketsDataTable from "@/components/settings/MarketsDataTable.vue";
import ConfirmDialog from 'primevue/confirmdialog';
</script>