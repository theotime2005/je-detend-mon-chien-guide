<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { loginUser } from "@/adapters/authentication";
import PasswordComponent from "@/components/PasswordComponent.vue";

const email = ref("");
const password = ref("");
const router = useRouter();

const message = ref("");

function showMessage(value) {
  message.value = value;
  setTimeout(() => {
    message.value = "";
  }, 3000);
}

async function handleLogin() {
  const authenticate = await loginUser({
    email: email.value,
    password: password.value,
  });
  if (authenticate === true) {
    router.push("/");
  } else if (typeof authenticate === "string") {
    showMessage(authenticate);
  } else {
    showMessage("Une erreur est survenue");
  }
}
</script>

<template>
  <h1>Connexion</h1>
  <form @submit.prevent="handleLogin">
  <label for="email">Email</label>
  <input type="email" id="email" v-model="email" required />
  <PasswordComponent label="Mot de passe" password-id="password" v-model="password"/>
  <p v-if="message" role="alert">{{message}}</p>
  <button type="submit">Connexion</button>
  </form>
</template>

<style scoped>

</style>
