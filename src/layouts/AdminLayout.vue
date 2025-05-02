<template>
  <div>
    <!-- <Navbar /> -->
    <Sidebar />
    <main class="p-4 sm:ml-64">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<style lang="scss" scoped></style>
