<template>
  <Message
      v-if="error"
      severity="error"
      class="text-center"
  >
    <a
        href="https://github.com/maxletsplay1/Market-Multi-Search/releases/latest"
        target="_blank"
    >
      <p
          class="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-500 hover:after:w-full"
      >
        Ошибка проверки обновления
      </p>
    </a>
  </Message>
  <Message
      v-else-if="hasUpdate"
      class="text-center"
  >
    <a
        href="https://github.com/maxletsplay1/Market-Multi-Search/releases/latest"
        target="_blank"
    >
      <p
          class="relative cursor-pointer after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-500 hover:after:w-full"
      >
        Доступна новая версия!
      </p>
    </a>
  </Message>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import Message from 'primevue/message';
import semverValid from "semver/functions/valid"
import semverCompare from "semver/functions/compare"

const localVersion = browser.runtime.getManifest().version
const remoteVersion = ref<string>("")
const hasUpdate = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const resp = await fetch(
        "https://api.github.com/repos/maxletsplay1/Market-Multi-Search/releases/latest",
        { headers: { Accept: "application/vnd.github+json" } }
    )
    if (!resp.ok) throw new Error(`GitHub API returned ${resp.status}`)

    const json = await resp.json()
    const name = json.name?.replace(/^v/, "") || ""
    remoteVersion.value = name
    if (semverValid(name) && semverValid(localVersion)) {
      hasUpdate.value = semverCompare(name, localVersion) > 0
    } else {
      hasUpdate.value = name !== localVersion
    }
  } catch (e) {
    error.value = (e as Error).message
    console.error("Version check error:", e)
  }
})
</script>