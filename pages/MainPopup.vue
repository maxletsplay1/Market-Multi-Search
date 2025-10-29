<template>
  <div class="min-h-screen p-4 flex flex-col gap-4 min-w-64">
    <Header
        :page="page"
        @update-settings="updateSettings"
    />
    <Settings
        v-if="page === 'settings'"
        ref="settings"
    />
    <Suspense v-else>
      <SearchPage />
    </Suspense>
    <Footer/>
  </div>
  <Toast/>
</template>

<script setup lang="ts">
import Header from "@/components/mainPopup/Header.vue";
import Footer from "@/components/mainPopup/Footer.vue";
import SearchPage from "@/components/mainPopup/SearchPage.vue";
import Toast from "primevue/toast";
import Settings from "@/pages/Settings.vue";
const page = window.location.hash.substring(1);

const settings = ref<InstanceType<typeof Settings> | null>(null)
const updateSettings = () => {
  settings.value?.updateTable()
}
</script>