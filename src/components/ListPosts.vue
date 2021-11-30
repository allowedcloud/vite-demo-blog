<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const routes = router.getRoutes()
  .filter(i => i.path.startsWith('/posts') && i.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
const posts = computed(() =>
  routes.filter(i => !i.path.endsWith('.html') && i.meta.frontmatter),
)
</script>

<template>
  <ul>
    <router-link
      v-for="post in posts"
      :key="post.path"
      :to="post.path"
    >
      {{ post.meta.frontmatter.title }}
    </router-link>
  </ul>
</template>
