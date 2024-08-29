<!-- components / LoadingTool.vue -->
<script setup lang="ts">
import { isLoading } from '~/stores/eventBus'
</script>

<template>
  <div>
    <div v-if="isLoading" class="spinner-container">
      <div class="">
        <img src="~/assets/images/birdGif.gif" alt="birdGif" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinner-container {
  @apply bg-bg bg-opacity-70;
  position: fixed;
  inset: 0;
  z-index: 1300;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
