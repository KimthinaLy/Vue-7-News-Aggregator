import { createWebHashHistory, createRouter } from 'vue-router'
import ResultPage from '@/pages/ResultPage.vue'
import DetailPage from '@/pages/DetailPage.vue'

const routes = [
  { path: '/', name: 'news', component: ResultPage },
  { path: '/news/:id', name: 'news-detail', component: DetailPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
