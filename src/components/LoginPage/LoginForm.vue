<template>
  <form class="w-full">
    <div class="mb-5">
      <label for="NIM" class="block mb-2 text-sm font-medium text-primary"
        >NIM</label
      >
      <input
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
        type="password"
        id="password"
        class="bg-[#E8F0FE] text-gray-900 text-sm rounded-md focus:border-secondary block w-full p-2.5"
        required
      />
    </div>
    <button
      type="submit"
      class="text-white bg-secondary hover:bg-white hover:text-secondary hover:border-secondary border-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    >
      Login
    </button>
  </form>
</template>

<script setup></script>

<style lang="scss" scoped></style>
