import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''

export const supabase = createClient(url, anonKey)

function logSupabaseConnectivity(): void {
  if (!url || !anonKey) {
    console.warn('[Supabase] 未設定 VITE_SUPABASE_URL 或 VITE_SUPABASE_ANON_KEY，略過連線檢查')
    return
  }

  const baseUrl = url.replace(/\/+$/, '')

  void supabase.auth
    .getSession()
    .then((result) => {
      console.log('[Supabase] getSession（多半只讀本機 session，不代表已打遠端）', result)
    })
    .catch((err: unknown) => {
      console.error('[Supabase] getSession 失敗', err)
    })

  void fetch(`${baseUrl}/auth/v1/health`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
  })
    .then(async (res) => {
      const text = await res.text()
      console.log('[Supabase] 遠端 Auth /auth/v1/health', {
        ok: res.ok,
        status: res.status,
        bodyPreview: text.slice(0, 200),
      })
    })
    .catch((err: unknown) => {
      console.error('[Supabase] 遠端連線失敗（網路、網址或 CORS）', err)
    })
}

logSupabaseConnectivity()
