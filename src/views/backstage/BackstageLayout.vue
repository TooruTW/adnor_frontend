<script setup lang="ts"></script>

<template>
  <div>
    <nav>
      <RouterLink :to="{ name: 'frontstage' }">回到前台</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped></style>
