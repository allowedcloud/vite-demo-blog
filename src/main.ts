import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { createHead } from '@vueuse/head'
import App from './App.vue'

const head = createHead()

routes.forEach((route) => {
  if (route.name === 'Home') route.path = '/'
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(head)
app.use(router)
app.mount('#app')
