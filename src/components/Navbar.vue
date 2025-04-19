<template>
  <div class="w-full bg-primary">
    <div class="container">
      <div class="flex justify-between items-center p-2 text-white h-20">
        <div class="flex h-full items-center gap-2">
          <img src="/public/Logo.png" alt="" class="h-full object-contain" />
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
        <button
          class="px-5 py-1 bg-secondary rounded-full hover:bg-slate-50 hover:text-primary ease-in-out duration-300"
        >
          <router-link to="/login">Login</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
