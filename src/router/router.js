import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import ShopView from "../views/ShopView.vue";

const routes = [
  { path: "/", name: "HomeView", component: HomeView },
  { path: "/shop", name: "ShopView", component: ShopView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
