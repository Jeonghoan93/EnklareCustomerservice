<template>
  <div class="register-container">
    <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="firstName" required />
        </div>
        <div class="input-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="lastName" required />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        await api.post("/api/users/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        });

        // alert the user that registration was successful
        alert("Registration successful! Redirecting to the login page.");

        // direct to the login page
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } catch (error) {
        console.error("Error during registration", error);
      }
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.register {
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
  color: green;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
