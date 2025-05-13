<template>
  <div class="h-screen relative bg-gray-100 flex">
    <aside
      :class="[
        'bg-white border-r h-full transition-all duration-300',
        isAsideOpen ? 'w-64' : 'w-0',
      ]"
    >
      <div
        class="h-full px-4 py-6 overflow-y-auto relative"
        :class="[isAsideOpen ? 'block' : 'hidden']"
      >
        <ul class="space-y-4 text-start w-full">
          <li class="w-full">
            <button
              class="p-2 text-gray-900 rounded-lg hover:bg-gray-100 line-clamp-1"
            >
              <span>Mengatasi Kecemasan</span>
            </button>
          </li>
          <li class="w-full">
            <button
              class="p-2 text-gray-900 rounded-lg hover:bg-gray-100 line-clamp-1"
            >
              <span>Tips Mengelola Stres</span>
            </button>
          </li>
          <li class="w-full">
            <button
              class="p-2 text-gray-900 rounded-lg hover:bg-gray-100 line-clamp-1"
            >
              <span>Self-Care Guide</span>
            </button>
          </li>
          <li class="w-full">
            <button
              class="p-2 text-gray-900 rounded-lg hover:bg-gray-100 line-clamp-1"
            >
              <span>Dukungan Sosial</span>
            </button>
          </li>
          <li class="w-full">
            <button
              class="p-2 text-gray-900 rounded-lg hover:bg-gray-100 line-clamp-1"
            >
              <span>Mengenal Anxiety Disorder</span>
            </button>
          </li>
          <li class="w-full">
            <button
              class="p-2 text-gray-900 rounded-lg hover:bg-gray-100 line-clamp-1"
            >
              <span>Cara Mengatasi Overthinking </span>
            </button>
          </li>
          <li class="w-full">
            <button
              class="p-2 text-gray-900 rounded-lg hover:bg-gray-100 line-clamp-1"
            >
              <span>Tips Tidur Berkualitas</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <main class="p-4 flex-1 h-full flex flex-col">
      <div class="space-x-2">
        <button
          @click="toggleAside"
          class="w-10 h-10 rounded-full hover:bg-gray-100"
        >
          <i class="bi bi-layout-sidebar"></i>
        </button>
        <button class="px-4 py-2 rounded-full bg-primary text-white space-x-2">
          <i class="bi bi-plus"></i>
          <span>New Chat</span>
        </button>
      </div>
      <div
        class="flex-1 overflow-y-auto p-4 mt-2 bg-white rounded-lg"
        ref="chatContainer"
      >
        <div class="flex flex-col space-y-4">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="flex"
            :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[70%] rounded-2xl px-4 py-2"
              :class="
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              "
            >
              <div
                v-if="message.text.includes('\\boxed{')"
                v-html="formatResponse(message.text)"
              ></div>
              <template v-else>{{ message.text }}</template>
            </div>
          </div>
          <div v-if="isTyping" class="flex justify-start">
            <div
              class="max-w-[70%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-800"
            >
              <div class="flex items-center gap-2">
                <span>Sedang mengetik</span>
                <span class="flex gap-1">
                  <span class="animate-bounce">.</span>
                  <span class="animate-bounce delay-100">.</span>
                  <span class="animate-bounce delay-200">.</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white border-t">
        <form
          @submit.prevent="sendMessage"
          class="relative flex items-center p-2"
        >
          <input
            v-model="userInput"
            type="text"
            placeholder="Ketik pesan anda..."
            class="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="isLoading"
          />
          <button
            type="submit"
            class="absolute right-4 p-2 text-blue-500 hover:text-blue-600 disabled:opacity-50 transition-colors"
            :disabled="isLoading"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";

const messages = ref([
  {
    text: "Halo! Saya adalah chatbot yang siap membantu anda. Apa yang bisa saya bantu?",
    sender: "bot",
  },
]);
const userInput = ref("");
const chatContainer = ref(null);
const isLoading = ref(false);
const isTyping = ref(false);
const isAsideOpen = ref(true);

const toggleAside = () => {
  isAsideOpen.value = !isAsideOpen.value;
};

const formatResponse = (text) => {
  return text
    .replace("\\boxed{", "")
    .replace("}", "</div>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g, "<br>");
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;

  isLoading.value = true;

  // Add user message
  const userMessage = {
    text: userInput.value,
    sender: "user",
  };
  messages.value.push(userMessage);

  // Clear input
  userInput.value = "";

  // Show typing indicator
  isTyping.value = true;

  try {
    // Format messages for API
    const formattedMessages = messages.value.map((msg) => ({
      role: msg.sender === "bot" ? "assistant" : "user",
      content: msg.text,
    }));

    // Get token from localStorage
    const token = localStorage.getItem("user_token");

    // Make API request with headers
    const response = await axios.post(
      "http://127.0.0.1:8000/api/chatbot/",
      {
        messages: formattedMessages,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);
    // Add bot response
    if (response.data.choices && response.data.choices[0]) {
      messages.value.push({
        text: response.data.choices[0].message.content,
        sender: "bot",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    messages.value.push({
      text: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
      sender: "bot",
    });
  } finally {
    isLoading.value = false;
    isTyping.value = false;
    // Scroll to bottom after messages update
    await nextTick();
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

onMounted(() => {
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
});
</script>

<style scoped>
.flex-1 {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.flex-1::-webkit-scrollbar {
  width: 6px;
}

.flex-1::-webkit-scrollbar-track {
  background: transparent;
}

.flex-1::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
</style>
