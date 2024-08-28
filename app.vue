<script setup>
import axios from 'axios'

// 創建一個自定義的 Axios 實例
const api = axios.create({
  baseURL: 'https://two024it-test-app.onrender.com' // 設置基礎 URL
  // timeout: 5000 // 設置超時時間為 5 秒
})

const list = ref([])

// 測試取資料
async function fetchData() {
  try {
    const response = await api.get('/freshfoods/') // 獲取食物列表
    console.log(response.data) // 處理響應數據
    list.value = response.data
  } catch (error) {
    console.error('發生錯誤:', error) // 錯誤處理
  }
}

onMounted(() => {
  fetchData()
})
</script>

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
  </div>
</template>

<style scoped>
.page-wrapper {
  @apply mx-auto flex w-full max-w-[1200px] grow px-3 pb-5 pt-[52px] lg:px-5 lg:pt-[64px];
  align-items: start;
}
</style>
