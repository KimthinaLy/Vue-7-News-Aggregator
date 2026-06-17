<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';
import { useDebounce } from '@/composables/useDebounce';

defineOptions({
    name: 'ResultPage'
})

const cats = ['science', 'sports', 'technology', 'world', 'business', 'health', 'entertainment']

const newsStore = useNewsStore()
const { searchQuery, error, loading, articles } = storeToRefs(newsStore) //because pinia auto-unwraps refs when access via the store object

onMounted(() => {
    newsStore.fetchArticles()
})

function selectCategory(cat: string) {
    newsStore.category = cat
    newsStore.searchQuery = ''
    newsStore.fetchArticles()
}

const debouncedQuery = useDebounce(searchQuery, 500)
watch(debouncedQuery, () => {
    newsStore.fetchArticles()
    newsStore.category = ''
})

</script>
<template>
    <div>
        <ul>
            <li v-for="cat in cats" :key="cat" :class="{ active: cat === newsStore.category }">
                <a @click="selectCategory(cat)">{{ cat }}</a>
            </li>
        </ul>
    </div>
    <input type="text" placeholder="Search today news ..." v-model="searchQuery" />


    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
        <div v-for="a in articles" :key="a.url">
            <h3>{{ a.title }}</h3>
            <p>{{ a.description }}</p>
            <p>{{ a.content }}</p>
            <p>{{ a.publishedAt }}</p>
            <p>{{ a.source.name }}</p>
            <p>{{ a.source.url }}</p>
        </div>
    </div>
</template>