<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import UserLayout from "./layouts/UserLayout.vue";
import AdminLayout from "./layouts/AdminLayout.vue";

// Komponen default jika tidak ada layout
const DefaultLayout = {
  render() {
    return this.$slots.default();
  },
};

const route = useRoute();
const layout = computed(() => {
  // Ambil layout dari meta route
  const layoutName = route.meta.layout;

  // Return komponen layout yang sesuai
  if (layoutName === "userLayout") return UserLayout;
  if (layoutName === "adminLayout") return AdminLayout;

  // Default layout jika tidak ada yang cocok
  return DefaultLayout;
});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>
