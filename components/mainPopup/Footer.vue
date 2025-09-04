<template>
  <hr>
  <div class="flex items-center justify-center">
  <a
      href="https://github.com/maxletsplay1/Market-Multi-Search"
      target="_blank"
      class="flex items-center justify-center gap-1 -mt-1"
  >
    <i class="pi pi-github"/>
    <p class="text-sm">GitHub</p>
  </a>
    <p class="text-sm -mt-1 -ml-0.5">&nbsp; - v{{version}}</p>
  </div>
</template>

<script setup lang="ts">
const version = browser.runtime.getManifest().version
</script>