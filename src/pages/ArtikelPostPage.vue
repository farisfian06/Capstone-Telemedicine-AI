<template>
  <div class="p-4 border rounded-lg bg-slate-100 shadow-md space-y-4">
    <router-link
      to="/post-artikel/create"
      class="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-slate-50 hover:text-secondary hover:border-secondary border-2 ease ease-in-out duration-300"
      >Tambah Artikel</router-link
    >
    <div class="overflow-x-auto sm:rounded-lg">
      <table class="table-fixed w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300">
          <tr>
            <th class="w-1/6 px-6 py-3">Judul artikel</th>
            <th class="w-1/6 px-6 py-3">Subjudul</th>
            <th class="w-3/6 px-6 py-3">Isi</th>
            <th class="w-1/6 px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="isLoading">
            <tr v-for="n in 3" :key="n" class="animate-pulse bg-slate-200">
              <td class="w-1/6 px-6 py-4">
                <div class="h-4 bg-slate-300 rounded"></div>
              </td>
              <td class="w-1/6 px-6 py-4">
                <div class="h-4 bg-slate-300 rounded"></div>
              </td>
              <td class="w-3/6 px-6 py-4">
                <div class="h-4 bg-slate-300 rounded mb-2"></div>
                <div class="h-4 bg-slate-300 rounded mb-2"></div>
                <div class="h-4 bg-slate-300 rounded w-3/4"></div>
              </td>
              <td class="w-1/6 px-6 py-4">
                <div
                  class="h-8 w-16 bg-slate-300 rounded inline-block mr-2"
                ></div>
                <div class="h-8 w-16 bg-slate-300 rounded inline-block"></div>
              </td>
            </tr>
          </template>

          <template v-else>
            <tr
              v-for="artikel in artikelList"
              :key="artikel.id"
              class="bg-slate-100 border-b border-gray-200 hover:bg-gray-50"
            >
              <td
                class="w-1/6 px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ artikel.judul }}
              </td>
              <td class="w-1/6 px-6 py-4">{{ artikel.subjudul }}</td>
              <td class="w-3/6 px-6 py-4 line-clamp-3">{{ artikel.isi }}</td>
              <td class="w-1/6 px-6 py-4 space-x-2">
                <router-link
                  :to="`/post-artikel/edit/${artikel.id}`"
                  class="inline-block px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-primary"
                >
                  <i class="bi bi-pencil-fill"></i>
                </router-link>
                <button
                  @click="hapusArtikel(artikel.id)"
                  class="px-4 py-2 bg-red-200 text-red-700 rounded-lg hover:bg-secondary"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
            <tr v-if="artikelList.length === 0">
              <td colspan="4" class="px-6 py-4 text-center">
                Tidak ada artikel tersedia
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const artikelList = ref([]);
const isLoading = ref(false);

// Fungsi untuk mengambil data artikel dari API
const fetchArtikel = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem("user_token");
    console.log(token);

    const response = await axios.get("http://127.0.0.1:8000/api/article", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    artikelList.value = response.data;
  } catch (error) {
    console.error("Error saat mengambil data artikel:", error);
  } finally {
    isLoading.value = false;
  }
};

// Fungsi untuk menghapus artikel
const hapusArtikel = async (id) => {
  if (confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
    try {
      const token = localStorage.getItem("user_token");

      await axios.delete(`http://127.0.0.1:8000/api/article/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      fetchArtikel(); // refresh data
    } catch (error) {
      console.error("Gagal menghapus artikel:", error);
    }
  }
};

onMounted(() => {
  fetchArtikel();
});
</script>

<style lang="scss" scoped></style>
