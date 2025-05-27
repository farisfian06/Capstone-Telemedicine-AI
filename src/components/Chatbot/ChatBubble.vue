<template>
  <div
    class="flex"
    :class="sender === 'user' ? 'justify-end' : 'justify-start'"
  >
    <div
      class="max-w-[70%] w-fit rounded-lg px-4 py-2"
      :class="
        sender === 'user'
          ? 'bg-primary text-white justify-end self-end items-end'
          : 'bg-gray-100 text-gray-800 '
      "
    >
      <h5
        v-if="sender === 'admin'"
        class="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-gray-50 ring-1 ring-inset ring-gray-500/10"
      >
        Admin
      </h5>
      <div v-html="formatResponse(text)" class="whitespace-pre-line"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: String,
  sender: String,
});

const formatResponse = (text) => {
  if (!text) return "";
  return text.replace(
    /\*\*(.*?)\*\*/g,
    "<strong class='font-bold'>$1</strong>"
  );
};
</script>

<style scoped></style>
