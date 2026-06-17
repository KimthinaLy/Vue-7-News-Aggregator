<script setup lang="ts">
import { useNewsStore } from '@/stores/newsStore';

const newsStore = useNewsStore()

const article = newsStore.selectedArticle
</script>
<template>
    <RouterLink :to="{ name: 'news' }">Back to main page</RouterLink>

    <div v-if="article">
        <h3>{{ article.title }}</h3>
        <img :src="article.image" />
        <p>{{ article.description }}</p>
        <p>{{ article.content }}</p>
        <p>{{ article.publishedAt }}</p>
    </div>
    <div v-else>
        error loading page
    </div>
</template>