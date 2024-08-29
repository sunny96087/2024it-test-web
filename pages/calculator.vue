<!-- pages / calculator.vue -->
<script setup>
import { useApiStore } from '~/stores/api'
import { showLoading, hideLoading } from '~/stores/eventBus'

const apiStore = useApiStore()
const foodList = ref([])

async function fetchFoods() {
  try {
    showLoading()
    const res = await apiStore.fetchFoodList()
    const result = res.data

    console.log(result)

    if (result && result.status === 'success') {
      foodList.value = result.data
      console.log(foodList.value)
    }
  } catch (e) {
    console.log(e)
  } finally {
    hideLoading()
  }
}

onMounted(() => {
  fetchFoods()
})
</script>

<template>
  <div>
    <h1>食品列表</h1>
    <pre>
      {{ foodList }}
    </pre>
  </div>
</template>
