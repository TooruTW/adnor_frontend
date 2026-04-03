import { supabase } from './supabaseClient'

export type TestSupabaseConnectionResult =
  | { ok: true }
  | { ok: false; error: string }

export async function testSupabaseConnection(): Promise<TestSupabaseConnectionResult> {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim()
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

  if (!url || !key) {
    return {
      ok: false,
      error:
        '缺少 VITE_SUPABASE_URL 或 VITE_SUPABASE_ANON_KEY；請複製 .env.example 為 .env 並填入 Supabase 專案設定。',
    }
  }

  // 連線測試：使用 Supabase Auth 內建 getSession()（官方 API：auth.getSession）
  const { error } = await supabase.auth.getSession()

  if (error) {
    return { ok: false, error: error.message }
  }

  return { ok: true }
}
