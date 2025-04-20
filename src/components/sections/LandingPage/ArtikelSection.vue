<template>
  <section
    :style="`background-image: url(${sectionBg}); background-size: cover; background-position: center;`"
  >
    <div class="container py-20 space-y-4">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold">Baca Artikel Baru</h2>
        <button class="text-xl text-secondary font-bold">
          <router-link to="/artikel">Lihat semua artikel</router-link>
        </button>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <ArtikelCard
          v-for="(item, index) in articles"
          :key="index"
          :imgSrc="item.imgSrc"
          :imgAlt="item.imgAlt"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import artikelimg from "@/assets/images/LandingPage/artikelImg.png";
import sectionBg from "@/assets/images/LandingPage/Artikel Section.png";
import ArtikelCard from "../../ArtikelCard.vue";

const articles = [
  {
    imgSrc: artikelimg,
    imgAlt: "artikel1",
    title: "5 Tanda Kamu Butuh Istirahat Mental",
    description:
      "Kadang tubuh tidak lelah, tapi pikiran terasa berat. Kenali tanda-tanda kelelahan mental sejak dini.",
  },
  {
    imgSrc: artikelimg,
    imgAlt: "artikel1",
    title: "5 Tanda Kamu Butuh Istirahat Mental",
    description:
      "Kadang tubuh tidak lelah, tapi pikiran terasa berat. Kenali tanda-tanda kelelahan mental sejak dini.",
  },
  {
    imgSrc: artikelimg,
    imgAlt: "artikel1",
    title: "5 Tanda Kamu Butuh Istirahat Mental",
    description:
      "Kadang tubuh tidak lelah, tapi pikiran terasa berat. Kenali tanda-tanda kelelahan mental sejak dini.",
  },
];
</script>

<style lang="scss" scoped></style>
