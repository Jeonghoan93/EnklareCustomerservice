<template>
  <div v-if="showModal" class="modal">
    <Chatbot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Chatbot from "./Chatbot.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Chatbot,
  },
  setup() {
    const store = useStore();
    const showModal = computed(() => store.state.showChatbotModal);

    return {
      showModal,
    };
  },
});
</script>

<style></style>
