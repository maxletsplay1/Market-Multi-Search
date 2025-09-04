<template>
  <div v-if="markets.length > 0" class="flex gap-2">
    <InputText
        v-model="query"
        size="small"
        fluid
        placeholder="Поиск..."
    />
    <Button
        @click="open()"
        :disabled="query === ''"
        icon="pi pi-search"
        size="small"
        v-tooltip="'Поиск везде'"
    />
  </div>
  <div v-if="markets.length > 0" class="flex flex-col gap-3">
    <MarketCard
        v-for="market in markets"
        :key="market.id"
        :market="market"
        :query="query"
    />
  </div>
  <div
      v-else
      class=""
  >
    <Message severity="warn">Отсутствуют активные сервисы. Для работы активируйте хотя бы один в настройках</Message>
  </div>
</template>

<script setup lang="ts">
import Message from "primevue/message";
import {Button, InputText} from "primevue";
import MarketCard from "@/components/mainPopup/MarketCard.vue";
import {convertLink} from "@/composables/linkConverter";
import {ref} from "vue";
import {useMarketsStorage} from "@/composables/useMarketsStorage";

const marketsStorage = useMarketsStorage()
const markets = ref([])

const query = ref('')

const open = async () => {
  for (const market of markets.value) {
    await browser.tabs.create({
      url: convertLink(market, query.value),
      active: false
    });
  }
}
onMounted(async () => {
  markets.value = await marketsStorage.loadMarkets()
})
</script>