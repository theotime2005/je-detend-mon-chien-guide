<script setup>
import packageInfo from "../../../package.json";
</script>

<template>
  <footer>
    <p>© {{new Date().getFullYear()}} {{packageInfo.author}}</p>
    <p>Version {{packageInfo.version}}</p>
  </footer>
</template>

<style scoped>

</style>
