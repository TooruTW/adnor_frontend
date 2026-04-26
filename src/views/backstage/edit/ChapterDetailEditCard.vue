<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import type { ChapterData } from '@/types/ChapterDataType'

const draft = defineModel<ChapterData>({ required: true })

const emit = defineEmits<{
  save: []
  discard: []
  delete: []
}>()

function normalizeChapterPages(pages: ChapterData['chapter_pages']) {
  pages.forEach((p, i) => {
    p.page_number = i + 1
    p.is_last_of_this_chapter = i === pages.length - 1
  })
}

function addPage() {
  draft.value.chapter_pages.push({
    page_id: crypto.randomUUID(),
    page_number: 0,
    is_last_of_this_chapter: true,
    page_img_url: '',
  })
  normalizeChapterPages(draft.value.chapter_pages)
}

function removePage(pageId: string) {
  const pages = draft.value.chapter_pages
  if (pages.length <= 1) return
  const idx = pages.findIndex((p) => p.page_id === pageId)
  if (idx === -1) return
  pages.splice(idx, 1)
  normalizeChapterPages(pages)
}
</script>

<template>
  <Card class="h-full flex-1 flex flex-col overflow-y-auto">
    <template #title>
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-sm font-semibold">#</span>
            <InputNumber
              v-model="draft.chapter_number"
              :min="1"
              :use-grouping="false"
              :allow-empty="false"
              input-class="w-20"
              class="w-20 shrink-0"
              @click.stop
            />
            <InputText
              v-model="draft.chapter_name"
              type="text"
              class="min-w-48 max-w-full flex-1"
              @click.stop
            />
          </div>
        </div>
        <div class="flex shrink-0 flex-col items-end gap-2">
          <div class="flex flex-col items-end">
            <span class="mb-1 text-sm font-medium text-(--p-text-muted-color)">
              last updated: {{ draft.last_update }}
            </span>
            <span class="text-sm font-medium text-(--p-text-muted-color)">
              chapter_id: {{ draft.chapter_id }}
            </span>
          </div>
          <div class="flex flex-wrap justify-end gap-2" @click.stop>
            <Button type="button" label="儲存" size="small" @click.stop="emit('save')" />
            <Button
              type="button"
              label="放棄"
              size="small"
              severity="secondary"
              @click.stop="emit('discard')"
            />
            <Button
              type="button"
              label="刪除"
              size="small"
              severity="danger"
              @click.stop="emit('delete')"
            />
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="flex flex-col gap-4">
        <div class="w-full max-w-150">
          <p class="mb-1 font-semibold">description:</p>
          <Textarea
            v-model="draft.chapter_description"
            :rows="4"
            class="w-full resize-y"
            @click.stop
          />
        </div>

        <div class="flex items-center justify-between gap-3" @click.stop>
          <p class="text-sm font-semibold text-(--p-text-muted-color)">pages</p>
          <Button type="button" label="新增" icon="pi pi-plus" size="small" @click="addPage" />
        </div>

        <div class="grid w-full gap-4 grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]">
          <div
            v-for="page in draft.chapter_pages"
            :key="page.page_id"
            class="border-(--p-border-color) relative isolate rounded-md border p-4 flex flex-col gap-2"
          >
            <div class="min-h-0 flex-1 flex-center">
              <img
                src="https://picsum.photos/960/1440"
                alt="page image"
                class="relative z-0 h-auto max-h-[60vh] w-full object-contain"
              />
            </div>
            <div class="absolute inset-e-3 top-3 z-20">
              <Button
                type="button"
                icon="pi pi-times"
                rounded
                aria-label="移除此頁"
                :disabled="draft.chapter_pages.length <= 1"
                @click.stop="removePage(page.page_id)"
              />
            </div>
            <span class="relative z-0 text-(--p-text-muted-color)">#{{ page.page_number }}</span>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
