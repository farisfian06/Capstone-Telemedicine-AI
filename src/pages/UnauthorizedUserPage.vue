<template>
  <router-view></router-view>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
  >
    <div class="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
      <h1 class="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <div class="text-red-500 text-6xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-24 w-24 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3a3 3 0 100-6 3 3 0 000 6z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
        </svg>
      </div>
      <p class="text-gray-700 text-lg mb-6">
        Sorry, you don't have permission to access this page. This area requires
        higher privileges.
      </p>
      <div class="space-y-3">
        <router-link
          to="/"
          class="block w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-700 transition"
        >
          Return to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
