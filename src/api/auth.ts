import { supabase } from './supabaseClient'

export type SignInWithPasswordResult =
  | { ok: true }
  | { ok: false; message: string }

export async function signInWithEmailPassword(
  email: string,
  password: string,
): Promise<SignInWithPasswordResult> {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return { ok: false, message: error.message }
  }
  return { ok: true }
}
