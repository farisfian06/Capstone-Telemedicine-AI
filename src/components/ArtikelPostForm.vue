<template>
  <form
    class="w-full p-6 rounded-lg shadow-md bg-slate-100"
    @submit.prevent="submitForm"
  >
    <div class="mb-5">
      <label for="Judul" class="block mb-2 text-sm font-medium text-primary"
        >Judul</label
      >
      <input
        type="text"
        id="Judul"
        v-model="formData.judul"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-secondary block w-full p-2.5"
        placeholder="Masukan judul artikel"
        required
      />
    </div>

    <div class="mb-5">
      <label for="Subjudul" class="block mb-2 text-sm font-medium text-primary"
        >Subjudul</label
      >
      <input
        type="text"
        id="Subjudul"
        v-model="formData.subjudul"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-secondary block w-full p-2.5"
        placeholder="Masukan subjudul artikel"
        required
      />
    </div>

    <div class="mb-5">
      <label
        for="editor-container"
        class="block mb-2 text-sm font-medium text-primary"
        >Isi</label
      >
      <!-- Container untuk Quill editor -->
      <div id="editor-container" class="bg-gray-50 rounded-lg"></div>
      <input type="hidden" id="Isi" v-model="formData.isi" required />
    </div>

    <div class="mb-5">
      <label for="Gambar" class="block mb-2 text-sm font-medium text-primary"
        >Gambar</label
      >
      <input
        type="file"
        id="Gambar"
        @change="handleFileUpload"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-secondary block w-full p-2.5"
        accept="image/jpeg,image/png,image/jpg,image/gif"
        required
      />
      <p class="text-xs text-gray-500 mt-1">
        Format: JPEG, PNG, JPG, GIF (Maks. 2MB)
      </p>
    </div>

    <div class="flex items-center mt-4">
      <button
        type="submit"
        class="text-white bg-secondary hover:bg-white hover:text-secondary hover:border-secondary border-2 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        :disabled="loading"
      >
        <span v-if="loading">Menyimpan...</span>
        <span v-else>Submit</span>
      </button>

      <div
        v-if="submitMessage"
        class="ml-4"
        :class="submitStatus === 'success' ? 'text-green-600' : 'text-red-600'"
      >
        {{ submitMessage }}
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Data untuk form
const formData = ref({
  judul: "",
  subjudul: "",
  isi: "",
  gambar: null,
});

const loading = ref(false);
const submitMessage = ref("");
const submitStatus = ref("");
let quill;

// Handle file upload
const handleFileUpload = (event) => {
  formData.value.gambar = event.target.files[0];
};

// Submit form
const submitForm = async () => {
  // Ambil konten dari editor Quill
  formData.value.isi = quill.root.innerHTML;
  loading.value = true;
  submitMessage.value = "";

  try {
    // Buat FormData object untuk mengirim file
    const formDataToSend = new FormData();
    formDataToSend.append("judul", formData.value.judul);
    formDataToSend.append("subjudul", formData.value.subjudul);
    formDataToSend.append("isi", formData.value.isi);

    // Append file jika ada
    if (formData.value.gambar) {
      formDataToSend.append("gambar", formData.value.gambar);
    }

    const token = localStorage.getItem("user_token");

    if (!token) {
      submitStatus.value = "error";
      submitMessage.value =
        "Token otentikasi tidak ditemukan. Silakan login kembali.";
      loading.value = false;
      return;
    }

    // Kirim request ke API
    const response = await axios.post(
      "http://127.0.0.1:8000/api/article/create",
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle response sukses
    console.log("Article created:", response.data);
    submitStatus.value = "success";
    submitMessage.value = "Artikel berhasil dibuat!";

    // Reset form setelah berhasil
    resetForm();
  } catch (error) {
    // Handle error
    console.error("Error creating article:", error);
    submitStatus.value = "error";

    if (error.response && error.response.data && error.response.data.message) {
      submitMessage.value = `Error: ${error.response.data.message}`;
    } else {
      submitMessage.value = "Terjadi kesalahan saat mengirim artikel.";
    }
  } finally {
    loading.value = false;
  }
};

// Reset form
const resetForm = () => {
  formData.value = {
    judul: "",
    subjudul: "",
    isi: "",
    gambar: null,
  };

  // Clear Quill editor
  if (quill) {
    quill.setText("");
  }

  // Reset file input
  const fileInput = document.getElementById("Gambar");
  if (fileInput) {
    fileInput.value = "";
  }
};

onMounted(() => {
  // Inisialisasi editor Quill setelah komponen dimuat
  quill = new Quill("#editor-container", {
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
    placeholder: "Tulis isi artikel...",
  });

  // Perbarui input tersembunyi setiap kali konten Quill berubah
  quill.on("text-change", () => {
    formData.value.isi = quill.root.innerHTML;
  });
});
</script>

<style scoped>
/* Style untuk Editor Quill */
#editor-container {
  height: 300px;
  margin-bottom: 10px;
}

/* Style untuk loading state */
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
