<template>
  <div class="relative inline-block text-left">
    <!-- Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="text-white bg-primary hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      type="button"
    >
      {{ selectedItem ? selectedItem.name : "Pilih Konselor" }}
      <svg
        class="w-2.5 h-2.5 ms-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-show="isOpen"
      class="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg"
    >
      <ul class="py-2 text-sm text-gray-700">
        <li
          v-for="(item, index) in items"
          :key="index"
          @click="selectItem(item)"
        >
          <button
            class="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            type="button"
          >
            {{ item.name }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  bookingId: Number,
});

const emit = defineEmits(["select"]);

const selectedItem = ref(null);
const isOpen = ref(false);

// Toggle dropdown open/close
function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

// Handle item selection
function selectItem(item) {
  selectedItem.value = item;
  isOpen.value = false;
  emit("select", { bookingId: props.bookingId, konselor: item });
}
</script>

<style scoped></style>
