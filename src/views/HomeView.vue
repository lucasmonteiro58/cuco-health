<script setup>
import { ref, reactive, onMounted } from "vue";
import Pagination from "v-pagination-3";
import Api from "@/services";

const page = ref(1);
const totalRecords = ref(5);

const paginatorOptions = {
  texts: {
    count: "{from} - {to} de {count}|{count} registros| 1",
  },
};

const clients = ref([]);
const loadingClients = ref(false);
async function getClients() {
  mountForm();
  loadingClients.value = true;
  await Api.getClients(form)
    .then((response) => {
      clients.value = response.data;
      totalRecords.value = Number(response.headers["x-total-count"]);
    })
    .finally(() => {
      loadingClients.value = false;
    });
}

const form = reactive({});
function mountForm() {
  form._page = page.value;
  form._limit = 5;
}

onMounted(() => {
  getClients();
});
</script>

<template>
  <div class="relative mt-1">
    <input
      type="text"
      id="password"
      class="input-primary"
      placeholder="Digite aqui o nome ou o CPF..."
    />
    <button
      class="block w-7 h-7 text-center text-xl leading-0 absolute top-4 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"
    >
      <i class="fa fa-search"></i>
    </button>
  </div>
  <div class="flex justify-center" v-if="loadingClients">
    <i class="fas fa-spinner text-3xl mt-4 absolute animate-spin"></i>
  </div>
  <VTable
    :data="clients"
    class="w-full border-spacing-y-4 border-separate rounded-t mt-10 mb-5"
  >
    <template #head>
      <tr class="uppercase">
        <th>
          <input type="checkbox" class="form-checkbox -ml-5" />
        </th>
        <th class="text-left">Nome</th>
        <th class="text-left">Data de Nascimento</th>
        <th class="text-left">Telefone</th>
        <th></th>
      </tr>
    </template>
    <template #body="{ rows }">
      <tr
        v-for="row in rows"
        :key="row.name"
        class="bg-white rounded-t-xl shadow-sm"
      >
        <td class="pl-8 pr-2">
          <input type="checkbox" class="form-checkbox" />
        </td>
        <td class="py-4">
          <div class="font-bold text-gray-600">{{ row.name }}</div>
          <div>{{ row.cpf }}</div>
        </td>
        <td>{{ row.birthdate }}</td>
        <td>{{ row.phone }}</td>
        <td class="pr-6">
          <div class="flex sm:justify-end">
            <button class="btn-secondary py-2 px-4">
              <i class="fa fa-pencil mr-2"></i>
              Editar
            </button>
          </div>
        </td>
      </tr>
    </template>
  </VTable>
  <pagination
    v-model="page"
    :records="totalRecords"
    :per-page="5"
    :options="paginatorOptions"
    @paginate="getClients"
  />
</template>
