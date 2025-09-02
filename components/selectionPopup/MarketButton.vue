<template>
  <img
      @mousedown="open"
      :src="market.iconUrl"
      class="!max-w-7 !max-h-7 aspect-square shrink-0 rounded-lg !border !border-gray-300 cursor-pointer"
      :alt="market.name + ' icon'"
  >
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
const open = () => {
  window.open(url.value, "_blank", "noopener,noreferrer")
}

</script>