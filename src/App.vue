<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const links = ref([
  {
    icon: 'weishang-icon-01.svg',
    url: '/home',
    title: '控制台'
  },
  {
    icon: 'weishang-icon-02.svg',
    url: '/netflow-total',
    title: '傳輸 Total'
  },
  {
    icon: 'weishang-icon-03.svg',
    url: '/netflow-rate',
    title: '傳輸 Rate'
  },
  {
    icon: 'weishang-icon-04.svg',
    url: '/netflow-graph',
    title: '監控 Graph'
  },
  {
    icon: 'weishang-icon-05.svg',
    url: '/reports',
    title: '報表'
  }
])
</script>

<template>
  <div class="main-flex d-flex flex-column justify-content-center align-items-center vh-100">
    <div class="main-box position-relative bg-dark-850">
      <RouterView />
      <ul
        class="menu-nav nav text-center bg-dark-800 position-absolute bottom-0 w-100"
        :class="$route.path === `/` ? 'index' : ''"
      >
        <li class="nav-item flex-fill d-flex" v-for="(link, idx) in links" :key="idx">
          <RouterLink
            :to="`/menu/${link.url}`"
            class="flex-fill align-content-center nav-link"
            :class="link.url === `/${$route.params.menuName}` ? 'active' : ''"
            ><img :src="`/images/${link.icon}`" alt="主控台" />
            <p class="text-light">{{ link.title }}</p></RouterLink
          >
        </li>
      </ul>
    </div>
    <footer class="text-center text-dark-800 mt-2">
      <small> © 2024 崴尚資訊 All Rights Reserved.</small>
    </footer>
  </div>
</template>
