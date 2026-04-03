<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBackstage() {
  router.push({ name: 'backstage-login' })
}
</script>

<template>
  <div>
    <p>this is frontstage view</p>
    <button type="button" @click="goBackstage">前往後台</button>
  </div>
</template>

<style scoped></style>
