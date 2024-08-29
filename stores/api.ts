// stores/api.ts

import { defineStore } from 'pinia'
import axios from 'axios'

const baseURL = 'https://two024it-test-app.onrender.com'

const api = axios.create({
  baseURL
})

export const useApiStore = defineStore('api-store', {
  actions: {
    async fetchFoodList() {
      const response = await api.get('/freshfoods/')
      return response
    }
    // 你可以在這裡添加更多的 API 操作
  }
})
