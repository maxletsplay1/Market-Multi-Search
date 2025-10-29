<template>
  <div class="multisearch-market-button-wrapper">
    <img
        @mousedown="open"
        :src="market.iconUrl"
        class="multisearch-market-button-icon"
        :alt="market.name + ' icon'"
    >
  </div>
</template>

<script setup lang="ts">
import { convertLink } from '@/composables/linkConverter'

const props = defineProps({
  market: { type: Object, required: true },
  query: { type: String, required: true },
})

const url = computed(() => convertLink(props.market, props.query))

const open = () => {
  window.open(url.value, '_blank', 'noopener,noreferrer')
}
</script>