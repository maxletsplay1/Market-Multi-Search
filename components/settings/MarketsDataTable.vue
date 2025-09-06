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
      <Column field="active" header="Удаление">
        <template #body="slotProps">
          <Button
              label="Удалить"
              severity="danger"
              @click="deleteConfirmation(slotProps.data)"
          />
        </template>
      </Column>
      <template #empty>
        <div class="">
          <p class="text-center text-xl">Список сервисов пуст</p>
        </div>
      </template>
    </DataTable>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import {useMarketsStorage} from "@/composables/useMarketsStorage";
import CreationModal from "@/components/settings/CreationModal.vue";

import { useConfirm } from "primevue/useconfirm";
import {useToastService} from "@/composables/useToastService";

const confirm = useConfirm();
const marketsStorage = useMarketsStorage()
const toast = useToastService()
const markets = ref([])
onMounted(async () => {
  markets.value = await marketsStorage.loadMarkets(true)
})
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

defineExpose({ getServices })

const deleteService = async (service: any[]) => {
  await marketsStorage.removeMarket(service.id)
  toast.addSuccess(`${service.name} успешно удален`)
  await getServices()
}

const deleteConfirmation = async (service: any[]) => {
  confirm.require({
    message: `Вы уверены, что хотите удалить ${service.name}? Это действие необратимо.`,
    header: `Удаление ${service.name}`,
    rejectProps: {
      label: 'Отмена',
      severity: 'secondary',
    },
    acceptProps: {
      label: 'Удалить',
      severity: 'danger',
    },
    accept: () => {
      deleteService(service)
    },
    reject: () => {
    }
  });
};
</script>