<template>
  <div class="app">
    <main>
      <NewsPublisher />
    </main>
  </div>
</template>

<script setup>
import NewsPublisher from "./components/NewsPublisher.vue";
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  width: 100%;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  color: #333;
}
</style>
