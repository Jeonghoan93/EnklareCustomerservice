<template>
  <div id="app">
    <AppLayout>
      <router-view />
      <ChatbotModal />
    </AppLayout>
    <ChatbotIcon v-if="!showChatbotModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import AppLayout from "./Layout/AppLayout.vue";
import ChatbotModal from "./components/ChatbotModal.vue";
import ChatbotIcon from "./components/ChatbotIcon.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    AppLayout,
    ChatbotModal,
    ChatbotIcon,
  },
  setup() {
    const store = useStore();
    const showChatbotModal = computed(() => store.state.showChatbotModal);
    return {
      showChatbotModal,
    };
  },
});
</script>

<style>
html,
body {
  font-family: "Roboto", sans-serif; /* You can use any font family you prefer */
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
