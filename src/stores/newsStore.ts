import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY

export const useNewsStore = defineStore('news', () => {
  const currentPage = ref(1)
  const pageSize: number = 10
  const totalResult = ref(0)
  const articles = ref([])
  const searchQuery = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)
  const category = ref('general')

  const totalPages = computed(() => Math.ceil(totalResult.value / pageSize))

  async function fetchArticles() {
    const urlSearchQuery = `https://gnews.io/api/v4/search?q=${searchQuery.value}&page=${currentPage.value}&max=${pageSize}&apikey=${API_KEY}`
    const urlCategoryQuery = `https://gnews.io/api/v4/top-headlines?category=${category.value}&page=${currentPage.value}&max=${pageSize}&apikey=${API_KEY}`
    try {
      loading.value = true
      let url: string = ''
      if (searchQuery.value === '') {
        url = urlCategoryQuery
      } else {
        url = urlSearchQuery
      }

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        totalResult.value = data.totalArticles
        articles.value = data.articles
      } else {
        error.value = `Error: ${response.status} ${response.statusText}`
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value -= 1
    }
  }

  return {
    currentPage,
    pageSize,
    totalPages,
    searchQuery,
    fetchArticles,
    nextPage,
    prevPage,
    loading,
    error,
    category,
  }
})
