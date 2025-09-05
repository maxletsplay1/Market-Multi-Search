<template>
  <div class="min-h-screen p-4 flex flex-col gap-4 min-w-64">
    <Header :page="page"/>
    <Suspense v-if="page === 'settings'">
      <Settings/>
    </Suspense>
    <Suspense v-else>
      <SearchPage />
    </Suspense>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/mainPopup/Header.vue";
import Footer from "@/components/mainPopup/Footer.vue";
import SearchPage from "@/components/mainPopup/SearchPage.vue";
import Settings from "@/pages/Settings.vue";
const page = window.location.hash.substring(1);
</script>