<template>
  <div class="w-full bg-primary">
    <div class="container mx-auto">
      <div class="flex justify-between items-center p-2 text-white h-20">
        <!-- Logo -->
        <div class="flex h-full items-center gap-2">
          <img src="/Logo.png" alt="Logo" class="h-full object-contain" />
          <router-link to="/" class="font-bold text-lg"
            >Telemedicine</router-link
          >
        </div>

        <!-- Hamburger button (mobile only) -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden text-white focus:outline-none"
        >
          <svg
            v-if="!isMobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Navigation links (desktop) -->
        <ul class="hidden md:flex gap-4 items-center">
          <router-link
            class="hover:text-secondary transition duration-300"
            to="/"
            >Beranda</router-link
          >
          <router-link
            class="hover:text-secondary transition duration-300"
            to="/chatbot"
            >Chatbot</router-link
          >
          <router-link
            class="hover:text-secondary transition duration-300"
            to="/artikel"
            >Artikel</router-link
          >
          <router-link
            class="hover:text-secondary transition duration-300"
            to="/konseling"
            >Konseling</router-link
          >
        </ul>
        <!-- Auth Buttons -->
        <div v-if="isLoggedIn" class="hidden md:flex">
          <button
            @click="handleLogout"
            class="px-5 py-1 bg-red-500 rounded-full hover:bg-slate-50 hover:text-primary transition duration-300"
            :disabled="isLoggingOut"
          >
            {{ isLoggingOut ? "Logging out..." : "Logout" }}
          </button>
        </div>
        <div v-else class="hidden md:flex">
          <router-link
            class="px-5 py-1 bg-secondary rounded-full hover:bg-slate-50 hover:text-primary transition duration-300"
            to="/login"
            >Login</router-link
          >
        </div>
      </div>

      <!-- Navigation links (mobile) -->
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden flex flex-col gap-2 px-4 pb-4 text-white"
      >
        <router-link
          class="hover:text-secondary transition duration-300"
          to="/"
          @click="closeMenu"
          >Beranda</router-link
        >
        <router-link
          class="hover:text-secondary transition duration-300"
          to="/chatbot"
          @click="closeMenu"
          >Chatbot</router-link
        >
        <router-link
          class="hover:text-secondary transition duration-300"
          to="/artikel"
          @click="closeMenu"
          >Artikel</router-link
        >
        <router-link
          class="hover:text-secondary transition duration-300"
          to="/konseling"
          @click="closeMenu"
          >Konseling</router-link
        >

        <div v-if="isLoggedIn">
          <button
            @click="handleLogout"
            class="w-full mt-2 px-5 py-1 bg-red-500 rounded-full hover:bg-slate-50 hover:text-primary transition duration-300"
            :disabled="isLoggingOut"
          >
            {{ isLoggingOut ? "Logging out..." : "Logout" }}
          </button>
        </div>
        <router-link
          v-else
          to="/login"
          class="w-full text-center mt-2 px-5 py-1 bg-secondary rounded-full hover:bg-slate-50 hover:text-primary transition duration-300"
          @click="closeMenu"
          >Login</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const isLoggedIn = ref(false);
const isLoggingOut = ref(false);
const isMobileMenuOpen = ref(false);

const checkAuthStatus = () => {
  const token = localStorage.getItem("user_token");
  isLoggedIn.value = !!token;
};

const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleLogout = async () => {
  try {
    isLoggingOut.value = true;
    const token = localStorage.getItem("user_token");

    if (token) {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    isLoggedIn.value = false;
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    isLoggedIn.value = false;
    router.push("/");
  } finally {
    isLoggingOut.value = false;
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  checkAuthStatus();
  window.addEventListener("storage", (event) => {
    if (event.key === "user_token") {
      checkAuthStatus();
    }
  });
});
</script>
