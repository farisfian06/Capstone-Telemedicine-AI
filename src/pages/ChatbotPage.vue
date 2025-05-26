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
        <div v-if="isLoading" class="flex justify-center items-center h-full">
          <LoadingState />
        </div>
        <ul v-else class="space-y-4 text-start w-full">
          <li
            v-for="conversation in conversations"
            :key="conversation.id"
            class="w-full"
          >
            <button
              @click="setCurrentConversation(conversation.id)"
              class="p-2 text-gray-900 rounded-lg hover:bg-gray-100 line-clamp-1 w-full text-left"
            >
              <span>{{ conversation.title }}</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>

    <main class="p-2 flex-1 h-full flex flex-col">
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
      <ChatContainer :conversationId="currentConversationId" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ChatContainer from "../components/Chatbot/ChatContainer.vue";
import LoadingState from "../components/LoadingState.vue";

const isAsideOpen = ref(true);
const conversations = ref([]);
const isLoading = ref(false);
const currentConversationId = ref(null);

const toggleAside = () => {
  isAsideOpen.value = !isAsideOpen.value;
};

const setCurrentConversation = (id) => {
  currentConversationId.value = id;
  console.log(id);
};

const fetchConversations = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem("user_token");
    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/chatbot/conversations",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    conversations.value = data.data;
    // Set initial conversation ID to the first conversation if exists
    if (conversations.value.length > 0) {
      currentConversationId.value = conversations.value[0].id;
    }
  } catch (error) {
    console.error("Error fetching conversations:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchConversations();
});
</script>
