<template>
  <div class="w-full bg-primary">
    <div class="container">
      <div class="flex justify-between items-center p-2 text-white h-20">
        <div class="flex h-full items-center gap-2">
          <img src="/Logo.png" alt="" class="h-full object-contain" />
          <router-link to="/">Telemedicine</router-link>
        </div>
        <ul class="flex gap-4">
          <router-link
            class="hover:text-secondary ease-in-out duration-300"
            to="/"
            >Beranda</router-link
          >
          <router-link
            class="hover:text-secondary ease-in-out duration-300"
            to="/chatbot"
            >Chatbot</router-link
          >
          <router-link
            class="hover:text-secondary ease-in-out duration-300"
            to="/artikel"
            >Artikel</router-link
          >
          <router-link
            class="hover:text-secondary ease-in-out duration-300"
            to="/konseling"
            >Konseling</router-link
          >
        </ul>
        <!-- Conditional rendering based on auth state -->
        <div v-if="isLoggedIn">
          <button
            @click="handleLogout"
            class="px-5 py-1 bg-red-500 rounded-full hover:bg-slate-50 hover:text-primary ease-in-out duration-300"
            :disabled="isLoggingOut"
          >
            {{ isLoggingOut ? "Logging out..." : "Logout" }}
          </button>
        </div>
        <router-link
          v-else
          class="px-5 py-1 bg-secondary rounded-full hover:bg-slate-50 hover:text-primary ease-in-out duration-300"
          to="/login"
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

// Check if user is logged in
const checkAuthStatus = () => {
  const token = localStorage.getItem("user_token");
  isLoggedIn.value = !!token;
};

// Logout function with API call
const handleLogout = async () => {
  try {
    isLoggingOut.value = true;

    // Get the token from localStorage
    const token = localStorage.getItem("user_token");

    if (token) {
      // Make the API request to invalidate the token on the backend
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

    // Clear user data from localStorage
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");

    // Update auth state
    isLoggedIn.value = false;

    // Redirect to home page
    router.push("/");
  } catch (error) {
    console.error("Logout error:", error);

    // Even if the API call fails, we should still clean up local storage
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_data");
    isLoggedIn.value = false;

    // Still redirect to home
    router.push("/");
  } finally {
    isLoggingOut.value = false;
  }
};

// Check auth status when component mounts
onMounted(() => {
  checkAuthStatus();

  // Set up an event listener for storage changes (in case user logs in/out in another tab)
  window.addEventListener("storage", (event) => {
    if (event.key === "user_token") {
      checkAuthStatus();
    }
  });
});
</script>
