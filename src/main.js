import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import SmartTable from "vuejs-smart-table";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment/min/moment-with-locales";

import "./assets/main.css";
import "@fortawesome/fontawesome-free/css/all.css";

moment.locale("pt-br");

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(SmartTable);
app.use(VueAxios, axios);

app.mount("#app");
