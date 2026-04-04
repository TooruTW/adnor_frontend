<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import { signInWithEmailPassword } from '@/api/auth'
import { LOGIN_TEXT_CONTENTS } from './login/textContents'
import type { TextContent } from '@/types/TextContentType'

const router = useRouter()
const submitting = ref(false)
const authError = ref<string | null>(null)

/** 常見電子郵件格式（regex） */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** 密碼至少 8 字元（regex） */
const PASSWORD_MIN_REGEX = /^.{8,}$/

const initialValues = {
  email: '',
  password: '',
}

// 網頁中使用到的文字內容
const textContent = ref<TextContent>(LOGIN_TEXT_CONTENTS.ENGLISH)

// 當網頁加載時，檢查本地儲存的語系，並取得對應的文字內容
onMounted(() => {
  const language = localStorage.getItem('language')
  // 當語言不存在時，使用預設語言
  if (language && Object.keys(LOGIN_TEXT_CONTENTS).includes(language)) {
    getTextContentByLanguage(language)
  } else {
    textContent.value = LOGIN_TEXT_CONTENTS.ENGLISH
  }
})
// 根據當前語系，取得文字內容
function getTextContentByLanguage(language: string) {
  textContent.value = LOGIN_TEXT_CONTENTS[
    language as keyof typeof LOGIN_TEXT_CONTENTS
  ] as TextContent
}

// 登入表單的驗證規則
function loginResolver({ values }: { values: Record<string, unknown> }) {
  const errors: Record<string, { message: string }[]> = {}

  const email = String(values.email ?? '')
  if (!EMAIL_REGEX.test(email)) {
    errors.email = [{ message: textContent.value.INVALID_EMAIL_MESSAGE }]
  }

  const password = String(values.password ?? '')
  if (!PASSWORD_MIN_REGEX.test(password)) {
    errors.password = [{ message: textContent.value.INVALID_PASSWORD_MESSAGE }]
  }

  return { errors }
}

// 登入表單的提交事件（Supabase Email + 密碼）
async function onLoginSubmit(event: FormSubmitEvent) {
  if (!event.valid) return
  authError.value = null
  submitting.value = true
  try {
    const email = String(event.states.email?.value ?? '')
    const password = String(event.states.password?.value ?? '')
    const result = await signInWithEmailPassword(email, password)
    if (!result.ok) {
      authError.value = result.message.trim() || textContent.value.LOGIN_FAILED_GENERIC
      console.log('[backstage-login] 登入失敗', result.message)

      return
    }
    await router.push({ name: 'backstage-home' })
    console.log('[backstage-login] 登入成功')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="flex-center min-h-screen p-4">
    <Card class="w-full max-w-md">
      <template #title>{{ textContent.TITLE }}</template>
      <template #content>
        <Form
          v-slot="$form"
          :initial-values="initialValues"
          :resolver="loginResolver"
          class="flex flex-col gap-4"
          @submit="onLoginSubmit"
        >
          <Message v-if="authError" severity="error" :closable="false">
            {{ authError }}
          </Message>
          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium" for="backstage-email">{{
              textContent.EMAIL_LABEL
            }}</label>
            <InputText
              id="backstage-email"
              name="email"
              type="email"
              autocomplete="email"
              :placeholder="textContent.PLACEHOLDER_EMAIL"
              fluid
            />
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
              {{ $form.email.error?.message }}
            </Message>
          </div>

          <div class="flex flex-col gap-1">
            <label class="text-sm font-medium" for="backstage-password">{{
              textContent.PASSWORD_LABEL
            }}</label>
            <Password
              id="backstage-password"
              name="password"
              autocomplete="current-password"
              :placeholder="textContent.PLACEHOLDER_PASSWORD"
              :feedback="false"
              toggle-mask
              fluid
            />
            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
              {{ $form.password.error?.message }}
            </Message>
          </div>

          <Button
            type="submit"
            :label="textContent.LOGIN_BUTTON"
            class="w-full"
            :loading="submitting"
          />
        </Form>
      </template>
    </Card>
  </div>
</template>

<style scoped></style>
