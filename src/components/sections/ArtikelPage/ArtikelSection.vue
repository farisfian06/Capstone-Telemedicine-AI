<template>
  <section>
    <div class="container py-12">
      <SearchBar />
      <h1 class="font-bold text-3xl">Artikel Terbaru</h1>
      <div v-if="loading" class="py-8 text-center">
        <p>Memuat artikel...</p>
      </div>
      <div v-else-if="error" class="py-8 text-center text-red-500">
        <p>{{ error }}</p>
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 py-8"
      >
        <ArtikelCard
          v-for="(item, index) in articles"
          :key="index"
          :imgSrc="item.gambar_url"
          :imgAlt="item.judul"
          :title="item.judul"
          :description="item.isi"
          :articleId="item.id"
        />
      </div>
      <div v-if="articles.length > 0" class="flex justify-center mt-8">
        <button
          class="border-2 py-2 px-4 border-secondary text-secondary rounded-full hover:bg-secondary hover:text-white ease-in-out duration-300"
          @click="loadMoreArticles"
          :disabled="loading"
        >
          {{ loading ? "Memuat..." : "Selanjutnya" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ArtikelCard from "../../ArtikelCard.vue";
import SearchBar from "../../ArtikelPage/SearchBar.vue";
import artikelimg from "@/assets/images/LandingPage/artikelImg.png";

// State variables
const articles = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const defaultImage = artikelimg;

// Function to fetch articles from API
const fetchArticles = async (page = 1) => {
  try {
    loading.value = true;

    // Get token from localStorage or your auth store
    const token = localStorage.getItem("user_token") || "";

    const response = await axios.get(`http://127.0.0.1:8000/api/article`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    articles.value = response.data;

    error.value = null;
  } catch (err) {
    console.error("Error fetching articles:", err);
    error.value = "Gagal memuat artikel. Silakan coba lagi nanti.";
  } finally {
    loading.value = false;
  }
};

// Function to load more articles
const loadMoreArticles = async () => {
  currentPage.value++;
  await fetchArticles(currentPage.value);
};

// Fetch articles when component is mounted
onMounted(() => {
  fetchArticles();
});
</script>

<style lang="scss" scoped></style>
