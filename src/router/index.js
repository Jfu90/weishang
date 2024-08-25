import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home',
      component: () => import('../views/FrameView.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/NotfindView.vue')
        }
      ]
    },
    {
      path: '/netflow-total',
      component: () => import('../views/FrameView.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/NotfindView.vue')
        },
        {
          path: 'download-netflow',
          component: () => import('../views/DownloadNetflowView.vue')
        },
        {
          path: 'search',
          component: () => import('../views/SearchView.vue')
        },
        { path: ':pathMatch(.*)*', component: () => import('../views/NotfindView.vue') }
      ]
    },
    {
      path: '/netflow-rate',
      component: () => import('../views/FrameView.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/NotfindView.vue')
        },
        { path: ':pathMatch(.*)*', component: () => import('../views/NotfindView.vue') }
      ]
    },
    {
      path: '/netflow-graph',
      component: () => import('../views/FrameView.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/NotfindView.vue')
        },
        { path: ':pathMatch(.*)*', component: () => import('../views/NotfindView.vue') }
      ]
    },
    {
      path: '/reports',
      component: () => import('../views/FrameView.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/NotfindView.vue')
        },
        { path: ':pathMatch(.*)*', component: () => import('../views/NotfindView.vue') }
      ]
    }
  ]
})

export default router
