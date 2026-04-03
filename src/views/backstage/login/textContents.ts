import type { TextContent } from '@/types/TextContentType'

export type LoginTextByLocale = {
  ENGLISH: TextContent
  CHINESE: TextContent
  JAPANESE: TextContent
  PORTUGUESE: TextContent
}

/** 後台登入頁專用多語文案（僅 LoginView 使用） */
export const LOGIN_TEXT_CONTENTS: LoginTextByLocale = {
  ENGLISH: {
    TITLE: 'Backstage Login',
    EMAIL_LABEL: 'Email',
    PASSWORD_LABEL: 'Password',
    INVALID_EMAIL_MESSAGE: 'Please enter a valid email address',
    PLACEHOLDER_EMAIL: 'you@example.com',
    PLACEHOLDER_PASSWORD: 'Enter your password',
    INVALID_PASSWORD_MESSAGE: 'Password must be at least 8 characters',
    LOGIN_BUTTON: 'Login',
    LOGIN_FAILED_GENERIC: 'Sign-in failed. Please try again.',
  },
  CHINESE: {
    TITLE: '後台登入',
    EMAIL_LABEL: '電子郵件',
    PASSWORD_LABEL: '密碼',
    INVALID_EMAIL_MESSAGE: '請輸入有效的電子郵件格式',
    INVALID_PASSWORD_MESSAGE: '密碼至少需要 8 個字元',
    PLACEHOLDER_EMAIL: 'you@example.com',
    PLACEHOLDER_PASSWORD: '請輸入密碼',
    LOGIN_BUTTON: '登入',
    LOGIN_FAILED_GENERIC: '登入失敗，請稍後再試。',
  },
  JAPANESE: {
    TITLE: 'バックステージログイン',
    EMAIL_LABEL: 'メールアドレス',
    PASSWORD_LABEL: 'パスワード',
    INVALID_EMAIL_MESSAGE: '有効なメールアドレスを入力してください',
    INVALID_PASSWORD_MESSAGE: 'パスワードは最低8文字です',
    PLACEHOLDER_EMAIL: 'you@example.com',
    PLACEHOLDER_PASSWORD: 'パスワードを入力してください',
    LOGIN_BUTTON: 'ログイン',
    LOGIN_FAILED_GENERIC: 'ログインに失敗しました。もう一度お試しください。',
  },
  PORTUGUESE: {
    TITLE: 'Login de Backstage',
    EMAIL_LABEL: 'Email',
    PASSWORD_LABEL: 'Senha',
    INVALID_EMAIL_MESSAGE: 'Por favor, insira um endereço de email válido',
    INVALID_PASSWORD_MESSAGE: 'A senha deve ter pelo menos 8 caracteres',
    PLACEHOLDER_EMAIL: 'you@example.com',
    PLACEHOLDER_PASSWORD: 'Insira sua senha',
    LOGIN_BUTTON: 'Login',
    LOGIN_FAILED_GENERIC: 'Falha no login. Tente novamente.',
  },
}
