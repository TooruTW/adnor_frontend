import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllChapters, fetchChapterPages, type FetchAllChaptersResult, type FetchChapterPagesResult } from '@/api'
import type { ChapterData } from '@/types/ChapterDataType'

export const useChapterStore = defineStore('chapter', () => {
  const chapters = ref<ChapterData[]>([])
  const isFetchingChapters = ref(false)
  const fetchChaptersError = ref<string | null>(null)
  const isFetchingChapterPages = ref(false)
  const fetchChapterPagesError = ref<string | null>(null)

  async function fetchChapters(): Promise<FetchAllChaptersResult> {
    isFetchingChapters.value = true
    fetchChaptersError.value = null

    const result = await fetchAllChapters()

    if (result.ok) {
      chapters.value = result.data as ChapterData[]
    } else {
      fetchChaptersError.value = result.message
    }

    isFetchingChapters.value = false
    return result
  }

  async function fetchPagesByChapterId(chapterId: string): Promise<FetchChapterPagesResult> {
    isFetchingChapterPages.value = true
    fetchChapterPagesError.value = null

    const result = await fetchChapterPages(chapterId)

    if (result.ok) {
      chapters.value = chapters.value.map((chapter) =>
        chapter.chapter_id === chapterId
          ? { ...chapter, chapter_pages: result.data as ChapterData['chapter_pages'] }
          : chapter,
      )
    } else {
      fetchChapterPagesError.value = result.message
    }

    isFetchingChapterPages.value = false
    return result
  }

  return {
    chapters,
    isFetchingChapters,
    fetchChaptersError,
    isFetchingChapterPages,
    fetchChapterPagesError,
    fetchChapters,
    fetchPagesByChapterId,
  }
})
