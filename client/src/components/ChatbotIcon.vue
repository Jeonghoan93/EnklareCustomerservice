<template>
  <div @click="openModal" class="chatbot-icon">
    <img src="../assets/chatbot-ai.jpg" alt="Chatbot Icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    const openModal = () => {
      store.commit("setShowChatbotModal", true);
    };

    return {
      openModal,
    };
  },
});
</script>

<style>
.chatbot-icon {
  cursor: pointer;
  z-index: 999;
  position: fixed;
  bottom: 20px;
  right: 20px;
}

img {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  object-fit: cover;
}
</style>
