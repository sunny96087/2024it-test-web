<script setup lang="ts">
const route = useRoute()

// 選單變數
const menuOpen = ref(false)

// 選單開關
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// 監聽路由的 path 變化, 換頁時自動關閉選單
watch(
  () => route.path,
  (currentPath, previousPath) => {
    if (menuOpen.value) {
      toggleMenu()
    }
  }
)
</script>

<template>
  <nuxt-link to="/" class="logo fixed left-5 top-2 w-[32px] lg:w-[40px]">
    <img src="~/assets/images/logo.svg" alt="logo" class="pic-auto" />
  </nuxt-link>
  <div class="relative">
    <!-- * 選單按鈕 -->
    <Transition name="fade">
      <button v-show="!menuOpen" @click="toggleMenu" class="nav-btn">
        <Icon name="ph:hand-tap" size="20"></Icon>

        <div v-if="route.path === '/'">首頁</div>
        <div v-else-if="route.path === '/calculator'">食物計算機</div>
        <div v-else-if="route.path === '/food'">營養指南</div>
        <div v-else-if="route.path === '/bird'">百科全書</div>
        <div v-else-if="route.path === '/hospital'">醫護站</div>
        <div v-else="route.path === '/connect'">聯繫我們</div>
      </button>
    </Transition>

    <!-- * 選單 -->
    <Transition name="fade">
      <div v-show="menuOpen" class="nav-menu">
        <button class="nav-menu-item" @click="toggleMenu">CLOSE</button>
        <nuxt-link class="nav-menu-item" exact-active-class="bg-blue4 bg-opacity-15" to="/"
          >首頁</nuxt-link
        >
        <nuxt-link
          class="nav-menu-item"
          exact-active-class="bg-blue4 bg-opacity-15"
          to="/calculator"
          >食物計算機</nuxt-link
        >
        <nuxt-link class="nav-menu-item" exact-active-class="bg-blue4 bg-opacity-15" to="/food"
          >營養指南</nuxt-link
        >
        <nuxt-link class="nav-menu-item" exact-active-class="bg-blue4 bg-opacity-15" to="/bird"
          >百科全書</nuxt-link
        >
        <nuxt-link class="nav-menu-item" exact-active-class="bg-blue4 bg-opacity-15" to="/hospital"
          >醫護站</nuxt-link
        >
        <nuxt-link class="nav-menu-item" exact-active-class="bg-blue4 bg-opacity-15" to="/connect"
          >聯繫我們</nuxt-link
        >
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.nav-btn {
  @apply bg-bg text-blue4 border-blue4 fixed right-0 top-0 z-20 flex w-[140px] items-center justify-center gap-[6px] rounded-bl-[6px] border-b border-l bg-opacity-20 p-[10px] font-bold backdrop-blur-sm;
}

.nav-menu {
  @apply text-blue4 border-blue4 fixed right-0 top-0 z-20 flex w-[140px] flex-col items-center justify-center rounded-bl-[6px] border-b border-l bg-opacity-20 font-bold backdrop-blur-sm;
}

.nav-menu-item {
  @apply flex w-full items-center justify-center p-[10px];
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translatey(-264px);
  opacity: 0;
}
</style>
