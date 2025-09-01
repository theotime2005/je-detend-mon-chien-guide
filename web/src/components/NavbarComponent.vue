<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import routerList from "@/router/router-list.js";
import { useAuthenticatedStore } from "@/stores/authenticated.js";
import { clearLogin } from "@/utils/token-manager.js";
const authenticatedStore = useAuthenticatedStore();
const { isLogin, firstname, lastname } = storeToRefs(authenticatedStore);

const routes = ref([]);
const router = useRouter();
const route = useRoute();

function getAvailableroutes() {
  routerList.map((route) => {
    if (route.meta && route.meta.navbar) {
      // if isLogin, push only route.meta.display with always or logged, else only always and unlogged
      if (isLogin.value) {
        if (route.meta.display === "always" || route.meta.display === "logged") {
          routes.value.push(route);
        }
      } else {
        if (route.meta.display === "always" || route.meta.display === "unlogged") {
          routes.value.push(route);
        }
      }
    }
  });
}

function logout() {
  const confirmation = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
  if (confirmation) {
    clearLogin();
    router.push("/");
    window.location.reload();
  }
}

onMounted(() => {
  getAvailableroutes();
});

watch(route, () => {
  routes.value = [];
  getAvailableroutes();
});

</script>

<template>
  <header>
    <nav aria-label="Menu de navigation">
      <menu>
        <RouterLink
          class="route"
          v-for="route in routes" :key="route.path"
          :to="route.path"
        >{{route.name}}</RouterLink>
      </menu>
    </nav>
    <div v-if="isLogin">
      <p>Bonjour {{firstname}} {{lastname}}</p>
      <button @click="logout">Déconnexion</button>
    </div>
  </header>
</template>

<style scoped>

</style>
