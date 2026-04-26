<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import type { ChapterData } from '@/types/ChapterDataType'

defineProps<{
  chapter: ChapterData
}>()

const emit = defineEmits<{
  edit: []
}>()
</script>

<template>
  <Card class="h-full flex-1 flex flex-col overflow-y-auto">
    <template #title>
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div class="min-w-0 flex-1">
          <span class="mr-2 text-sm font-semibold">#{{ chapter.chapter_number }}</span>
          <span class="text-lg font-bold">{{ chapter.chapter_name }}</span>
        </div>
        <div class="flex shrink-0 flex-col items-end gap-2">
          <div class="flex flex-col items-end">
            <span class="mb-1 text-sm font-medium text-(--p-text-muted-color)">
              last updated: {{ chapter.last_update }}
            </span>
            <span class="text-sm font-medium text-(--p-text-muted-color)">
              chapter_id: {{ chapter.chapter_id }}
            </span>
          </div>
          <div class="flex flex-wrap justify-end gap-2" @click.stop>
            <Button type="button" label="編輯" size="small" @click.stop="emit('edit')" />
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <p class="max-w-150">
        <span class="font-semibold">description:</span>
        <br />
        <span>{{ chapter.chapter_description }}</span>
      </p>

      <div class="gap-4 mt-4 w-full grid grid-cols-2">
        <div
          v-for="page in chapter.chapter_pages"
          :key="page.page_id"
          class="border-(--p-border-color) h-[70vh] rounded-md border p-4 flex flex-col items-stretch"
        >
          <div class="flex-1 min-h-0 flex-center">
            <img
              src="https://picsum.photos/960/1440"
              alt="page image"
              class="h-full object-contain"
            />
          </div>
          <div class="text-(--p-text-muted-color)">#{{ page.page_number }}</div>
        </div>
      </div>
    </template>
  </Card>
</template>
