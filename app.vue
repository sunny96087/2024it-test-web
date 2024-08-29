<script setup></script>

<template>
  <div class="relative flex min-h-screen w-full flex-col">
    <!-- * navbar -->
    <header class="z-20">
      <Header />
    </header>

    <!-- * pages -->
    <main class="page-wrapper">
      <NuxtPage />
    </main>

    <LoadingTool />
  </div>
</template>

<style scoped>
.page-wrapper {
  @apply mx-auto flex w-full max-w-[1200px] grow px-3 pb-5 pt-[52px] lg:px-5 lg:pt-[64px];
  align-items: start;
}
</style>
