<template>
  <button
    data-drawer-target="default-sidebar"
    data-drawer-toggle="default-sidebar"
    aria-controls="default-sidebar"
    type="button"
    class="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg sm:hidden text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-autobg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <router-link
            to="/dashboard"
            class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <svg
              class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 22 21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"
              />
              <path
                d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"
              />
            </svg>
            <span class="ms-3">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/post-artikel"
            class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <svg
              class="w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4v16m8-8H4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
            <span class="ms-3">Post Artikel</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/pendataan-konseling"
            class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <i
              class="bi bi-person-lines-fill transition duration-75 text-gray-400 group-hover:text-white mr-1"
            ></i>
            <span class="ms-3">Konseling</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/pendataan-chatbot"
            class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
          >
            <i
              class="bi bi-chat-left-text-fill transition duration-75 text-gray-400 group-hover:text-white mr-1"
            ></i>
            <span class="ms-3">Chatbot</span>
          </router-link>
        </li>

        <li>
          <button
            @click="handleLogout"
            class="w-full flex items-center p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 group transition duration-300"
            :disabled="isLoggingOut"
          >
            <svg
              class="shrink-0 w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v10h5a1 1 0 110 2H4a1 1 0 01-1-1V4zm9.293 3.293a1 1 0 011.414 0L17 10.586l-3.293 3.293a1 1 0 01-1.414-1.414L14.586 11H9a1 1 0 110-2h5.586l-1.293-1.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">
              {{ isLoggingOut ? "Logging out..." : "Logout" }}
            </span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const isLoggedIn = ref(false);
const isLoggingOut = ref(false);

// Check login state
const checkAuthStatus = () => {
  const token = localStorage.getItem("user_token");
  isLoggedIn.value = !!token;
};

// Handle logout
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
  }
};

// Run on mount
onMounted(() => {
  checkAuthStatus();

  window.addEventListener("storage", (event) => {
    if (event.key === "user_token") {
      checkAuthStatus();
    }
  });
});
</script>
