<script setup lang="ts">
</script>

<template>
  <nav>
    <div class="nav__logo">
      vite blog demo
    </div>
    <div class="nav__links">
      <router-link to="/" title="Home">
        Home
      </router-link>
      <router-link to="/about" title="About">
        About
      </router-link>
      <router-link to="/posts" title="Posts">
        Posts
      </router-link>
    </div>
  </nav>
</template>

<style>
nav {
  display: flex;
  justify-content: space-between;
}
.nav__logo {
  font-size: x-large;
  margin: 0 2em;
}
.nav__links {
  display: flex;
  align-items: center;
}
.nav__links a {
  margin: 0 2em;
  color: blue;
  font-size: x-large;
  text-decoration: none;
  border-bottom: 2px solid transparent;
}

.nav__links .router-link-active {
  border-bottom-color: blue;
}
</style>
