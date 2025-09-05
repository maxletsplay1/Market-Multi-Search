<template>
    <div
        class="flex items-center gap-2"
    >
      <img
          :src="market.iconUrl"
          class="w-8 h-8 aspect-square shrink-0 rounded-lg"
          :alt="market.name + ' icon'"
      >
      <p class="text-xl">{{market.name}}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  market: {
    type: Object,
    required: true,
  },
})
</script>