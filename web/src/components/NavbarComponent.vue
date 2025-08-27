<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

import routerList from "@/router/router-list.js";

const routes = ref([]);

function getAvailableroutes() {
  routerList.map((route) => {
    if (route.meta && route.meta.navbar) {
      routes.value.push(route);
    }
  });
}

onMounted(() => {
  getAvailableroutes();
});
</script>

<template>
  <nav aria-label="Menu de navigation">
    <menu>
      <RouterLink
        class="route"
        v-for="route in routes" :key="route.path"
        :to="route.path"
        >{{route.name}}</RouterLink>
    </menu>
  </nav>
</template>

<style scoped>

</style>
