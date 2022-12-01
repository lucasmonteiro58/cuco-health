<script setup>
const emit = defineEmits(["cancel", "confirm"]);
function cancel() {
  emit("cancel");
}

function confirm() {
  emit("confirm");
}
</script>

<template>
  <div
    class="w-screen h-screen z-50 bg-[#00000050] fixed top-0 right-0 backdrop-blur flex items-center justify-center"
  >
    <div
      v-motion-pop
      class="w-[90%] sm:w-[450px] min-h-[300px] bg-white rounded-md flex flex-col items-center justify-center px-4"
    >
      <div
        class="w-[48px] h-[48px] rounded-full bg-[#feebc8] flex items-center justify-center"
      >
        <i class="fa-solid fa-triangle-exclamation text-[#dd6b20] text-xl"></i>
      </div>
      <div class="text-cuco-text-strong text-lg font-semibold mt-4">
        Atenção
      </div>
      <div class="text-center">
        Você tem certeza que quer excluir os cliente(s) selecionado(s)?
      </div>
      <div class="flex justify-between mt-7 gap-8">
        <button class="btn-transparent py-2" @click="cancel">Cancelar</button>
        <button class="btn-primary bg-cuco-red py-2" @click="confirm">
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>
