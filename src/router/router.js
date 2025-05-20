import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import ShopView from "../views/ShopView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import Cart from "../components/CartComponent.vue";
import BlogView from "../views/BlogView.vue";
import ProductView from "../views/ProductView.vue";
import BlogIdView from "../views/BlogIdView.vue";

const routes = [
  { path: "/", name: "HomeView", component: HomeView },
  { path: "/shop", name: "ShopView", component: ShopView },
  { path: "/about", name: "AboutView", component: AboutView },
  { path: "/contact", name: "ContactView", component: ContactView },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/blog", name: "BlogView", component: BlogView },
  {
    path: "/shop/:id/:name",
    name: "ProductView",
    component: ProductView,
    props: true,
  },
  {
    path: "/blog/:id/:slug",
    name: "BlogIdView",
    component: BlogIdView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
