<template>
  <div>
    <Navbar />
    <slot></slot>
    <h1 class="text-center text-2xl bg-red-800">Footer Admin</h1>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
</script>

<style lang="scss" scoped></style>
