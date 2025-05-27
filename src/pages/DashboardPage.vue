<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Dashboard Admin</h1>

    <div
      v-if="isLoading"
      class="flex justify-center items-center min-h-[200px]"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
      ></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Artikel Stats -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Artikel</h2>
        <div class="text-3xl font-bold text-primary mb-2">
          {{ dashboardData.article_count }}
        </div>
        <p class="text-gray-600">Total Artikel Dipublikasi</p>
      </div>

      <!-- Konseling Stats -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Konseling</h2>
        <div class="text-3xl font-bold text-primary mb-2">
          {{ dashboardData.total_bookings }}
        </div>
        <p class="text-gray-600">Sesi Konseling Aktif</p>
        <div
          class="mt-4 text-sm text-orange-600"
          v-if="dashboardData.pending_bookings > 0"
        >
          <span class="font-medium">{{ dashboardData.pending_bookings }}</span>
          menunggu konfirmasi
        </div>
      </div>

      <!-- Chatbot Stats -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">Chatbot</h2>
        <div class="text-3xl font-bold text-primary mb-2">
          {{ dashboardData.total_conversations }}
        </div>
        <p class="text-gray-600">Total Percakapan</p>
      </div>
    </div>

    <!-- Recent Activities
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">
        Aktivitas Terbaru
      </h2>
      <div class="space-y-4">
        <div class="flex items-center justify-between py-2 border-b">
          <div>
            <p class="font-medium">Artikel baru ditambahkan</p>
            <p class="text-sm text-gray-600">Tips Kesehatan Mental</p>
          </div>
          <span class="text-sm text-gray-500">2 jam yang lalu</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b">
          <div>
            <p class="font-medium">Permintaan konseling baru</p>
            <p class="text-sm text-gray-600">dari John Doe</p>
          </div>
          <span class="text-sm text-gray-500">4 jam yang lalu</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b">
          <div>
            <p class="font-medium">Dataset chatbot diperbarui</p>
            <p class="text-sm text-gray-600">20 pertanyaan baru ditambahkan</p>
          </div>
          <span class="text-sm text-gray-500">6 jam yang lalu</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const isLoading = ref(true);
const dashboardData = ref({
  article_count: 0,
  total_bookings: 0,
  pending_bookings: 0,
  total_conversations: 0,
});

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("user_token");
    const response = await axios.get("http://127.0.0.1:8000/api/dashboard", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    dashboardData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
});
</script>

<style lang="scss" scoped></style>
