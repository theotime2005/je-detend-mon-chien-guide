<script setup>
import { ref } from "vue";

import { registerUser } from "@/adapters/authentication.js";
import PasswordComponent from "@/components/PasswordComponent.vue";
import { USER_TYPES } from "@/constants";

const email = ref("");
const firstname = ref("");
const lastname = ref("");
const password = ref("");
const passwordConfirm = ref("");
const userType = ref(null);

const showIncorrectPasswordMessage = ref("");
const isRegister = ref(false);

function showPasswordAlert(message) {
  showIncorrectPasswordMessage.value = message;
  setTimeout(() => {
    showIncorrectPasswordMessage.value = "";
  }, 3000);
}

function checkPasswords() {
  if (password.value !== passwordConfirm.value) {
    showPasswordAlert("Les mots de passe ne correspondent pas");
    return false;
  }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  if (!passwordRegex.test(password.value)) {
    showPasswordAlert("Le mot de passe ne respecte pas les critères de sécurité");
    return false;
  }
  return true;
}

async function register() {
  if (!userType.value) return;
  if (!checkPasswords()) return;
  const send = await registerUser({
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value,
    userType: userType.value,
  });
  if (send) {
    isRegister.value = true;
  }
}
</script>

<template>
  <h1>Inscription</h1>
  <div v-if="!isRegister">
    <p>Veuillez remplir les champs suivants</p>
    <form @submit.prevent="register">
      <label for="firstname">Prénom</label>
      <input id="firstname" v-model="firstname" type="text" required placeholder="Louis" />

      <label for="lastname">Nom</label>
      <input id="lastname" v-model="lastname" type="text" required placeholder="Braille" />

      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" required placeholder="louis.braille@example.net" />

      <PasswordComponent
        label="Votre mot de passe"
        password-id="password"
        v-model="password"
      />
      <p>Votre mot de passe doit contenir 8 caractères dont un chiffre, une lettre minuscule et majuscule et un caractère spécial.</p>

      <PasswordComponent
        label="Confirmez votre mot de passe"
        password-id="passwordConfirmation"
        v-model="passwordConfirm"
      />

      <p v-if="showIncorrectPasswordMessage" class="error-message">
        {{ showIncorrectPasswordMessage }}
      </p>

      <label for="userType">Je suis un</label>
      <select id="userType" v-model="userType" required>
        <option v-for="userTypeText in USER_TYPES" :key="userTypeText.type" :value="userTypeText.type">{{userTypeText.text}}</option>
      </select>

      <label for="agreements">
        J'accepte que les données de ce formulaire soient utilisées uniquement à des fins de contact dans le cadre des services proposés par l'application
      </label>
      <input id="agreements" type="checkbox" required />

      <button type="submit">Je m'inscris !!!</button>
    </form>
  </div>

  <div v-else>
    <p>
      Un email de confirmation vous a été envoyé à l'adresse {{ email }}. Veuillez cliquer sur le lien contenu dans cet email pour activer votre compte.
    </p>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
}
</style>
