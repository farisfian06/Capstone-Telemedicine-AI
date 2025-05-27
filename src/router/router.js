import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import AboutPage from "../pages/AboutPage.vue";
import LandingPage from "../pages/LandingPage.vue";
import AritkelPage from "../pages/AritkelPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import UnauthorizedUserPage from "../pages/UnauthorizedUserPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import ArtikelPostPage from "../pages/ArtikelPostPage.vue";
import ArtikelPostForm from "../components/ArtikelPostForm.vue";
import LoginForm from "../components/LoginPage/LoginForm.vue";
import DetailArtikelPage from "../pages/DetailArtikelPage.vue";
import RegistPage from "../pages/RegistPage.vue";
import KonselingPage from "../pages/KonselingPage.vue";
import PengajuanKonselingForm from "../components/KonselingPage/PengajuanKonselingForm.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import PendataanKonselingPage from "../pages/PendataanKonselingPage.vue";
import ChatbotPage from "../pages/ChatbotPage.vue";
import PendataanChatbot from "../pages/PendataanChatbot.vue";

const routes = [
  {
    path: "/",
    component: LandingPage,
    meta: {
      layout: "userLayout",
    },
  },
  {
    path: "/chatbot",
    component: ChatbotPage,
    meta: {
      requiresAuth: true,
      layout: "userLayout",
    },
  },
  {
    path: "/login",
    component: LoginPage,
    meta: {
      layout: "userLayout",
    },
  },
  {
    path: "/register",
    component: RegistPage,
    meta: {
      layout: "userLayout",
    },
  },
  {
    path: "/artikel",
    component: AritkelPage,
    meta: {
      requiresAuth: true,
      layout: "userLayout",
    },
  },
  {
    path: "/artikel/:id",
    component: DetailArtikelPage,
    meta: {
      requiresAuth: true,
      layout: "userLayout",
    },
  },
  {
    path: "/post-artikel",
    component: ArtikelPostPage,
    meta: {
      requiresAuth: true,
      allowedRoles: ["admin"],
      layout: "adminLayout",
    },
  },
  {
    path: "/post-artikel/create",
    component: ArtikelPostForm,
    meta: {
      requiresAuth: true,
      allowedRoles: ["admin"],
      layout: "adminLayout",
    },
  },
  {
    path: "/konseling",
    component: KonselingPage,
    meta: {
      requiresAuth: true,
      layout: "userLayout",
    },
  },
  {
    path: "/konseling/booking",
    component: PengajuanKonselingForm,
    meta: {
      requiresAuth: true,
      layout: "userLayout",
    },
  },
  {
    path: "/pendataan-konseling",
    component: PendataanKonselingPage,
    meta: {
      requiresAuth: true,
      allowedRoles: ["admin"],
      layout: "adminLayout",
    },
  },
  {
    path: "/pendataan-chatbot",
    component: PendataanChatbot,
    meta: {
      requiresAuth: true,
      allowedRoles: ["admin"],
      layout: "adminLayout",
    },
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    meta: {
      requiresAuth: true,
      allowedRoles: ["admin"],
      layout: "adminLayout",
    },
  },
  {
    path: "/unauthorized",
    component: UnauthorizedUserPage,
  },
  {
    path: "/:pathMatch(.*)*", // <- fallback untuk route tidak dikenal
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Enhanced navigation guard with role checking
router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    // Check if user is logged in
    const token = localStorage.getItem("user_token");

    if (!token) {
      // Not logged in, redirect to login page
      next("/login");
      return;
    }

    // If this route requires specific roles
    if (to.meta.allowedRoles) {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
      console.log(userData);
      const userRole = userData.role;
      console.log(userRole);

      // pengecekan role
      if (to.meta.allowedRoles.includes(userRole)) {
        // Auth dengan Role sesuai
        next();
      } else {
        // Role tidak sesuai, redirect unauthorized
        next("/unauthorized");
      }
    } else {
      // route auth tanpa role
      next();
    }
  } else {
    // Route langsung tanpa auth
    next();
  }
});
export default router;
