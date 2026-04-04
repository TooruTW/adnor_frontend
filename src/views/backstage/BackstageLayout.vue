<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { SYSTEM_TEXT_CONTENT } from '@/CONSTANTS/SYSTEM_TEXT_CONTENT'
import { ref, onMounted } from 'vue'
import type { SystemTextContent } from '@/CONSTANTS/SYSTEM_TEXT_CONTENT'

const router = useRouter()

// 前往前台
function goFrontstage() {
  router.push({ name: 'frontstage' })
}

// 系統文字內容
const systemTextContent = ref<SystemTextContent>(SYSTEM_TEXT_CONTENT.ENGLISH)

// 當網頁加載時，檢查本地儲存的語系，並取得對應的文字內容
onMounted(() => {
  const language = localStorage.getItem('language')
  if (language && Object.keys(SYSTEM_TEXT_CONTENT).includes(language)) {
    getSystemTextContentByLanguage(language)
  } else {
    systemTextContent.value = SYSTEM_TEXT_CONTENT.ENGLISH
  }
})

// 根據當前語系，取得文字內容
function getSystemTextContentByLanguage(selectedLanguage: string) {
  if (selectedLanguage && Object.keys(SYSTEM_TEXT_CONTENT).includes(selectedLanguage)) {
    systemTextContent.value =
      SYSTEM_TEXT_CONTENT[selectedLanguage as keyof typeof SYSTEM_TEXT_CONTENT]
  } else {
    systemTextContent.value = SYSTEM_TEXT_CONTENT.ENGLISH
  }
}

// 當語言變更時，儲存語言到本地，並重新加載網頁
function changeLanguage(language: string) {
  localStorage.setItem('language', language)
  window.location.reload()
}
</script>

<template>
  <div class="flex h-screen w-full flex-col items-stretch overflow-hidden">
    <nav
      class="flex-between w-full shrink-0 gap-2 border-b p-3 border-(--p-content-border-color)"
    >
      <Button
        type="button"
        :label="systemTextContent.TO_FRONTSTAGE"
        icon="pi pi-angle-left"
        @click="goFrontstage"
      />
      <div class="flex gap-2">
        <Button
          type="button"
          label="English"
          icon="pi pi-angle-left"
          @click="changeLanguage('ENGLISH')"
        />
        <Button
          type="button"
          label="Chinese"
          icon="pi pi-angle-left"
          @click="changeLanguage('CHINESE')"
        />
        <Button
          type="button"
          label="Japanese"
          icon="pi pi-angle-left"
          @click="changeLanguage('JAPANESE')"
        />
        <Button
          type="button"
          label="Portuguese"
          icon="pi pi-angle-left"
          @click="changeLanguage('PORTUGUESE')"
        />
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped></style>
