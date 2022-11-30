import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import "@fortawesome/fontawesome-free/css/all.css";

import SmartTable from "vuejs-smart-table";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(SmartTable);

app.mount("#app");
