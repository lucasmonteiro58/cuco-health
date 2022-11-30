<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function backHome() {
  router.push({ name: "home" });
}
</script>

<template>
  <div class="grid gap-y-6 gap-x-5 md:grid-cols-2 grid-cols-1">
    <input type="text" id="password" class="input-primary" placeholder="Nome" />
    <input type="text" id="password" class="input-primary" placeholder="CPF" />
    <input
      type="text"
      id="password"
      class="input-primary"
      placeholder="Data de Nascimento"
    />
    <input
      type="text"
      id="password"
      class="input-primary"
      placeholder="Telefone"
    />
  </div>
  <div class="mt-8 float-right">
    <button @click="backHome" class="btn-transparent">Cancelar</button>
    <button class="btn-secondary ml-4">Salvar</button>
  </div>
</template>
