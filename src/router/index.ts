import { createMemoryHistory, createRouter } from 'vue-router'
import ResultsPage from '@/pages/DetailPage.vue'
import DetailsPage from '@/pages/DetailPage.vue'

const routes = [
  { path: '/news', name: 'news', component: ResultsPage },
  { path: '/news/:id', name: 'news-detail', component: DetailsPage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
