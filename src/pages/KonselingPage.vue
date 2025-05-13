<template>
  <router-view></router-view>
  <section class="min-h-screen py-10">
    <div class="container">
      <div class="px-4 py-8 w-full bg-slate-100 rounded-lg space-y-10">
        <router-link
          to="/konseling/booking"
          class="px-4 py-2 font-bold text-xl bg-secondary text-white rounded-lg hover:bg-slate-50 hover:text-secondary hover:border-secondary border-2 ease ease-in-out duration-300"
          >Booking Layanan konseling</router-link
        >

        <h1 class="text-2xl font-bold">Riwayat Bimbingan Konseling</h1>

        <div v-if="loading" class="text-center py-10">
          <LoadingState />
        </div>

        <div v-else-if="error" class="bg-red-100 p-4 rounded-lg text-red-600">
          {{ error }}
        </div>

        <div v-else class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="table-fixed w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="w-1/6 px-6 py-3">Tanggal</th>
                <th scope="col" class="w-1/6 px-6 py-3">Waktu</th>
                <th scope="col" class="w-1/6 px-6 py-3">Status</th>
                <th scope="col" class="w-1/6 px-6 py-3">Konselor</th>
                <th scope="col" class="w-2/6 px-6 py-3">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in konselingData"
                :key="index"
                class="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {{ formatDate(data.tanggal) }}
                </th>
                <td class="px-6 py-4">{{ data.waktu }}</td>
                <td class="px-6 py-4">
                  <span
                    class="px-2 py-1 rounded"
                    :class="{
                      'bg-yellow-200 text-yellow-800':
                        data.status === 'pending',
                      'bg-green-200 text-green-800': data.status === 'approved',
                      'bg-red-200 text-red-800': data.status === 'rejected',
                    }"
                  >
                    {{ data.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  {{ data.konselor_nama || "-" }}
                </td>
                <td class="px-6 py-4">{{ data.keterangan || "-" }}</td>
              </tr>
              <tr v-if="konselingData.length === 0">
                <td colspan="5" class="px-6 py-4 text-center">
                  Tidak ada data konseling
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import LoadingState from "../components/LoadingState.vue";

const konselingData = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchKonselingData = async () => {
  try {
    const token = localStorage.getItem("user_token");

    if (!token) {
      error.value = "Token tidak ditemukan. Silakan login terlebih dahulu.";
      loading.value = false;
      return;
    }

    const response = await axios.get("http://127.0.0.1:8000/api/konseling", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    konselingData.value = response.data;

    loading.value = false;
  } catch (err) {
    console.error("Error fetching konseling data:", err);
    error.value =
      err.response?.data?.message ||
      "Terjadi kesalahan saat mengambil data konseling";
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

onMounted(() => {
  fetchKonselingData();
});
</script>

<style lang="scss" scoped></style>
