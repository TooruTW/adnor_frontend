<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { createChapter, fetchBookOptions, type ChapterCreateInput } from '@/api/chapter'

const showAddChapterDialog = ref(false)
const isLoadingBooks = ref(false)
const isSavingChapter = ref(false)
const addChapterMessage = ref('')
const hasFetchedBooks = ref(false)
const bookOptions = ref<Array<{ book_id: string; book_name: string }>>([])
const addChapterForm = ref<ChapterCreateInput>({
  book_id: '',
  chapter_name: '',
  description: '',
})

function resetAddChapterForm() {
  addChapterForm.value = {
    book_id: '',
    chapter_name: '',
    description: '',
  }
}

function closeAddChapterDialog() {
  if (isSavingChapter.value) return
  showAddChapterDialog.value = false
  addChapterMessage.value = ''
  resetAddChapterForm()
}

async function openAddChapterDialog() {
  showAddChapterDialog.value = true
  addChapterMessage.value = ''
  if (hasFetchedBooks.value || isLoadingBooks.value) return

  isLoadingBooks.value = true
  const result = await fetchBookOptions()
  isLoadingBooks.value = false

  if (!result.ok) {
    addChapterMessage.value = `載入書本失敗：${result.message}`
    return
  }

  bookOptions.value = result.data
  hasFetchedBooks.value = true
}

async function saveAddChapter() {
  if (isSavingChapter.value || isLoadingBooks.value) return
  const chapterName = addChapterForm.value.chapter_name.trim()
  if (!addChapterForm.value.book_id || !chapterName) {
    addChapterMessage.value = '請先選擇書本並輸入章節名稱'
    return
  }

  isSavingChapter.value = true
  addChapterMessage.value = ''
  const result = await createChapter({
    book_id: addChapterForm.value.book_id,
    chapter_name: chapterName,
    description: addChapterForm.value.description.trim(),
  })
  isSavingChapter.value = false

  if (!result.ok) {
    addChapterMessage.value = `儲存失敗：${result.message}`
    return
  }

  closeAddChapterDialog()
}
</script>

<template>
  <div class="mb-2">
    <Button
      type="button"
      class="w-full justify-start"
      label="新增章節"
      icon="pi pi-plus"
      @click="openAddChapterDialog"
    />
  </div>

  <Dialog
    :visible="showAddChapterDialog"
    modal
    header="新增章節"
    :style="{ width: '36rem' }"
    @update:visible="(visible) => (visible ? openAddChapterDialog() : closeAddChapterDialog())"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label class="font-medium">選擇書本</label>
        <Select
          v-model="addChapterForm.book_id"
          :options="bookOptions"
          option-label="book_name"
          option-value="book_id"
          placeholder="請選擇書本"
          :loading="isLoadingBooks"
          :disabled="isLoadingBooks || isSavingChapter"
          fluid
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-medium">章節名稱</label>
        <InputText
          v-model="addChapterForm.chapter_name"
          type="text"
          placeholder="輸入章節名稱"
          :disabled="isSavingChapter"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-medium">敘述</label>
        <Textarea
          v-model="addChapterForm.description"
          placeholder="輸入章節敘述"
          :rows="4"
          :disabled="isSavingChapter"
        />
      </div>

      <p v-if="addChapterMessage" class="text-sm text-red-500">{{ addChapterMessage }}</p>

      <hr class="border-(--p-border-color)" />

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="儲存"
          :loading="isSavingChapter"
          :disabled="isSavingChapter || isLoadingBooks"
          @click="saveAddChapter"
        />
        <Button
          type="button"
          label="取消"
          severity="secondary"
          :disabled="isSavingChapter"
          @click="closeAddChapterDialog"
        />
      </div>
    </div>
  </Dialog>
</template>
