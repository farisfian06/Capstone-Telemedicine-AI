<template>
  <section class="container mx-auto px-4 py-12">
    <div v-if="loading" class="flex justify-center items-center min-h-[300px]">
      <p class="text-lg text-gray-500 animate-pulse">Memuat artikel...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-600 text-lg">
      <p>{{ error }}</p>
    </div>

    <div v-else class="max-w-4xl mx-auto animate-fade-in">
      <div class="overflow-hidden rounded-2xl shadow-md mb-8">
        <img
          :src="article.gambar_url"
          :alt="article.judul"
          class="w-full h-72 object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h1 class="text-4xl font-bold text-gray-800 mb-2">{{ article.judul }}</h1>
      <h2 class="text-xl text-gray-500 mb-6">{{ article.subjudul }}</h2>

      <div
        class="article-content prose prose-lg max-w-none"
        v-html="article.isi"
      ></div>

      <div class="mt-10">
        <router-link
          to="/artikel"
          class="inline-block bg-secondary text-white px-6 py-3 rounded-full hover:bg-secondary/80 transition duration-300"
        >
          ← Kembali ke Daftar Artikel
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const articleId = route.params.id;

const article = ref({});
const loading = ref(true);
const error = ref(null);

const fetchArticle = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("user_token") || "";

    const response = await axios.get(
      `http://127.0.0.1:8000/api/article/${articleId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    article.value = response.data || {};
    error.value = null;
  } catch (err) {
    console.error("Error fetching article:", err);
    error.value = "Gagal memuat artikel. Silakan coba lagi nanti.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchArticle();
});
</script>

<style scoped>
/* Animasi saat muncul */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
