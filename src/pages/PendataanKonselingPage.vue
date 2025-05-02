<template>
  <div class="p-4 border rounded-lg bg-slate-100 shadow-md space-y-4">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">
      Daftar Permintaan Konseling
    </h2>

    <!-- Loading state -->
    <template v-if="isLoading">
      <LoadingState />
    </template>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="bg-red-100 border-l-4 border-red-500 p-4 mb-4"
    >
      <p class="text-red-700">{{ error }}</p>
      <button
        @click="fetchData"
        class="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Data display -->
    <div v-else class="overflow-x-auto sm:rounded-lg">
      <table class="table-fixed w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-300">
          <tr>
            <th class="w-2/12 px-6 py-3">Nama</th>
            <th class="w-1/12 px-6 py-3">Tanggal</th>
            <th class="w-1/12 px-6 py-3">Waktu</th>
            <th class="w-1/12 px-6 py-3">Status</th>
            <th class="w-2/12 px-6 py-3">Konselor</th>
            <th class="w-3/12 px-6 py-3">Keterangan</th>
            <th class="w-2/12 px-6 py-3">Validasi</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="bookings.length > 0">
            <tr
              v-for="booking in bookings"
              :key="booking.id"
              class="bg-slate-100 border-b border-gray-200 hover:bg-gray-50"
            >
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ booking.user_name }}
              </td>
              <td class="px-6 py-4">{{ formatDate(booking.tanggal) }}</td>
              <td class="px-6 py-4">{{ booking.waktu }}</td>
              <td class="px-6 py-4">
                <span
                  class="px-2 py-1 rounded"
                  :class="{
                    'bg-yellow-200 text-yellow-800':
                      booking.status === 'pending',
                    'bg-green-200 text-green-800':
                      booking.status === 'approved',
                    'bg-red-200 text-red-800': booking.status === 'rejected',
                  }"
                >
                  {{ booking.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <template v-if="booking.konselor_name">
                  {{ booking.konselor_name }}
                </template>
                <template v-else>
                  <Dropdown
                    :items="konselors"
                    :bookingId="booking.id"
                    @select="onKonselorSelected"
                  />
                </template>
              </td>
              <td class="px-6 py-4 max-h-32 overflow-y-auto">
                {{ booking.keterangan }}
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-2">
                  <button
                    @click="validateBooking(booking.id)"
                    class="bg-green-400 hover:bg-green-500 px-4 py-2 w-full rounded-lg text-black disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!selectedKonselors[booking.id]"
                  >
                    Setujui
                  </button>
                  <button
                    @click="rejectBooking(booking.id)"
                    class="bg-red-400 hover:bg-red-500 px-4 py-2 w-full rounded-lg text-black disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="booking.status !== 'pending'"
                  >
                    Tolak
                  </button>
                </div>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="7" class="px-6 py-4 text-center">
              Tidak ada permintaan konseling
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import Dropdown from "../components/Dropdown.vue";
import LoadingState from "../components/LoadingState.vue";

const bookings = ref([]);
const konselors = ref([]);
const isLoading = ref(false);
const error = ref(null);
const selectedKonselors = reactive({});
const token = localStorage.getItem("user_token");

onMounted(() => {
  fetchData();
});

async function fetchData() {
  isLoading.value = true;
  error.value = null;

  try {
    await Promise.all([fetchBookings(), fetchKonselors()]);
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = "Terjadi kesalahan saat memuat data. Silakan coba lagi.";
  } finally {
    isLoading.value = false;
  }
}

async function fetchBookings() {
  if (!token) {
    throw new Error("Token tidak ditemukan");
  }

  const response = await axios.get(
    "http://127.0.0.1:8000/api/konseling/booking",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  bookings.value = response.data || [];
}

async function fetchKonselors() {
  if (!token) {
    throw new Error("Token tidak ditemukan");
  }

  const response = await axios.get(
    "http://127.0.0.1:8000/api/konseling/konselors",
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  konselors.value = response.data || [];
}

function onKonselorSelected({ bookingId, konselor }) {
  selectedKonselors[bookingId] = konselor.id;
  console.log(
    `Konselor ${konselor.name} dipilih untuk booking ID ${bookingId} `
  );
}

async function validateBooking(bookingId) {
  const konselorId = selectedKonselors[bookingId];

  if (!konselorId) {
    alert("Silakan pilih konselor terlebih dahulu");
    return;
  }

  try {
    isLoading.value = true;

    await axios.put(
      `http://127.0.0.1:8000/api/konseling/booking-konseling/${bookingId}/validate`,
      {
        status: "approved",
        konselor_id: konselorId,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await fetchBookings(); // Refresh data
    alert("Permintaan konseling berhasil disetujui");
    selectedKonselors[bookingId] = null;
  } catch (err) {
    console.error("Error validating booking:", err);
    alert("Gagal menyetujui permintaan konseling");
  } finally {
    isLoading.value = false;
  }
}

async function rejectBooking(bookingId) {
  try {
    await axios.put(
      `http://127.0.0.1:8000/api/konseling/booking-konseling/${bookingId}/validate`,
      {
        status: "rejected",
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Permintaan konseling berhasil ditolak");
    fetchBookings(); // Refresh data
  } catch (err) {
    console.error("Error rejecting booking:", err);
    alert("Gagal menolak permintaan konseling");
  }
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}
</script>

<style scoped>
.max-h-32 {
  max-height: 8rem;
}
</style>
