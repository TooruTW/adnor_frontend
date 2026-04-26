<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

function goToEdit() {
  router.push({ name: 'backstage-edit' })
}
</script>

<template>
  <div class="flex-center min-h-screen flex flex-col items-center gap-4">
    <Button type="button" label="前往編輯頁面" icon="pi pi-plus" @click="goToEdit" />
    <p>this is home view</p>
  </div>
</template>

<style scoped></style>
