<template>
<div class="flex items-center gap-2">
  <a
      v-if="query !== ''"
      :href="url"
      target="_blank"
      class="flex items-center gap-2"
  >
    <img
        :src="market.iconUrl"
        class="w-8 h-8 aspect-square shrink-0 rounded-lg"
        :alt="market.name + ' icon'"
    >
    <p class="text-xl">Искать на {{market.name}}</p>
  </a>
  <div
      v-else
      class="flex items-center gap-2 opacity-60 cursor-not-allowed"
  >
    <img
        :src="market.iconUrl"
        class="w-8 h-8 aspect-square shrink-0 rounded-lg"
        :alt="market.name + ' icon'"
    >
    <p class="text-xl">Искать на {{market.name}}</p>
  </div>
</div>
</template>

<script setup lang="ts">
import {convertLink} from '@/composables/linkConverter'
const props = defineProps({
  market: {
    type: Object,
    required: true,
  },
  query: {
    type: String,
    required: true,
  }
})
const url = computed(() => {

  return convertLink(props.market, props.query)
})
</script>