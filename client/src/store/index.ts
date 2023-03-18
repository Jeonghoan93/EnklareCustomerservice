import { createStore } from "vuex";

export default createStore({
  state: {
    userLoggedIn: false,
    showChatbotModal: false,
    firstName: localStorage.getItem("firstName") || "",
  },
  mutations: {
    setShowChatbotModal(state, payload) {
      state.showChatbotModal = payload;
    },
    setUserLoggedIn(state, isLoggedIn) {
      state.userLoggedIn = isLoggedIn;
    },
    setFirstName(state, firstName) {
      state.firstName = firstName;
    },
  },
  // Actions and other store operations
});
