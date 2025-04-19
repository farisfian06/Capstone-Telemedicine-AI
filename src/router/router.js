import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import AboutPage from "../pages/AboutPage.vue";
import LandingPage from "../pages/LandingPage.vue";

const routes = [
  {
    path: "/",
    component: LandingPage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
