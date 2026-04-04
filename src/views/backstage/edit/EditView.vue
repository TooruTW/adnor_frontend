<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { FAKE_CHAPTER_DATA_ARRAY, type ChapterData } from './FAKE_DATA'

const route = useRoute()
const router = useRouter()

const chapters = ref<ChapterData[]>(structuredClone(FAKE_CHAPTER_DATA_ARRAY))
const activeChapterId = ref<string | null>(null)

function parseQueryChapterId(): string | null {
  const raw = route.query.chapter_id
  const v = Array.isArray(raw) ? raw[0] : raw
  if (v === undefined || v === null) return null
  const s = String(v).trim()
  return s === '' ? null : s
}

onMounted(() => {
  activeChapterId.value = parseQueryChapterId()
})

watch(
  () => route.query.chapter_id,
  () => {
    activeChapterId.value = parseQueryChapterId()
  },
)

const showDetailCard = computed(() => {
  const id = activeChapterId.value
  return id !== null && id !== undefined && String(id).trim() !== ''
})

const activeChapter = computed(() =>
  chapters.value.find((c) => c.chapter_id === activeChapterId.value),
)

function createNewChapter(list: ChapterData[]): ChapterData {
  const maxNum = list.reduce((m, c) => Math.max(m, c.chapter_number), 0)
  const chapter_number = maxNum + 1
  const chapter_updated_at = new Date().toISOString().slice(0, 10)
  const pageId = crypto.randomUUID()
  return {
    chapter_id: crypto.randomUUID(),
    chapter_number,
    chapter_name: '新章節',
    chapter_description: '',
    chapter_updated_at,
    chapter_pages: [
      {
        page_id: pageId,
        page_number: 1,
        page_updated_at: chapter_updated_at,
        page_isLast: true,
      },
    ],
  }
}

function selectChapter(chapterId: string) {
  router.push({
    name: 'backstage-edit',
    query: { ...route.query, chapter_id: chapterId },
  })
  activeChapterId.value = chapterId
}

function addChapter() {
  const row = createNewChapter(chapters.value)
  chapters.value = [row, ...chapters.value]
  selectChapter(row.chapter_id)
}

function isSelected(chapterId: string) {
  return activeChapterId.value === chapterId
}

function chapterCardPt(chapterId: string) {
  if (!isSelected(chapterId)) return {}
  return {
    root: {
      // .p-card 已有 background，單靠 class 常被 Prime 樣式蓋掉；inline style 優先級較高
      style: { backgroundColor: 'var(--p-surface-200)' },
    },
  }
}
</script>

<template>
  <div class="flex flex-1 gap-4 overflow-hidden p-4">
    <aside class="flex w-64 shrink-0 flex-col gap-2 overflow-y-auto pr-1 h-full">
      <div class="mb-2">
        <Button
          type="button"
          class="w-full justify-start"
          label="新增章節"
          icon="pi pi-plus"
          @click="addChapter"
        />
      </div>

      <Card
        v-for="ch in chapters"
        :key="ch.chapter_id"
        :pt="chapterCardPt(ch.chapter_id)"
        role="button"
        tabindex="0"
        class="cursor-pointer"
        @click="selectChapter(ch.chapter_id)"
        @keydown.enter.prevent="selectChapter(ch.chapter_id)"
        @keydown.space.prevent="selectChapter(ch.chapter_id)"
      >
        <template #title>
          <span class="text-sm font-semibold">#{{ ch.chapter_number }}</span>
        </template>
        <template #content>
          <div class="flex flex-col gap-1">
            <p class="mb-1 font-medium">{{ ch.chapter_name }}</p>
            <p class="text-xs self-end text-(--p-text-muted-color)">{{ ch.chapter_updated_at }}</p>
          </div>
        </template>
      </Card>
    </aside>

    <main v-if="showDetailCard" class="min-w-0 flex-1">
      <Card class="h-full min-h-48 overflow-y-auto">
        <template #title>
          <div class="flex-between">
            <div>
              <span class="text-sm font-semibold mr-2">#{{ activeChapter?.chapter_number }}</span>
              <span class="font-bold text-lg">{{ activeChapter?.chapter_name }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-(--p-text-muted-color) font-medium mb-1 self-end">
                last updated: {{ activeChapter?.chapter_updated_at }}
              </span>
              <span class="text-sm text-(--p-text-muted-color) font-medium">
                chapter_id: {{ activeChapter?.chapter_id }}
              </span>
            </div>
          </div>
        </template>

        <template #content>
          <template v-if="activeChapter">
            <p class="max-w-150">
              <span class="font-semibold">description:</span>
              <br />
              <span>{{ activeChapter.chapter_description }}</span>
            </p>
          </template>
          <template v-else>
            <p class="text-(--p-text-muted-color)">無效的 chapter_id：{{ activeChapterId }}</p>
          </template>
          <div class="gap-4 mt-4 w-full flex-center-column ">
            <div v-for="page in activeChapter?.chapter_pages" :key="page.page_id" class="p-4 border border-(--p-border-color) rounded-md min-w-100 ">
              <img src="https://picsum.photos/960/1440" alt="page image" class="w-full h-auto">
              <span class="text-(--p-text-muted-color)">#{{ page.page_number }}</span>
            </div>
          </div>
        </template>
      </Card>
    </main>
  </div>
</template>

<style scoped></style>
