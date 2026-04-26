<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { supabase } from '@/api'

const router = useRouter()
const isUploadDialogVisible = ref(false)
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')
const isUploading = ref(false)
const uploadMessage = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

function goToEdit() {
  router.push({ name: 'backstage-edit' })
}

function openUploadDialog() {
  isUploadDialogVisible.value = true
}

function clearSelection() {
  selectedFile.value = null
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

function pickFile() {
  fileInputRef.value?.click()
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement | null
  const file = target?.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    uploadMessage.value = '請選擇圖片檔案'
    clearSelection()
    return
  }

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
  uploadMessage.value = ''
}

async function uploadToSupabase() {
  if (!selectedFile.value || isUploading.value) return
  isUploading.value = true
  uploadMessage.value = ''

  try {
    const file = selectedFile.value
    const safeName = file.name.replace(/\s+/g, '-')
    const path = `home-test/${Date.now()}-${crypto.randomUUID()}-${safeName}`
    const { error } = await supabase.storage.from('pages').upload(path, file, {
      upsert: false,
      contentType: file.type || undefined,
    })

    if (error) throw error

    const { data } = supabase.storage.from('pages').getPublicUrl(path)
    uploadMessage.value = `上傳成功：${data.publicUrl}`
  } catch (err) {
    const message = err instanceof Error ? err.message : '未知錯誤'
    uploadMessage.value = `上傳失敗：${message}`
  } finally {
    isUploading.value = false
  }
}

onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>

<template>
  <div class="flex-center min-h-screen flex flex-col items-center gap-4">
    <Button type="button" label="前往編輯頁面" icon="pi pi-plus" @click="goToEdit" />
    <Button type="button" label="測試上傳檔案" icon="pi pi-upload" @click="openUploadDialog" />
    <p>this is home view</p>
  </div>

  <Dialog v-model:visible="isUploadDialogVisible" modal header="測試上傳到 Supabase Storage" :style="{ width: '32rem' }">
    <div class="flex flex-col gap-4">
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFileChange"
      />

      <div class="flex gap-2">
        <Button type="button" label="選擇檔案" icon="pi pi-folder-open" @click="pickFile" />
        <Button
          type="button"
          label="上傳"
          icon="pi pi-cloud-upload"
          :disabled="!selectedFile || isUploading"
          :loading="isUploading"
          @click="uploadToSupabase"
        />
        <Button
          type="button"
          label="清除"
          severity="secondary"
          icon="pi pi-times"
          :disabled="isUploading"
          @click="clearSelection"
        />
      </div>

      <div v-if="selectedFile" class="text-sm text-(--p-text-muted-color)">
        已選擇：{{ selectedFile.name }}
      </div>

      <div v-if="previewUrl" class="border-(--p-border-color) rounded-md border p-2">
        <img :src="previewUrl" alt="預覽圖片" class="max-h-80 w-full object-contain" />
      </div>

      <p v-if="uploadMessage" class="break-all text-sm">{{ uploadMessage }}</p>
    </div>
  </Dialog>
</template>

<style scoped></style>
