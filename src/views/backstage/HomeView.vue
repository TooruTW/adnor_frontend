<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import ImageUploadDialog from '@/components/ImageUploadDialog.vue'

const router = useRouter()
const isUploadDialogVisible = ref(false)
const latestUploadedUrl = ref('')

function goToEdit() {
  router.push({ name: 'backstage-edit' })
}

function openUploadDialog() {
  isUploadDialogVisible.value = true
}

function handleUploaded(payload: { path: string; publicUrl: string }) {
  latestUploadedUrl.value = payload.publicUrl
}
</script>

<template>
  <div class="flex-center min-h-screen flex flex-col items-center gap-4">
    <Button type="button" label="前往編輯頁面" icon="pi pi-plus" @click="goToEdit" />
    <Button type="button" label="測試上傳檔案" icon="pi pi-upload" @click="openUploadDialog" />
    <p>this is home view</p>
    <p v-if="latestUploadedUrl" class="max-w-140 break-all text-sm text-(--p-text-muted-color)">
      最近上傳：{{ latestUploadedUrl }}
    </p>
  </div>

  <ImageUploadDialog
    v-model:visible="isUploadDialogVisible"
    bucket="pages"
    path-prefix="home-test"
    header="測試上傳到 Supabase Storage"
    @uploaded="handleUploaded"
  />
</template>

<style scoped></style>
