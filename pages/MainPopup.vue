<template>
  <div class="min-h-screen p-4 flex flex-col gap-4 min-w-64">
    <Header :page="page"/>
    <Button
        v-if="page !== 'settings'"
        :loading="!domain"
        @click="buttonAction"
        size="small"
        :label="inList ? 'Включить на сайте' : 'Отключить на сайте'"
        :severity="inList ? 'primary' : 'danger'"
    />
    <Settings v-if="page === 'settings'"/>
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
import {useDomainsStorage} from "@/composables/useDomainsStorage";
import {Button} from "primevue";
import Toast from "primevue/toast";
import Settings from "@/pages/Settings.vue";

const page = window.location.hash.substring(1);
const domains = useDomainsStorage()
const domain = ref('');
const inList = ref(false);

const loadUrl = async ()=>{
  const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
  if (tab?.url){
    const url = new URL(tab.url);
    domain.value = url.hostname;
  }
}

const addDomain = async () => {
  await domains.addDomain(domain.value);
}

const removeDomain = async () => {
  await domains.removeDomain(domain.value);
}

const buttonAction = async () => {
  inList.value ? await removeDomain() : await addDomain();
  inList.value = await domains.findDomain(domain.value);
}

onMounted(async () => {
  await loadUrl();
  inList.value = await domains.findDomain(domain.value);
});
</script>