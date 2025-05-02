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
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
import { ref, onMounted } from "vue";
import axios from "axios";
import sectionBg from "@/assets/images/LandingPage/Artikel Section.png";
import ArtikelCard from "../../ArtikelCard.vue";

const articles = ref([]);
const loading = ref(true);
const error = ref(null);
const defaultImage = "https://via.placeholder.com/400x200?text=No+Image";

// Fetch only 3 articles
const fetchArticles = async () => {
  try {
    loading.value = true;
    const response = await axios.get("http://127.0.0.1:8000/api/articles");

    // Ambil 3 artikel pertama
    articles.value = response.data.slice(0, 3).map((item) => ({
      imgSrc: item.gambar_url || defaultImage,
      imgAlt: item.judul,
      title: item.judul,
      description: item.subjudul,
    }));

    error.value = null;
  } catch (err) {
    console.error("Error fetching articles:", err);
    error.value = "Gagal memuat artikel.";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchArticles);
</script>

<style lang="scss" scoped></style>
