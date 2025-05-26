<template>
  <div class="mt-2 flex-1 flex flex-col h-full">
    <div
      class="flex-1 flex-col flex space-y-4 overflow-y-auto p-4 bg-white rounded-lg max-h-[calc(100vh-120px)]"
      ref="chatContainer"
    >
      <div
        v-if="isLoadingMessages"
        class="flex justify-center items-center h-full"
      >
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
        ></div>
      </div>
      <template v-else>
        <ChatBubble
          v-for="(message, index) in messages"
          :key="index"
          :text="message.text"
          :sender="message.sender"
        />
        <div v-if="isTyping" class="flex justify-start">
          <div
            class="max-w-[70%] rounded-2xl px-4 py-2 bg-gray-100 text-gray-800"
          >
            <div class="flex items-center gap-2">
              <span>Sedang mengetik</span>
            </div>
          </div>
        </div>
      </template>
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
          class="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
          :disabled="isLoading || isLoadingMessages"
        />
        <button
          type="submit"
          class="absolute right-4 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
          :disabled="isLoading || isLoadingMessages"
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
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import ChatBubble from "./ChatBubble.vue";

const props = defineProps({
  conversationId: {
    type: Number,
    required: true,
  },
});

const messages = ref([]);
const userInput = ref("");
const chatContainer = ref(null);
const isLoading = ref(false);
const isTyping = ref(false);
const isLoadingMessages = ref(false);

const fetchMessages = async () => {
  isLoadingMessages.value = true;
  try {
    const token = localStorage.getItem("user_token");
    const response = await axios.get(
      `http://127.0.0.1:8000/api/chatbot/conversations/4/messages`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.data === null || response.data.data.length === 0) {
      messages.value = [
        {
          text: "Halo! Saya adalah chatbot yang siap membantu anda. Apa yang bisa saya bantu?",
          sender: "bot",
        },
      ];
    } else {
      messages.value = response.data.data;
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    messages.value = [
      {
        text: "Maaf, terjadi kesalahan saat memuat pesan.",
        sender: "bot",
      },
    ];
  } finally {
    console.log("Messages fetched:", messages.value); // Add this line for debugging purpose
    isLoadingMessages.value = false;
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;

  isLoading.value = true;

  const userMessage = {
    text: userInput.value,
    sender: "user",
  };
  messages.value.push(userMessage);

  userInput.value = "";
  isTyping.value = true;

  try {
    const formattedMessages = messages.value.map((msg) => ({
      role: msg.sender === "bot" ? "assistant" : "user",
      content: msg.text,
    }));

    const token = localStorage.getItem("user_token");

    const response = await axios.post(
      "http://127.0.0.1:8000/api/chatbot/",
      {
        messages: formattedMessages,
        conversation_id: 4,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.choices && response.data.choices[0]) {
      messages.value.push({
        text: response.data.choices[0].message.content,
        sender: "bot",
      });
    }
    console.log("Response data:", response.data);
  } catch (error) {
    console.error("Error:", error);
    messages.value.push({
      text: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
      sender: "bot",
    });
  } finally {
    isLoading.value = false;
    isTyping.value = false;
    await nextTick();
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

onMounted(async () => {
  await fetchMessages();
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
