<template>
  <div class="flex items-center gap-1">
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
</template>

<script setup lang="ts" >
import {Button} from "primevue";
import {convertLink} from '@/composables/linkConverter'
import MarketButton from '../components/selectionPopup/MarketButton.vue';
import markets from "@/assets/services.json"

const props = defineProps({ query: {type: String, required: true} });

const open = () =>{
  markets.forEach(market => {
    window.open(convertLink(market, props.query), "_blank", "noopener,noreferrer")
  })
}
</script>
