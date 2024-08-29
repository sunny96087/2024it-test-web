// stores/api.ts

import { defineStore } from 'pinia'
import axios from 'axios'

const baseURL = 'https://two024it-test-app.onrender.com'

const api = axios.create({
  baseURL
})

export const useApiStore = defineStore('api-store', {
  actions: {
    // 取得食物列表
    async fetchFoodList() {
      const response = await api.get('/freshfoods/')
      return response
    },
    // 新增鮮食計算
    async calculateFood(data: any) {
      const response = await api.post('/foods/calculatefood', data)
      return response
    },
    // 新增回饋
    async createFeedback(data: any) {
      const response = await api.post('/feedbacks', data)
      return response
    }
  }
})
