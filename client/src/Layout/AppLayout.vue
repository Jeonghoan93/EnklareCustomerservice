<template>
  <div class="app-layout">
    <header>
      <div v-if="isLoggedIn()" class="logo">
        enklare<span class="dot">.</span>
      </div>
      <!-- header contents -->
      <nav class="nav-links">
        <router-link v-if="!isLoggedIn()" class="router-link" to="/register"
          >Sign up</router-link
        >
        <router-link v-if="!isLoggedIn()" class="router-link" to="/login"
          >Login</router-link
        >
        <router-link
          class="router-link"
          to="#"
          @click.prevent="handleLogout"
          v-if="isLoggedIn()"
          >Logout</router-link
        >
      </nav>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <!-- footer contents -->
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import api from "../services/api";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AppLayout",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoggedIn = () => store.state.userLoggedIn;

    const handleLogout = () => {
      // Clear user data from the local storage and Vuex store
      localStorage.removeItem("user");
      localStorage.removeItem("firstName");
      localStorage.removeItem("token");
      store.commit("setUserLoggedIn", false);
      store.commit("setFirstName", "");

      // Remove the Authorization header from the axios instance
      delete api.defaults.headers.common["Authorization"];

      // Redirect to the login page
      router.push("/login");
    };

    return {
      isLoggedIn,
      handleLogout,
    };
  },
});
</script>

<style scoped>
.app-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;

  margin: 0 auto;
}

header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: rgb(30 35 35 / 0.8);
  padding: 1rem;
  z-index: 99;
}

.logo {
  flex-direction: row;
  position: absolute;
  left: 4%;
  font-size: 1.2rem;
  font-weight: 800;
  color: rgb(255, 255, 255);
}

.dot {
  font-size: 1.3rem;
  padding: 0.6px;
  color: rgb(42, 187, 37);
}

.se {
  margin-top: 0.18rem;
  font-size: 1rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin-right: 2%;
}

.router-link-exact-active,
.router-link-active,
.router-link {
  margin-top: 3px;
  background-color: #1c3b69;
  text-decoration: none;
  border: none;
  font-size: 10pt;
  font-weight: 600;
  color: white;
  padding: 0.5rem 0.9rem;

  border-radius: 4px;
  cursor: pointer;
}

main {
  padding: 1rem;
}

@media (max-width: 768px) {
  main {
    padding: 1rem 0.5rem;
  }
} ;
</style>
