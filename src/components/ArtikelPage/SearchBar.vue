<template>
  <form class="max-w-md mx-auto">
    <div class="relative">
      <input
        type="search"
        id="default-search"
        class="block w-full p-4 ps-8 text-sm text-gray-900 border-2 border-gray-300 rounded-full focus:ring-secondary focus:border-primary"
        placeholder="Apa yang kamu cari?"
        required
      />
      <button
        type="submit"
        class="absolute end-2.5 bottom-2.5 p-2 text-white bg-secondary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-secondary rounded-lg"
      >
        <svg
          class="w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
    </div>
  </form>
</template>

<script setup></script>

<style lang="scss" scoped></style>
