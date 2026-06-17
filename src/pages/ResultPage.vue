<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';
import { useDebounce } from '@/composables/useDebounce';

defineOptions({
    name: 'ResultPage'
})

const newsStore = useNewsStore()
const { searchQuery } = storeToRefs(newsStore) //because pinia auto-unwraps refs when access via the store object

onMounted(() => {
    newsStore.fetchArticles()
})

function selectCategory(cat: string) {
    newsStore.category = cat
    newsStore.fetchArticles()
}

const debouncedQuery = useDebounce(searchQuery, 500)
watch(debouncedQuery, () => {
    newsStore.fetchArticles()
})

</script>
<template>

</template>