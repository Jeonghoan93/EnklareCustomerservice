<template>
  <div class="login-container">
    <div class="login">
      <h1>Welcome back</h1>
      <form @submit.prevent="login">
        <!-- success message -->
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import api from "../services/api";
import { defineComponent, ref, Ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// useStore() function call inside the setup() function and defines the email, password, and successMessage as reactive refs.
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const email: Ref<string> = ref("");
    const password: Ref<string> = ref("");
    const successMessage: Ref<string> = ref("");

    const login = async () => {
      try {
        const res = await api.post("/api/users/login", {
          email: email.value,
          password: password.value,
        });

        console.log(res.data);

        // Save the token and user data in local storage
        localStorage.setItem("token", res.data.token);

        // Set the Authorization header for the axios instance
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;

        // get user profile
        const profileRes = await api.get("/api/users/profile");

        console.log(profileRes.data);

        // save the user profile data in local storage
        localStorage.setItem("user", JSON.stringify(profileRes.data.user));
        localStorage.setItem("firstName", profileRes.data.user.firstName);

        // set the success message
        successMessage.value = "Logged in successfully!";

        // Redirect to the home page
        setTimeout(() => {
          store.commit("setFirstName", profileRes.data.user.firstName);
          store.commit("setUserLoggedIn", true);
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error("Error during login: ", error);
      }
    };
    return {
      email,
      password,
      successMessage,
      login,
    };
  },
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login {
  width: 100%;
  max-width: 400px;
  background-color: #333;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #fff;
  font-size: 20pt;
  margin-bottom: 1.4rem;
  text-align: center;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-size: 11pt;
  color: #fff;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #444;
  color: #fff;
  outline: none;
  box-sizing: border-box;
}

input::placeholder {
  color: #999;
}

button {
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #3d8cf8;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2680f0;
}
.success-message {
  color: rgb(37, 180, 37);
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
