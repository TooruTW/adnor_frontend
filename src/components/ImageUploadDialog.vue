<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { supabase } from '@/api'

const props = withDefaults(
  defineProps<{
    visible: boolean
    bucket?: string
    header?: string
    pathPrefix?: string
  }>(),
  {
    bucket: 'pages',
    header: '上傳圖片',
    pathPrefix: 'uploads',
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  uploaded: [{ path: string; publicUrl: string }]
}>()

const selectedFile = ref<File | null>(null)
const previewUrl = ref('')
const isUploading = ref(false)
const uploadMessage = ref('')
const fileInputRef = ref<HTMLInputElement | null>(null)

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

function closeDialog() {
  emit('update:visible', false)
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

function getChapterIdFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  const chapterId = new URL(window.location.href).searchParams.get('chapter_id')
  if (!chapterId) return null
  const trimmed = chapterId.trim()
  return trimmed.length > 0 ? trimmed : null
}

async function createPageRecordFromUpload(publicUrl: string, chapterId: string) {
  const { error } = await supabase.from('pages').insert({
    chapter_id: chapterId,
    page_number: null,
    page_img_url: publicUrl,
  })

  if (error) throw error
}

async function uploadToSupaBaseStorage() {
  if (!selectedFile.value || isUploading.value) return
  isUploading.value = true
  uploadMessage.value = ''

  try {
    const file = selectedFile.value
    const safeName = file.name.replace(/\s+/g, '-')
    const path = `${props.pathPrefix}/${Date.now()}-${crypto.randomUUID()}-${safeName}`
    const { error } = await supabase.storage.from(props.bucket).upload(path, file, {
      upsert: false,
      contentType: file.type || undefined,
    })

    if (error) throw error

    const { data } = supabase.storage.from(props.bucket).getPublicUrl(path)
    const chapterId = getChapterIdFromUrl()
    if (!chapterId) {
      throw new Error('找不到 chapter_id，請確認網址 query 參數')
    }

    await createPageRecordFromUpload(data.publicUrl, chapterId)
    uploadMessage.value = `上傳成功：${data.publicUrl}`
    emit('uploaded', { path, publicUrl: data.publicUrl })
  } catch (err) {
    const message = err instanceof Error ? err.message : '未知錯誤'
    uploadMessage.value = `上傳失敗：${message}`
  } finally {
    isUploading.value = false
  }
}

watch(
  () => props.visible,
  (isVisible) => {
    if (isVisible) {
      uploadMessage.value = ''
      return
    }
    clearSelection()
    uploadMessage.value = ''
  },
)

onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    :header="header"
    :style="{ width: '32rem' }"
    @update:visible="emit('update:visible', $event)"
  >
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
          @click="uploadToSupaBaseStorage"
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

      <div class="flex justify-end">
        <Button type="button" label="關閉" severity="secondary" :disabled="isUploading" @click="closeDialog" />
      </div>
    </div>
  </Dialog>
</template>
