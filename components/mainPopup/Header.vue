<template>
  <div class="flex gap-2 items-center justify-center">
    <img src="/icon/128.png" alt="" class="shrink-0 w-6 h-6 -mt-1">
    <h1 class="text-2xl -ml-2">ultiSearch </h1>
    <h1
        v-if="page === 'settings'"
        class="text-2xl -ml-2"
    >
      &nbsp;- Настройки
    </h1>

  </div>
  <div
      v-if="page !== 'settings'"
      class="absolute top-2 right-2"
  >
    <a href="#settings" target="_blank">
      <i class="pi pi-cog"/>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps({
  page: {
    type: String,
    required: false,
  }
})
</script>