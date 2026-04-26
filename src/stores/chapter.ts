import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllChapters, type FetchAllChaptersResult } from '@/api'
import type { ChapterData } from '@/views/backstage/edit/CONSTANTS/FAKE_DATA'

export const useChapterStore = defineStore('chapter', () => {
  const chapters = ref<ChapterData[]>([])
  const isFetchingChapters = ref(false)
  const fetchChaptersError = ref<string | null>(null)

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

  return {
    chapters,
    isFetchingChapters,
    fetchChaptersError,
    fetchChapters,
  }
})
