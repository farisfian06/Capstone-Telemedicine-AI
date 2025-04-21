<template>
  <div
    class="flex flex-col w-full h-fit gap-2 justify-center items-center text-center text-white"
  >
    <img :src="imgSrc" :alt="imgAlt" class="w-20" draggable="false" />
    <h2 class="text-secondary text-2xl font-bold">{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
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
