<template>
  <router-link :to="`/artikel/${articleId}`">
    <div
      class="w-full h-full border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <img
        :src="imgSrc"
        :alt="imgAlt"
        class="w-full h-48 object-contain relative top-0"
      />
      <div class="px-8 py-4 space-y-2">
        <h3 class="font-semibold text-lg">{{ title }}</h3>
        <!-- Render HTML content with proper styling -->
        <div
          class="description-content line-clamp-3"
          v-html="stripAndLimitHtml(description, 150)"
        ></div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  imgSrc: String,
  imgAlt: String,
  title: String,
  description: String,
  articleId: [Number, String],
});

// Function to strip HTML tags and limit text length
const stripAndLimitHtml = (htmlContent, limit) => {
  if (!htmlContent) return "";

  // Create a temporary div to parse HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  // Get text content without HTML tags
  let textContent = tempDiv.textContent || tempDiv.innerText || "";

  return textContent;
};
</script>

<style lang="scss" scoped></style>
