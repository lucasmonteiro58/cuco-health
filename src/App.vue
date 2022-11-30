<script setup>
import { RouterView, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

function goToForm() {
  router.push({ name: "new" });
}
</script>

<template>
  <header
    class="w-full bg-cuco-blue h-[318px] pt-14 flex items-center flex-col"
  >
    <div class="w-full xl:w-[1120px] px-5 xl:px-0 flex justify-between">
      <img
        src="@/assets/images/logo.png"
        alt="Logo Cuco Health"
        class="w-[143px] h-[40px]"
      />
      <button
        v-if="route.name === 'home'"
        class="btn-primary"
        @click="goToForm"
      >
        Novo cliente
      </button>
    </div>
    <h1
      class="w-full xl:w-[1120px] px-5 xl:px-0 text-left text-white font-semibold text-4xl mt-20"
    >
      {{ route.meta.title }}
    </h1>
  </header>

  <main class="w-full flex items-center flex-col -mt-7">
    <section class="w-full xl:w-[1120px] px-5 xl:px-0">
      <RouterView />
    </section>
  </main>
</template>

<style scoped></style>
