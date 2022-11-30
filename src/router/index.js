import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FormView from "../views/FormView.vue";
import EditView from "../views/EditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Clientes",
      },
    },
    {
      path: "/new",
      name: "new",
      component: FormView,
      meta: {
        title: "Novo Cliente",
      },
    },
    {
      path: "/edit/:id?",
      name: "edit",
      component: EditView,
      meta: {
        title: "Editar Cliente",
      },
    },
  ],
});

export default router;
