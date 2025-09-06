<template>
  <Button
      label="Создать"
      size="small"
      @click="visible = true"
  />
  <Dialog
      v-model:visible="visible"
      modal
      :draggable="false"
      id="creationModal"
      header="Добавление сервиса"
      :style="{ width: '35rem' }"
  >
    <p class="text-lg -mt-1">Общие данные</p>
    <div class="flex gap-2 mt-1">
      <div class="flex grow flex-col gap-3">
        <FloatLabel
            variant="on"
        >
          <InputNumber
              id="id"
              size="small"
              disabled
              :modelValue="maxId"
              fluid
          />
          <label
              for="id"
          >
            ID
          </label>
        </FloatLabel>
        <FloatLabel
            variant="on"
        >
          <InputText
              id="name"
              size="small"
              v-model="name"
              fluid
          />
          <label
              for="name"
          >
            Название
          </label>
        </FloatLabel>
        <FloatLabel
            variant="on"
        >
          <InputText
              id="logo"
              size="small"
              v-model="logo"
              fluid
          />
          <label
              for="logo"
          >
            Ссылка на логотип
          </label>
        </FloatLabel>
      </div>
      <div class="h-32 w-32 bg-[var(--p-dialog-border-color)] rounded-xl">
        <img
            :src="logo"
            :alt="name + ' icon'"
            class="h-32 w-32 rounded-xl"
        >
      </div>
    </div>
    <span class="text-lg mt-4">
      Ссылка (<a href="https://github.com/maxletsplay1/Market-Multi-Search?tab=readme-ov-file#-%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-json%D0%B0" target="_blank" class="text-blue-600 underline cursor-pointer">инструкция</a>)
    </span>
    <div class="flex grow flex-col gap-3 mt-1">
      <FloatLabel
          variant="on"
      >
        <Textarea
            id="searchUrl"
            v-model="searchUrl"
            rows="5"
            fluid
        />
        <label
            for="searchUrl"
        >
          Ссылка для поиска
        </label>
      </FloatLabel>
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <Button
          size="small"
          type="button"
          label="Отмена"
          severity="secondary"
          @click="visible = false"
      />
      <Button
          size="small"
          :disabled="!isValid"
          type="button"
          v-tooltip.top="isValid ? '' : 'Заполните все поля'"
          label="Сохранить"
          @click="addMarket"
      />
    </div>
  </Dialog>
  <Dialog
      v-model:visible="visible"
      :show-header="false"
      :draggable="false"
      :closable="false"
      class="-mr-[940px] -mt-[367px]"
  >
    <div class="mt-5 flex flex-col gap-2 w-80">
      <FloatLabel
          variant="on"
      >
        <InputText
            id="query"
            size="small"
            v-model="query"
            fluid
        />
        <label
            for="query"
        >
          Тестовый запрос
        </label>
      </FloatLabel>
      <MarketCard
          :query="query"
          :market="marketResult"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea';
import MarketCard from "@/components/mainPopup/MarketCard.vue";
import {ref} from "vue";
import {useMarketsStorage} from "@/composables/useMarketsStorage";
import {parseLink} from "@/composables/linkConverter";
import {useToastService} from "@/composables/useToastService";

const emit = defineEmits(['reload'])
const marketsStorage = useMarketsStorage()
const toast = useToastService()

const props = defineProps({
  maxId:{
    type: Number,
    required: true
  }
})

const visible = ref(false);
const name = ref('');
const logo = ref('');
const searchUrl = ref('');
const query = ref('');
const marketResult = computed(() => {
  return {
    id: props.maxId,
    name: name.value,
    iconUrl: logo.value,
    searchUrl: parseLink(searchUrl.value)[0],
    separator: parseLink(searchUrl.value)[1],
    active: true,
  };
});

const isValid = computed(() => {
  return [marketResult.value.name, marketResult.value.iconUrl, marketResult?.value.separator, marketResult?.value.searchUrl]
      .every(val => val.trim() !== '')
})

const addMarket = async () => {
  const newMarket = marketResult.value
  await marketsStorage.addMarket(newMarket)
  visible.value = false
  emit('reload')
  toast.addSuccess('Сервис добавлен')
}
</script>