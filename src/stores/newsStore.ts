import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNewsStore = defineStore('news', () => {
  const currentPage = ref(1)
  const pageSize: number = 10
  const totalResult = ref(0)
  const articals = ref([])
  const searchQuery = ref('')

  const totalPages = computed(() => Math.ceil(totalResult.value / pageSize))

  function fetchArticals() {}

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

  return { currentPage, pageSize, totalPages, searchQuery, fetchArticals, nextPage, prevPage }
})
