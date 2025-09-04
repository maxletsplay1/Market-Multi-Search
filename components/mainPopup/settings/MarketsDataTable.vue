<template>
<DataTable :value="markets" tableStyle="min-width: 5rem">
  <Column field="id" header="ID"/>
  <Column field="name" header="Название"/>
  <Column field="iconUrl" header="Изображение">
    <template #body="slotProps">
      <img
          :src="slotProps.data.iconUrl"
          class="w-8 h-8 aspect-square shrink-0 rounded-lg"
          :alt="slotProps.data.name + ' icon'"
      >
    </template>
  </Column>
  <Column field="active" header="Активность">
    <template #body="slotProps">
      <Checkbox
          v-model="slotProps.data.active"
          binary
          @update:model-value="toggleActivity(slotProps.data)"
      />
    </template>
  </Column>
</DataTable>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import {useMarketsStorage} from "@/composables/useMarketsStorage";
const marketsStorage = useMarketsStorage()

let markets = await marketsStorage.loadMarkets(true)

const toggleActivity = async (data: any) => {
  await marketsStorage.updateMarket(data.id, data)
}
</script>