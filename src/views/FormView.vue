<script setup>
import { reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Field, Form, ErrorMessage } from "vee-validate";
import { schema } from "@/utils/validations.js";
import { convertDateToBR } from "@/utils";
import Api from "@/services";

const router = useRouter();
const isEdit = computed(() => router.currentRoute.value.name === "edit");
const idClient = computed(() => router.currentRoute.value.params.id);

const client = reactive({
  name: "",
  cpf: "",
  birthdate: "",
  phone: "",
});

function backHome() {
  router.push({ name: "home" });
}

function submitForm(value) {
  if (isEdit.value) updateClient(value);
  else createClient(value);
}

function resetForm() {
  client.name = "";
  client.cpf = "";
  client.birthdate = "";
  client.phone = "";
}

async function createClient(value) {
  await Api.createClient(value)
    .then(() => {
      resetForm();
    })
    .catch((error) => {
      console.log(error);
    });
}

async function updateClient(value) {
  await Api.updateClient(idClient.value, value)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
}

async function getClient() {
  await Api.getClient(idClient.value)
    .then((response) => {
      client.name = response.data.name;
      client.cpf = response.data.cpf;
      client.birthdate = convertDateToBR(response.data.birthdate);
      client.phone = response.data.phone;
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  if (isEdit.value) getClient();
});
</script>

<template>
  <Form @submit="submitForm" :validation-schema="schema">
    <div class="grid gap-y-6 gap-x-5 md:grid-cols-2 grid-cols-1">
      <div>
        <Field
          v-model="client.name"
          name="name"
          type="text"
          class="input-primary"
          placeholder="Nome"
        />
        <ErrorMessage class="pt-3 text-red-400 italic" name="name" />
      </div>

      <div>
        <Field
          v-model="client.cpf"
          name="cpf"
          v-maska="'###.###.###-##'"
          type="text"
          class="input-primary"
          placeholder="CPF"
        />
        <ErrorMessage class="pt-3 text-red-400 italic" name="cpf" />
      </div>

      <div>
        <Field
          v-model="client.birthdate"
          name="birthdate"
          v-maska="'##/##/####'"
          type="text"
          class="input-primary"
          placeholder="Data de Nascimento"
        />
        <ErrorMessage class="pt-3 text-red-400 italic" name="birthdate" />
      </div>

      <div>
        <Field
          v-model="client.phone"
          name="phone"
          v-maska="['(##) ####-####', '(##) #####-####']"
          class="input-primary"
          placeholder="Telefone"
          type="text"
        />
        <ErrorMessage class="pt-3 text-red-400 italic" name="phone" />
      </div>
    </div>
    <div class="mt-8 float-right">
      <button @click="backHome" class="btn-transparent">Cancelar</button>
      <button class="btn-secondary ml-4" type="submit">Salvar</button>
    </div>
  </Form>
</template>
