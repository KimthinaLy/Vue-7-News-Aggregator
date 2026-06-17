import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'news',
    component: () => import('@/pages/ResultPage.vue'),
  },
  {
    path: '/news-detail',
    name: 'news-detail',
    component: () => import('@/pages/DetailPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
