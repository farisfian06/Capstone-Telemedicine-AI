<template>
  <section>
    <div class="container py-12">
      <SearchBar />
      <h1 class="font-bold text-3xl">Artikel Terbaru</h1>
      <div class="grid grid-cols-3 gap-x-4 gap-y-8 py-8">
        <ArtikelCard
          v-for="(item, index) in articles"
          :key="index"
          :imgSrc="item.imgSrc"
          :imgAlt="item.imgAlt"
          :title="item.title"
          :description="item.description"
        />
      </div>
      <div class="flex justify-center mt-8">
        <button
          class="border-2 py-2 px-4 border-secondary text-secondary rounded-full hover:bg-secondary hover:text-white ease-in-out duration-300"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import ArtikelCard from "../../ArtikelCard.vue";
import artikelimg from "@/assets/images/LandingPage/artikelImg.png";
import SearchBar from "../../ArtikelPage/SearchBar.vue";

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
    imgAlt: "artikel2",
    title: "5 Tanda Kamu Butuh Istirahat Mental",
    description:
      "Kadang tubuh tidak lelah, tapi pikiran terasa berat. Kenali tanda-tanda kelelahan mental sejak dini.",
  },
  {
    imgSrc: artikelimg,
    imgAlt: "artikel3",
    title: "5 Tanda Kamu Butuh Istirahat Mental",
    description:
      "Kadang tubuh tidak lelah, tapi pikiran terasa berat. Kenali tanda-tanda kelelahan mental sejak dini.",
  },
  {
    imgSrc: artikelimg,
    imgAlt: "artikel4",
    title: "5 Tanda Kamu Butuh Istirahat Mental",
    description:
      "Kadang tubuh tidak lelah, tapi pikiran terasa berat. Kenali tanda-tanda kelelahan mental sejak dini.",
  },
  {
    imgSrc: artikelimg,
    imgAlt: "artikel5",
    title: "5 Tanda Kamu Butuh Istirahat Mental",
    description:
      "Kadang tubuh tidak lelah, tapi pikiran terasa berat. Kenali tanda-tanda kelelahan mental sejak dini.",
  },
];
</script>

<style lang="scss" scoped></style>
