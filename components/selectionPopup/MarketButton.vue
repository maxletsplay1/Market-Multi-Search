<template>
  <div class="bg-gray-300 p-[1px] rounded-[9px] !max-w-7 !max-h-7">
    <img
        @mousedown="open"
        :src="market.iconUrl"
        class=" aspect-square shrink-0 rounded-lg cursor-pointer "
        :alt="market.name + ' icon'"
    >
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
const open = () => {
  window.open(url.value, "_blank", "noopener,noreferrer")
}
</script>