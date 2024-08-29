// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: '鸚鸚食堂 Parrot Bistro', // 網站名稱
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }] // 網站 icon
    }
  }
})
