<template>
<Suspense>
  <Index :query="query"/>
</Suspense>
</template>

<script setup lang="ts" >
import Index from "@/components/selectionPopup/Index.vue";
defineProps({ query: {type: String, required: true} });
</script>
