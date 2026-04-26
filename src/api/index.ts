export { supabase } from './supabaseClient'
export { testSupabaseConnection } from './testSupabaseConnection'
export type { TestSupabaseConnectionResult } from './testSupabaseConnection'
export { signInWithEmailPassword } from './auth'
export type { SignInWithPasswordResult } from './auth'
export { createChapter, fetchAllChapters, fetchBookOptions, fetchChapterPages } from './chapter'
export type {
  BookOption,
  ChapterCreateInput,
  CreateChapterResult,
  FetchAllChaptersResult,
  FetchBookOptionsResult,
  FetchChapterPagesResult,
} from './chapter'
