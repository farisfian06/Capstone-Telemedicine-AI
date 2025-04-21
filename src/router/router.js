import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import AboutPage from "../pages/AboutPage.vue";
import LandingPage from "../pages/LandingPage.vue";
import AritkelPage from "../pages/AritkelPage.vue";
import LoginPage from "../pages/LoginPage.vue";

const routes = [
  {
    path: "/",
    component: LandingPage,
  },
  {
    path: "/chatbot",
    component: AboutPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/artikel",
    component: AritkelPage,
  },
  {
    path: "/konseling",
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
