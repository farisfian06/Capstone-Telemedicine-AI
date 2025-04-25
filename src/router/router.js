import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";
import AboutPage from "../pages/AboutPage.vue";
import LandingPage from "../pages/LandingPage.vue";
import AritkelPage from "../pages/AritkelPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import UnauthorizedUserPage from "../pages/UnauthorizedUserPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";

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
    component: AboutPage,
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
    path: "/artikel",
    component: AritkelPage,
    meta: {
      requiresAuth: true,
      layout: "userLayout",
    },
  },
  {
    path: "/konseling",
    component: AboutPage,
    meta: {
      requiresAuth: true,
      layout: "userLayout",
    },
  },
  {
    path: "/dashboard",
    component: AboutPage,
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
