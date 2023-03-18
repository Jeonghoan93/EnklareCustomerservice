// @ts-ignore
<template>
  <div class="chatbot">
    <div class="chatbot-header">
      <h3>Enklare agent</h3>
      <span @click="closeModal" class="close">&times;</span>
    </div>
    <div class="chatbot-messages">
      <transition-group name="message" tag="div">
        <p v-if="isLoggedIn()" key="welcomeMessage">
          Welcome back, {{ firstName }}!
        </p>
        <div
          v-for="(message, index) in chatbotMessages"
          :key="index"
          :class="[
            'chatbot-message',
            message.sender === 'user' ? 'user-message' : 'bot-message',
          ]"
        >
          {{ message.text }}
        </div>
      </transition-group>
      <div class="loading">
        <div v-if="isBotTyping" class="typing-indicator">Enklare is typing</div>
        <img
          v-if="isBotTyping"
          src="../assets/loading-spinner.svg"
          alt="Loading..."
          class="loading-spinner"
        />
      </div>
    </div>
    <div class="chatbot-input">
      <input
        type="text"
        placeholder="How can I help you today?"
        v-model="userInput"
        @keydown.enter="sendMessage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue";
// @ts-ignore
import api from "../services/api";
import { useStore } from "vuex";

export default defineComponent({
  name: "Chatbot",
  setup() {
    const store = useStore();
    const firstName = computed(() => store.state.firstName);
    const isLoggedIn = () => store.state.userLoggedIn;

    const closeModal = () => {
      store.commit("setShowChatbotModal", false);
    };

    const userInput: Ref<string> = ref("");
    const chatbotMessages: Ref<Array<{ text: string; sender: string }>> = ref(
      []
    );
    const isBotTyping: Ref<boolean> = ref(false);

    const sendMessage = async () => {
      // Send a message to the server and display the res
      if (userInput.value.trim()) {
        try {
          isBotTyping.value = true;
          const res = await api.post("/api/chat", {
            text: userInput.value,
          });

          // console log to print the response from the server
          console.log("Response from server:", res);

          // add the user's message to the chatbotMessages array
          chatbotMessages.value.push({ text: userInput.value, sender: "user" });

          // add the server's res to the chatboxMessages array
          chatbotMessages.value.push({ text: res.data.message, sender: "bot" });

          // Handle the server and display it in the chatbot-message container
          userInput.value = "";
          isBotTyping.value = false;
        } catch (err) {
          console.error("Error sending messages", err);
          chatbotMessages.value.push({
            text: "Sorry, an error occurred while processing your request. Please try again later.",
            sender: "bot",
          });
          isBotTyping.value = false;
        }
      }
    };

    return {
      userInput,
      sendMessage,
      chatbotMessages,
      isBotTyping,
      closeModal,
      firstName,
      isLoggedIn,
    };
  },
});
</script>

<style scoped>
.chatbot {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: rgb(37, 34, 34);
  border: 1px solid #324059;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.close {
  color: #aaa;
  position: absolute;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
  top: 7px;
  right: 7px;
}

.close:hover,
.close:focus {
  color: rgb(215, 201, 201);
  text-decoration: none;
  cursor: pointer;
}

.chatbot-header {
  background-color: #2277ed;
  color: rgb(245, 249, 253);
  font-size: 18px;
  font-weight: bold;
  padding: 5px;
  text-align: center;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.chatbot-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

p {
  color: white;
}

.chatbot-message {
  margin-bottom: 8px;
  padding: 6px 10px;
  border-radius: 4px;
  max-width: 80%;
}

.user-message {
  background-color: #336ad9;
  color: white;
  align-self: flex-end;
  border-top-right-radius: 0;
}

.bot-message {
  background-color: #f1f1f1;
  color: #333;
  align-self: flex-start;
  border-top-left-radius: 0;
}

.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter,
.message-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.chatbot-input {
  padding: 10px;
  border-top: 1px solid #5c5a5a;
}

.loading {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.typing-indicator {
  font-style: italic;
  font-size: 11pt;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 5px;
  margin-left: 10px;
}

.loading-spinner {
  height: 13px;
  width: 13px;
  margin-top: 11px;
  margin-left: 7px;
}

input {
  color: #f1f1f1;
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  border-color: #3b3d3e;
  background-color: #1d1b1b;
  border-radius: 4px;
  outline: none;
  padding-left: 10px;
}

input:focus {
  border-color: #373738;
}
</style>
