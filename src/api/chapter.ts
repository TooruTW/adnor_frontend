import { supabase } from './supabaseClient'

export type BookOption = {
  book_id: string
  book_name: string
}

export type ChapterCreateInput = {
  book_id: string
  chapter_name: string
  description: string
}

type OkResult<T> = { ok: true; data: T }
type FailResult = { ok: false; message: string }

export type FetchBookOptionsResult = OkResult<BookOption[]> | FailResult
export type CreateChapterResult = OkResult<{ chapter_id?: string }> | FailResult
export type FetchAllChaptersResult = OkResult<Record<string, unknown>[]> | FailResult

export async function fetchBookOptions(): Promise<FetchBookOptionsResult> {
  const { data, error } = await supabase
    .from('books')
    .select('book_id, book_name')
    .order('book_name', { ascending: true })

  if (error) {
    return { ok: false, message: error.message }
  }

  const rows = (data ?? []).filter(
    (row): row is BookOption =>
      typeof row.book_id === 'string' &&
      row.book_id.trim() !== '' &&
      typeof row.book_name === 'string' &&
      row.book_name.trim() !== '',
  )

  return { ok: true, data: rows }
}

export async function createChapter(input: ChapterCreateInput): Promise<CreateChapterResult> {
  const payload = {
    book_id: input.book_id,
    chapter_number: null,
    chapter_page_count: null,
    chapter_name: input.chapter_name,
    chapter_description: input.description,
    release_date: null,
  }

  const { data, error } = await supabase.from('chapters').insert(payload).select('chapter_id').single()

  if (error) {
    return { ok: false, message: error.message }
  }

  return {
    ok: true,
    data: { chapter_id: typeof data?.chapter_id === 'string' ? data.chapter_id : undefined },
  }
}

export async function fetchAllChapters(): Promise<FetchAllChaptersResult> {
  const { data, error } = await supabase.from('chapters').select('*')

  if (error) {
    return { ok: false, message: error.message }
  }

  return { ok: true, data: (data ?? []) as Record<string, unknown>[] }
}
