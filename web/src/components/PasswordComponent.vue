<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "Mot de passe",
  },
  passwordId: {
    type: String,
    required: false,
    default: "password",
  },
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const password = ref(props.modelValue);
const showPassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

watch(() => props.modelValue, (newValue) => {
  password.value = newValue;
});

watch(password, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<template>
  <label :for="props.passwordId">{{props.label}}</label>
  <input :id="props.passwordId" v-model="password" :type="showPassword ? 'text' : 'password'" required>
  <button type="button" @click="togglePassword">{{showPassword ? 'Masquer' : 'Afficher'}} le mot de passe</button>
</template>

<style scoped>

</style>
