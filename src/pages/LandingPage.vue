<template>
  <div>
    <router-view></router-view>
    <HeroSection />
    <FiturSection />
    <ArtikelSection />
    <main></main>
  </div>
</template>

<script setup>
import ArtikelSection from "../components/sections/LandingPage/ArtikelSection.vue";
import FiturSection from "../components/sections/LandingPage/FiturSection.vue";
import HeroSection from "../components/sections/LandingPage/HeroSection.vue";
</script>

<style lang="scss" scoped></style>
