/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}', // 掃描所有 Vue 組件
    './layouts/**/*.vue', // 掃描所有布局文件
    './pages/**/*.vue', // 掃描所有頁面文件
    './composables/**/*.{js,ts}', // 掃描所有可組合式函數
    './plugins/**/*.{js,ts}', // 掃描所有插件
    './utils/**/*.{js,ts}', // 掃描所有工具函數
    './{App,app}.{js,ts,vue}', // 掃描主應用文件
    './{Error,error}.{js,ts,vue}', // 掃描錯誤處理文件
    './app.config.{js,ts}' // 掃描應用配置文件
  ],
  theme: {
    extend: {
      colors: {
        blue1: '#e9f1fe',
        blue2: '#c4d7ed',
        blue3: '#abc8e2',
        blue4: '#375d81',
        blue5: '#183152',
        red1: '#ffaeaa',
        red2: '#ed6f69',
        bg: '#fff6ea'
      }
    }
  },
  plugins: [] // 可以添加 Tailwind 插件
}
