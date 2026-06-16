import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY

export const useNewsStore = defineStore('news', () => {
  const currentPage = ref(1)
  const pageSize: number = 10
  const totalResult = ref(0)
  const articles = ref([])
  const searchQuery = ref('')
  const loading = ref(true)
  const error = ref<string | null>(null)

  const totalPages = computed(() => Math.ceil(totalResult.value / pageSize))

  async function fetchArticles() {
    const url = `https://gnews.io/api/v4/search?q=${searchQuery.value}&page=${currentPage.value}&max=${pageSize}&apikey=${API_KEY}`
    try {
      loading.value = true
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
  }
})
