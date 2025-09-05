<template>
    <DataTable
        :value="markets"
        tableStyle="min-width: 5rem"
        showGridlines
    >
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-xl font-bold">Сервисы</p>
          <CreationModal
              :max-id="maxId"
              @reload="getServices"
          />
        </div>
      </template>
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
import Button from 'primevue/button';
import {useMarketsStorage} from "@/composables/useMarketsStorage";
import CreationModal from "@/components/settings/CreationModal.vue";

const marketsStorage = useMarketsStorage()

const markets = ref(await marketsStorage.loadMarkets(true))

const getServices = async () => {
  const data = await marketsStorage.loadMarkets(true)
  markets.value = [...data]
}

const maxId = computed(() => {
  if (!markets.value.length) return 0
  return Math.max(...markets.value.map(m => m.id)) + 1
})

const toggleActivity = async (data: any) => {
  await marketsStorage.updateMarket(data.id, data)
}
</script>