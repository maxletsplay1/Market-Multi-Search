<template>
  <div
      v-if="markets.length"
      class="flex items-center gap-1"
  >
    <MarketButton
        v-for="market in markets"
        :query="query"
        :market="market"
    />
    <Button
        @mousedown="open"
        class="!max-h-7 !max-w-7"
        icon="pi pi-search"
        v-tooltip="'Поиск везде'"
    />
  </div>
  <div
      v-else
      class="px-2"
  >
    <p>Нет активных сервисов</p>
  </div>
</template>

<script setup lang="ts" >
import {Button} from "primevue";
import {convertLink} from '@/composables/linkConverter'
import MarketButton from  '@/components/selectionPopup/MarketButton.vue';
import {useMarketsStorage} from "@/composables/useMarketsStorage";

const marketsStorage = useMarketsStorage()
const markets = await marketsStorage.loadMarkets()

const props = defineProps({ query: {type: String, required: true} });

const open = () =>{
  markets.forEach(market => {
    window.open(convertLink(market, props.query), "_blank", "noopener,noreferrer")
  })
}
</script>
