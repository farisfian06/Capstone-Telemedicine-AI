<template>
  <router-view></router-view>
  <section
    class="h-screen"
    :style="`background-image: url(${sectionBg}); background-size: cover; background-position: center;`"
  >
    <div class="container h-full flex items-center justify-center">
      <div class="flex max-w-xl w-full gap-6 items-center">
        <img src="/Logo.png" alt="" class="object-contain w-1/3" />
        <LoginForm />
      </div>
    </div>
  </section>
</template>

<script setup>
import sectionBg from "@/assets/images/LoginPage/Login Page.png";
import LoginForm from "../components/LoginPage/LoginForm.vue";
</script>
