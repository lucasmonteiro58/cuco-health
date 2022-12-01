import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import SmartTable from "vuejs-smart-table";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment/min/moment-with-locales";
import Maska from "maska";
import Toast from "vue-toastification";

import "./assets/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "vue-toastification/dist/index.css";

moment.locale("pt-br");
const options = {};

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(SmartTable);
app.use(VueAxios, axios);
app.use(Maska);
app.use(Toast, options);

app.mount("#app");
