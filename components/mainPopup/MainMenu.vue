<template>
  <div class="flex flex-col gap-4 min-w-64">
    <div class="flex gap-2 items-center justify-center">
      <img src="/icon/128.png" alt="" class="shrink-0 w-6 h-6 -mt-1">
      <h1 class="text-2xl -ml-2">ultiSearch</h1>
    </div>
    <div class="flex gap-2">
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
    <div class="flex flex-col gap-3">
      <MarketCard
          v-for="market in markets"
          :key="market.id"
          :market="market"
          :query="query"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {InputText, Button} from "primevue";
import {ref} from "vue";
import markets from "@/assets/services.json"
import MarketCard from "./MarketCard.vue";
import {convertLink} from "@/composables/linkConverter";

const query = ref('')

const open = async () => {
  for (const market of markets) {
    await browser.tabs.create({
      url: convertLink(market, query.value),
      active: false
    });
  }
}
</script>