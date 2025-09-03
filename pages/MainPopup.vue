<template>
  <div class="p-4 flex flex-col gap-4 min-w-64">
    <Header/>
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
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import {InputText, Button} from "primevue";
import {ref} from "vue";
import markets from "@/assets/services.json"
import MarketCard from "../components/mainPopup/MarketCard.vue";
import Header from "../components/mainPopup/Header.vue";
import Footer from "../components/mainPopup/Footer.vue";
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