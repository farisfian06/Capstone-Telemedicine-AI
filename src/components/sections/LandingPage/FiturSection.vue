<template>
  <section class="bg-primary">
    <div class="container">
      <div class="flex justify-center px-16 py-16 gap-5">
        <FiturCard
          v-for="(fitur, index) in features"
          :key="index"
          :imgSrc="fitur.imgSrc"
          :imgAlt="fitur.imgAlt"
          :title="fitur.title"
          :description="fitur.description"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import FiturCard from "../../LandingPage/FiturCard.vue";
import fitur1 from "@/assets/images/LandingPage/fitur1.png";
import fitur2 from "@/assets/images/LandingPage/fitur2.png";
import fitur3 from "@/assets/images/LandingPage/fitur3.png";

const features = [
  {
    imgSrc: fitur1,
    imgAlt: "Chatbot",
    title: "Chatbot AI 24/7",
    description:
      "Chatbot cerdas yang selalu tersedia untuk mendengarkan keluhan dan memberikan tanggapan awal secara instan.",
  },
  {
    imgSrc: fitur2,
    imgAlt: "Konseling Psikolog",
    title: "Konseling Psikolog",
    description:
      "Chatbot cerdas yang selalu tersedia untuk mendengarkan keluhan dan memberikan tanggapan awal secara instan.",
  },
  {
    imgSrc: fitur3,
    imgAlt: "Privasi dan Anonimitas",
    title: "Privasi dan Anonimitas",
    description:
      "Chatbot cerdas yang selalu tersedia untuk mendengarkan keluhan dan memberikan tanggapan awal secara instan.",
  },
];
</script>

<style lang="scss" scoped></style>
