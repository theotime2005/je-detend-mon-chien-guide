<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { activateUser } from "@/adapters/authentication.js";
const route = useRoute();
const isActivated = ref(false);

onMounted(async () => {
  const token = route.query.token;
  if (await activateUser(token)) {
    isActivated.value = true;
  }
});
</script>

<template>
<h1>Activation de votre compte</h1>
  <div v-if="isActivated">
    <p>Votre compte a bien été activé. Vous pouvez vous connecter.</p>
    <RouterLink to="/authentication/login">Accéder à la page de connexion</RouterLink>
  </div>
  <div v-else>
    <p>Votre compte n'a pas pu être activé. Une erreur est survenue. Réessayez de vous enregistrer. Si le problème persiste, contactez un administrateur.</p>
    <RouterLink to="/authentication/register">Accéder à la page d'inscription</RouterLink>
  </div>
</template>

<style scoped>
</style>
