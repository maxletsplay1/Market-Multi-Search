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
import ImportSettings from "@/components/mainPopup/settings/ImportSettings.vue";
import ExportSettings from "@/components/mainPopup/settings/ExportSettings.vue";
import MarketsDataTable from "@/components/mainPopup/settings/MarketsDataTable.vue";
</script>