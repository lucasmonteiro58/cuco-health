<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import Pagination from "v-pagination-3";
import Api from "@/services";
import moment from "moment/min/moment-with-locales";
import { verifyContainsNumbers, verifyIsCpf } from "@/utils";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import ModalConfirm from "@/components/ModalConfirm.vue";

const router = useRouter();
const toast = useToast();

// paginator
const page = ref(1);
const totalRecords = ref(5);
const paginatorOptions = {
  texts: {
    count: "{from} - {to} de {count}|{count} registros|  1 registro",
  },
};
// end paginator

const clients = ref([]);
const loadingClients = ref(false);
const search = ref("");
const form = reactive({});

function mountForm() {
  form.cpf_like = "";
  form.name_like = "";
  if (verifyContainsNumbers(search.value) && verifyIsCpf(search.value)) {
    form.cpf_like = search.value;
  } else {
    form.name_like = search.value;
  }
  form._page = page.value;
  form._limit = 5;
}

//selected clients function
const selectedAll = ref(false);
const selectedClients = computed(() =>
  clients.value.filter((client) => client.checked)
);
function toggleAllRows() {
  selectedAll.value = !selectedAll.value;
  if (selectedAll.value) {
    clients.value.forEach((client) => {
      client.checked = true;
    });
  } else {
    clients.value.forEach((client) => {
      client.checked = false;
    });
  }
}
function selectClient(id) {
  clients.value.forEach((client) => {
    if (client.id === id) {
      client.checked = !client.checked;
    }
  });
}
//end selected clients function

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

async function deleteClients() {
  await Api.deleteClients(selectedClients.value)
    .then(() => {
      toast.success("Cliente(s) excluído(s) com sucesso!");
      selectedAll.value = false;
      getClients();
      showModal.value = false;
    })
    .catch(() => {
      toast.error("Erro ao deletar cliente(s)!");
    });
}

//modal
const showModal = ref(false);
function openModal() {
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}

function goToEdit(id) {
  router.push({ name: "edit", params: { id } });
}

onMounted(() => {
  getClients();
});
</script>

<template>
  <div class="relative mt-1">
    <input
      type="text"
      v-model="search"
      class="input-primary"
      placeholder="Digite aqui o nome ou o CPF..."
    />
    <button
      @click="getClients"
      class="block w-7 h-7 text-center text-xl leading-0 absolute top-4 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"
    >
      <i class="fa fa-search"></i>
    </button>
  </div>
  <div class="flex justify-center" v-if="loadingClients">
    <i class="fas fa-spinner text-3xl mt-4 absolute animate-spin"></i>
  </div>
  <div v-if="clients.length === 0" class="w-full text-center mt-5 text-lg">
    Sem resultados
  </div>
  <div class="relative">
    <button
      v-if="selectedClients.length > 0"
      class="btn-secondary bg-red-600 py-2 px-4 absolute top-8 right-0"
      @click="openModal"
    >
      <i class="fas fa-trash-alt mr-2"></i>
      Excluir
    </button>
  </div>

  <VTable
    v-if="clients.length > 0"
    :data="clients"
    class="w-full border-spacing-y-4 border-separate rounded-t mt-12 mb-5"
  >
    <template #head>
      <tr class="uppercase">
        <th @click="toggleAllRows">
          <input
            v-model="selectedAll"
            type="checkbox"
            class="form-checkbox -ml-5"
          />
        </th>
        <th class="text-left">Nome</th>
        <th class="text-left">Data de Nascimento</th>
        <th class="text-left">Telefone</th>
        <th class="relative"></th>
      </tr>
    </template>
    <template #body="{ rows }">
      <tr
        v-for="row in rows"
        :key="row.name"
        class="bg-white rounded-t-xl shadow-sm"
        @click="selectClient(row.id)"
      >
        <td class="pl-8 pr-2">
          <input type="checkbox" class="form-checkbox" v-model="row.checked" />
        </td>
        <td class="py-4">
          <div class="font-bold text-gray-600">{{ row.name }}</div>
          <div>{{ row.cpf }}</div>
        </td>
        <td>{{ moment(row.birthdate).format("LL") }}</td>
        <td>{{ row.phone }}</td>
        <td class="pr-6">
          <div class="flex sm:justify-end">
            <button class="btn-secondary py-2 px-4" @click="goToEdit(row.id)">
              <i class="fa fa-pencil mr-2"></i>
              Editar
            </button>
          </div>
        </td>
      </tr>
    </template>
  </VTable>
  <Pagination
    v-if="clients.length > 0"
    v-model="page"
    :records="totalRecords"
    :per-page="5"
    :options="paginatorOptions"
    @paginate="getClients"
  />
  <ModalConfirm
    v-if="showModal"
    @cancel="closeModal"
    @confirm="deleteClients"
  ></ModalConfirm>
</template>
