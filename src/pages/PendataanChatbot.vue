<template>
  <div class="container mx-auto p-4">
    <div
      v-if="loadingState"
      class="flex justify-center items-center min-h-[200px]"
    >
      <LoadingState />
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="conversation in conversations"
        :key="conversation.id"
        class="conversation-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
        @click="handleCardClick(conversation.id)"
      >
        <h3 class="text-lg font-semibold mb-2 text-left">
          {{ conversation.title }}
        </h3>
        <p class="text-gray-600 text-left">{{ conversation.user_name }}</p>
      </button>
    </div>
  </div>

  <!-- Modal for ChatContainer -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white rounded-lg w-11/12 max-w-4xl h-[80vh] relative">
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <span class="text-2xl">&times;</span>
      </button>
      <div class="h-full p-4">
        <ChatContainer
          v-if="!loadingState && selectedConversationId"
          :conversationId="selectedConversationId"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import LoadingState from "../components/LoadingState.vue";
import ChatContainer from "../components/Chatbot/ChatContainer.vue";

const conversations = ref([]);
const loadingState = ref(false);
const showModal = ref(false);
const selectedConversationId = ref(null);

const fetchConversations = async () => {
  loadingState.value = true;
  try {
    const token = localStorage.getItem("user_token"); // Assuming token is stored in localStorage
    const response = await axios.get(
      "http://127.0.0.1:8000/api/chatbot/conversations/all",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.status === "success") {
      conversations.value = response.data.data;
      console.log("Conversations:", conversations.value);
    }
  } catch (error) {
    console.error("Error fetching conversations:", error);
  } finally {
    loadingState.value = false;
  }
};

const handleCardClick = (conversationId) => {
  selectedConversationId.value = conversationId;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedConversationId.value = null;
};

onMounted(() => {
  fetchConversations();
});
</script>

<style scoped>
.conversation-card {
  cursor: pointer;
  border: 1px solid #e2e8f0;
  width: 100%;
  text-align: left;

  &:hover {
    border-color: #cbd5e0;
  }
}
</style>
