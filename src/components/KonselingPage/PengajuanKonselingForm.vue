<template>
  <section class="min-h-screen flex items-center">
    <div class="max-w-lg w-full mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-extrabold text-primary mb-2">
          Booking Konseling
        </h1>
        <p class="text-gray-600">
          Pilih jadwal yang sesuai dengan kebutuhan Anda
        </p>
      </div>

      <!-- Tanggal -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold text-primary mb-3 flex items-center">
          <span class="mr-2">
            <i class="bi bi-calendar2"></i>
          </span>
          Pilih Hari & Tanggal:
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <button
            v-for="(dateObj, index) in availableDates"
            :key="index"
            type="button"
            @click="selectDate(dateObj)"
            :class="[
              'p-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary',
              selectedDate &&
              selectedDate.formattedDate === dateObj.formattedDate
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-primary',
            ]"
          >
            <div class="font-bold">{{ dateObj.dayName }}</div>
            <div class="text-sm">{{ dateObj.formattedDate }}</div>
          </button>
        </div>
      </section>

      <!-- Sesi waktu -->
      <section v-if="selectedDate" class="mb-8">
        <h2 class="text-lg font-semibold text-primary mb-3 flex items-center">
          <span class="mr-2">
            <i class="bi bi-clock"></i>
          </span>
          Pilih Sesi untuk {{ selectedDate.dayName }},
          {{ selectedDate.formattedDate }}:
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            v-for="(session, index) in sessions"
            :key="index"
            type="button"
            @click="selectSession(session)"
            :class="[
              'p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary',
              selectedSession === session
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-primary',
            ]"
          >
            <span class="mr-2"><i class="bi bi-clock"></i></span>
            {{ session }}
          </button>
        </div>
      </section>

      <!-- Keterangan -->
      <section v-if="selectedDate && selectedSession" class="mb-8">
        <h2 class="text-lg font-semibold text-primary mb-3 flex items-center">
          <span class="mr-2"><i class="bi bi-pencil-square"></i></span>
          Keterangan Konsultasi:
        </h2>
        <textarea
          v-model="notes"
          class="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Tuliskan topik atau masalah yang ingin Anda konsultasikan..."
          rows="4"
        ></textarea>
      </section>

      <!-- Tombol Booking -->
      <button
        type="button"
        class="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-primary flex items-center justify-center"
        :disabled="
          !selectedDate || !selectedSession || !notes.trim() || isLoading
        "
        @click="bookSession"
      >
        <span v-if="isLoading" class="mr-2">
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
        <span v-else class="mr-2"><i class="bi bi-check-lg"></i></span>
        {{ isLoading ? "Memproses..." : "Booking Sekarang" }}
      </button>

      <!-- Pesan konfirmasi atau error -->
      <div
        v-if="responseMessage.text"
        :class="[
          'mt-6 p-4 border-l-4 rounded-md',
          responseMessage.type === 'success'
            ? 'bg-green-50 border-green-500'
            : 'bg-red-50 border-red-500',
        ]"
        role="alert"
      >
        <div class="flex">
          <svg
            v-if="responseMessage.type === 'success'"
            class="w-5 h-5 text-green-500 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5 text-red-500 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p
            :class="
              responseMessage.type === 'success'
                ? 'text-green-700'
                : 'text-red-700'
            "
            class="font-medium"
          >
            {{ responseMessage.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Data state dengan Composition API
const selectedDate = ref(null);
const selectedSession = ref(null);
const notes = ref("");
const responseMessage = ref({ text: "", type: "success" });
const availableDates = ref([]);
const sessions = ref(["13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00"]);
const isLoading = ref(false);

// Generate tanggal untuk 7 hari ke depan
const generateDates = () => {
  const dates = [];
  const today = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  let count = 0;
  let i = 0;

  while (count < 7) {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + i);

    const day = nextDate.getDay();
    if (day !== 0 && day !== 6) {
      // Skip Minggu (0) dan Sabtu (6)
      const formattedDateForDisplay = `${nextDate.getDate()}/${
        nextDate.getMonth() + 1
      }/${nextDate.getFullYear()}`;

      // Format tanggal untuk API (YYYY-MM-DD)
      const year = nextDate.getFullYear();
      const month = String(nextDate.getMonth() + 1).padStart(2, "0");
      const date = String(nextDate.getDate()).padStart(2, "0");
      const formattedDateForAPI = `${year}-${month}-${date}`;

      dates.push({
        date: nextDate,
        dayName: days[day],
        formattedDate: formattedDateForDisplay,
        apiDate: formattedDateForAPI,
      });
      count++;
    }

    i++;
  }

  availableDates.value = dates;
};

// Pilih tanggal
const selectDate = (dateObj) => {
  selectedDate.value = dateObj;
  selectedSession.value = null;
};

// Pilih sesi
const selectSession = (session) => {
  selectedSession.value = session;
};

// Proses booking dengan integrasi backend
const bookSession = async () => {
  if (selectedDate.value && selectedSession.value && notes.value.trim()) {
    try {
      isLoading.value = true;

      // Ambil token dari localStorage
      const token = localStorage.getItem("user_token");
      if (!token) {
        throw new Error(
          "Token tidak ditemukan. Silakan login terlebih dahulu."
        );
      }

      // Persiapkan data untuk API
      const bookingData = {
        tanggal: selectedDate.value.apiDate,
        waktu: selectedSession.value,
        keterangan: notes.value.trim(),
      };

      // Lakukan request API dengan axios
      const response = await axios.post(
        "http://127.0.0.1:8000/api/konseling",
        bookingData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle response sukses
      responseMessage.value = {
        text: `Booking berhasil untuk ${selectedDate.value.dayName}, ${selectedDate.value.formattedDate}, sesi ${selectedSession.value}. Terima kasih!`,
        type: "success",
      };

      // Reset form setelah berhasil
      notes.value = "";
      selectedDate.value = null;
      selectedSession.value = null;
    } catch (error) {
      console.error("Error booking konseling:", error);

      // Handle error dari API atau lainnya
      let errorMessage =
        "Terjadi kesalahan saat mencoba booking. Silakan coba lagi.";

      // Ambil pesan error dari response API jika ada
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      responseMessage.value = {
        text: errorMessage,
        type: "error",
      };
    } finally {
      isLoading.value = false;
    }
  }
};

// Generate tanggal saat component dimount
onMounted(() => {
  generateDates();
});
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>
