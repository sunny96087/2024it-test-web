<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->
    <!-- <NuxtWelcome /> -->
    <div class="text-5xl text-red-500">測試文字</div>

    <div>
      <p>目前計數：{{ count }}</p>
      <button @click="increment">增加</button>
      <button @click="decrement">減少</button>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

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

const count = ref(0)
const message = ref('')

// 增加計數的函數
function increment() {
  count.value++
}

// 減少計數的函數
function decrement() {
  count.value--
}

// 使用 watch 來觀察 count 的變化
watch(count, (newValue, oldValue) => {
  message.value = `計數從 ${oldValue} 變成 ${newValue} 了！`

  if (newValue > oldValue) {
    message.value += ' 數字在增加！'
  } else {
    message.value += ' 數字在減少！'
  }

  // 如果數字變成 10 的倍數，顯示特別訊息
  if (newValue % 10 === 0 && newValue !== 0) {
    message.value += ' 哇！達到 10 的倍數了！'
  }
})
</script>
