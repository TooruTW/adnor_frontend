<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

function goFrontstage() {
  router.push({ name: 'frontstage' })
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-background text-foreground">
    <nav class="flex w-full items-center gap-2 border-b border-border p-3">
      <Button
        type="button"
        label="回到前台"
        icon="pi pi-angle-left"
        @click="goFrontstage"
      />
    </nav>
    <RouterView />
  </div>
</template>

<style scoped></style>
