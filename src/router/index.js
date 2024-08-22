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
      component: HomeView
    },
    // {
    //   path: '/netflow-total',
    //   component: () => import('../views/FrameView.vue')
    // },
    // {
    //   path: '/netflow-rate',
    //   component: () => import('../views/FrameView.vue')
    // },
    // {
    //   path: '/netflow-graph',
    //   component: () => import('../views/FrameView.vue')
    // },
    // {
    //   path: '/reports',
    //   component: () => import('../views/FrameView.vue')
    // }
    {
      path: '/menu/:menuName',
      component: () => import('../views/FrameView.vue'),
      children: [
        {
          path: 'list/:listName',
          component: () => import('../views/ContentView.vue')
        }
      ]
    }
  ]
})

export default router
