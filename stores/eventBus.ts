// stores / eventBus.ts

// * Loading
export const isLoading = ref(false)

export function showLoading() {
  isLoading.value = true
}

export function hideLoading() {
  isLoading.value = false
}

// * Toast
export const toastMessage = ref('')
let toastTimeoutId: string | number | NodeJS.Timeout | undefined // 用於存儲計時器的 ID

export function showToast(message: any) {
  // 清除之前的計時器
  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId)
  }

  // 立即更新彈出訊息
  toastMessage.value = message

  // 設置一個新的計時器，在三秒後清除彈出訊息
  toastTimeoutId = setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}
/** showToast('123test'); */
