<script setup lang="ts">
import { computed, onMounted, ref, toRaw, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from 'primevue/card'
import { fetchAllChapters } from '@/api'
import AddChapterDialogTrigger from './AddChapterDialogTrigger.vue'
import ChapterDetailEditCard from './ChapterDetailEditCard.vue'
import ChapterDetailReadCard from './ChapterDetailReadCard.vue'
import type { ChapterData } from './CONSTANTS/FAKE_DATA'

const route = useRoute()
const router = useRouter()

const chapters = ref<ChapterData[]>([])
const activeChapterId = ref<string | null>(null)
const isEditingDetail = ref(false)
const draftChapter = ref<ChapterData | null>(null)

function parseQueryChapterId(): string | null {
  const raw = route.query.chapter_id
  const v = Array.isArray(raw) ? raw[0] : raw
  if (v === undefined || v === null) return null
  const s = String(v).trim()
  return s === '' ? null : s
}

function discardEdit() {
  isEditingDetail.value = false
  draftChapter.value = null
}

async function getAllChapters() {
  const result = await fetchAllChapters()
  if (result.ok) {
    chapters.value = result.data as ChapterData[]
  }
  console.log('chapters table get result:', result)
  return result
}

onMounted(async () => {
  activeChapterId.value = parseQueryChapterId()
  await getAllChapters()
})

watch(
  () => route.query.chapter_id,
  () => {
    const next = parseQueryChapterId()
    if (isEditingDetail.value && next !== activeChapterId.value) {
      discardEdit()
    }
    activeChapterId.value = next
  },
)

const showDetailCard = computed(() => {
  const id = activeChapterId.value
  return id !== null && id !== undefined && String(id).trim() !== ''
})

const activeChapter = computed(() =>
  chapters.value.find((c) => c.chapter_id === activeChapterId.value),
)

function enterEdit() {
  const ch = activeChapter.value
  if (!ch) return
  draftChapter.value = structuredClone(toRaw(ch))
  isEditingDetail.value = true
}

function saveEdit() {
  if (!draftChapter.value || !activeChapterId.value) return
  const id = activeChapterId.value
  const idx = chapters.value.findIndex((c) => c.chapter_id === id)
  if (idx === -1) return
  const at = new Date().toISOString().slice(0, 10)
  const saved = structuredClone(toRaw(draftChapter.value))
  saved.chapter_updated_at = at
  chapters.value = chapters.value.map((c, i) => (i === idx ? saved : c))
  discardEdit()
}

function confirmDeleteChapter() {
  if (!activeChapterId.value || !activeChapter.value) return
  if (!window.confirm('確定要刪除此章節？')) return
  const id = activeChapterId.value
  chapters.value = chapters.value.filter((c) => c.chapter_id !== id)
  discardEdit()
  const q = { ...route.query } as Record<string, string | string[] | undefined>
  delete q.chapter_id
  router.replace({ name: 'backstage-edit', query: q })
}

function selectChapter(chapterId: string) {
  if (isEditingDetail.value && chapterId !== activeChapterId.value) {
    discardEdit()
  }
  router.push({
    name: 'backstage-edit',
    query: { ...route.query, chapter_id: chapterId },
  })
  activeChapterId.value = chapterId
}

function isSelected(chapterId: string) {
  return activeChapterId.value === chapterId
}

function chapterCardPt(chapterId: string) {
  if (!isSelected(chapterId)) return {}
  return {
    root: {
      style: { backgroundColor: 'var(--p-surface-200)' },
    },
  }
}
</script>

<template>
  <div class="flex flex-1 gap-4 overflow-hidden p-4">
    <aside class="flex h-full w-64 shrink-0 flex-col gap-2 overflow-y-auto pr-1">
      <AddChapterDialogTrigger />
      <!-- chapter card detail and operations -->
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

    <main v-if="showDetailCard" class="min-w-0 flex-1 flex items-stretch">
      <ChapterDetailReadCard
        v-if="activeChapter && !isEditingDetail"
        :chapter="activeChapter"
        @edit="enterEdit"
      />
      <ChapterDetailEditCard
        v-else-if="activeChapter && draftChapter"
        v-model="draftChapter"
        @save="saveEdit"
        @discard="discardEdit"
        @delete="confirmDeleteChapter"
      />
      <Card v-else class="h-full min-h-48 overflow-y-auto">
        <template #content>
          <p class="text-(--p-text-muted-color)">無效的 chapter_id：{{ activeChapterId }}</p>
        </template>
      </Card>
    </main>
  </div>
</template>
