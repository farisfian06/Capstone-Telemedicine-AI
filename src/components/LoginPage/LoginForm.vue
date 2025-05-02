<template>
  <form class="w-full" @submit.prevent="handleLogin">
    <div class="mb-5">
      <label for="NIM" class="block mb-2 text-sm font-medium text-primary"
        >NIM</label
      >
      <input
        v-model="formData.nim"
        type="text"
        id="NIM"
        class="bg-[#E8F0FE] text-gray-900 text-sm rounded-md focus:border-secondary block w-full p-2.5"
        placeholder=""
        required
      />
    </div>
    <div class="mb-5">
      <label for="password" class="block mb-2 text-sm font-medium text-pretty"
        >Password</label
      >
      <input
        v-model="formData.password"
        type="password"
        id="password"
        class="bg-[#E8F0FE] text-gray-900 text-sm rounded-md focus:border-secondary block w-full p-2.5"
        required
      />
    </div>
    <button
      type="submit"
      class="text-white bg-secondary hover:bg-white hover:text-secondary hover:border-secondary border-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      :disabled="loading"
    >
      {{ loading ? "Loading..." : "Login" }}
    </button>
    <div v-if="error" class="mt-3 text-red-500 text-sm">
      {{ error }}
    </div>

    <div class="flex w-full justify-center">
      <p>
        Belum Punya akun?
        <router-link to="/register" class="text-secondary">Daftar</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";

const formData = reactive({
  nim: "",
  password: "",
});

const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = "";

    const response = await axios.post(
      "http://127.0.0.1:8000/api/login",
      formData
    );

    // Store the user token in localStorage
    localStorage.setItem("user_token", response.data.user_token);

    localStorage.setItem(
      "user_data",
      JSON.stringify({
        role: response.data.role,
      })
    );

    if (response.data.role === "admin") {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/";
    }
  } catch (err) {
    error.value =
      err.response?.data?.message || "An error occurred during login";
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
