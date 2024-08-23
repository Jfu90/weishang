<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'

const links = ref({
  home: [],
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
  'netflow-rate': [],
  'netflow-graph': [],
  reports: []
})

const route = useRoute()
const router = useRouter()
const pageLinks = ref([])
const nowURL = computed(() => {
  const urlSplit = route.path.split('/')
  return urlSplit
})

const renewUrl = () => {
  pageLinks.value.length = 0
  pageLinks.value = [...links.value[nowURL.value[1]]]
  if (!nowURL.value[2] && pageLinks.value.length > 0) {
    router.push({ path: `/${nowURL.value[1]}/${pageLinks.value[0].url}` })
  }
}
renewUrl()

onMounted(() => {
  watch(nowURL, renewUrl)
})
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
            :to="`/${nowURL[1]}/${link.url}`"
            :class="link.url === nowURL[2] ? 'active' : ''"
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
        <i class="icon-weishang-toolicon-setting fs-5"></i>
      </button>
      <button type="button" class="btn btn-outline-light rounded-pill" style="padding: 7px 9.64px">
        <i class="icon-weishang-toolicon-signout"></i>
      </button>
    </nav>
    <RouterView />
  </main>
</template>
