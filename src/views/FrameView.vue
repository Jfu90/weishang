<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const links = ref({
  'netflow-total': [
    {
      url: 'download-netflow',
      title: '下載流量'
    },
    {
      url: 'download-service',
      title: '下載服務'
    },
    {
      url: 'upload-netflow',
      title: '上傳流量'
    },
    {
      url: 'upload-service',
      title: '上傳服務'
    },
    {
      url: 'renked',
      title: '總流量排名'
    },
    {
      url: 'search',
      title: '進階查詢'
    }
  ],
  'netflow-rate': [
    {
      url: 'rate-netflow',
      title: 'rate流量'
    }
  ],
  'netflow-graph': [
    {
      url: 'graph-netflow',
      title: 'graph'
    }
  ]
})

const route = useRoute()
const router = useRouter()
const pageLinks = ref([])

pageLinks.value = links.value[route.params.menuName]
// console.log(pageLinks.value)

router.push({ path: `/${route.params.menuName}/${pageLinks.value[0].url}` })
</script>

<template>
  <main>
    <nav
      class="page-nav border-bottom border-dark-700 align-items-center container-fluid d-flex"
      style="height: 70px"
    >
      <ul class="nav me-auto">
        <li class="nav-item" v-for="(link, idx) in pageLinks" :key="idx">
          <RouterLink
            :to="`/${$route.params.menuName}/${link.url}`"
            :class="link.url === $route.params.listName ? 'active' : ''"
            class="nav-link rounded-pill me-2"
            >{{ link.title }}</RouterLink
          >
        </li>
      </ul>
      <div class="text-end me-4">
        <p class="fs-5 lh-1 m-0">admin</p>
        <small>2024/8/16 11:17</small>
      </div>
      <button
        type="button"
        class="btn btn-outline-light rounded-pill me-2"
        style="padding: 8.5px 9.32px 5.5px"
      >
        <span class="icon-weishang-toolicon-stting fs-5"></span>
      </button>
      <button type="button" class="btn btn-outline-light rounded-pill" style="padding: 7px 9.64px">
        <span class="icon-weishang-toolicon-signout"></span>
      </button>
    </nav>
    <RouterView />
  </main>
</template>
