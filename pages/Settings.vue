<template>
<div class="flex flex-col gap-4 grow">
  <div class="flex gap-2 justify-center">
    <ImportSettings/>
    <ExportSettings/>
  </div>
  <div class="flex flex-col gap-2">
    <Suspense>
      <MarketsDataTable/>
    </Suspense>
  </div>
</div>
</template>

<script setup lang="ts">
import ImportSettings from "@/components/settings/ImportSettings.vue";
import ExportSettings from "@/components/settings/ExportSettings.vue";
import MarketsDataTable from "@/components/settings/MarketsDataTable.vue";
</script>