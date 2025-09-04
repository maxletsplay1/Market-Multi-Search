<template>
<div class="grow">
  <div class="flex gap-2 justify-center">
    <ImportSettings/>
    <ExportSettings/>
  </div>
</div>
</template>

<script setup lang="ts">
import ImportSettings from "@/components/mainPopup/settings/ImportSettings.vue";
import ExportSettings from "@/components/mainPopup/settings/ExportSettings.vue";
</script>