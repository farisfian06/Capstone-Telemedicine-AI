<template>
  <router-link to="/artikel">
    <div class="w-full border-2 rounded-lg shadow-md">
      <img
        :src="imgSrc"
        :alt="imgAlt"
        class="w-full object-cover relative top-0"
      />
      <div class="px-8 py-4 space-y-2">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  imgSrc: String,
  imgAlt: String,
  title: String,
  description: String,
});
</script>

<style lang="scss" scoped></style>
