import { defineStore } from "pinia";
import { login, getUserProfile } from "@/api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("access_token") || null
  }),
  actions: {
    async fetchUser() {
      if (!this.token) return;
      try {
        const response = await getUserProfile(this.token);
        this.user = response.data;
      } catch (error) {
        console.error("Fetching user failed", error);
        this.signOut();
      }
    },

    async signIn(credentials) {
      try {
        const response = await login(credentials);
        const token = response.data.access_token;

        this.token = token;
        localStorage.setItem("access_token", token);
        await this.fetchUser();
      } catch (error) {
        this.error = error.message || "Login failed"; // Handle errors
        throw error;
      }
    },

    signOut() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("access_token");
    },
    checkAuth() { // Check authentication on app load (e.g., in main.js)
      const token = localStorage.getItem('token');
      if (token) {
          this.token = token;
          this.isAuthenticated = true; // Or verify with API if needed
          // Optionally fetch and set user details here.
      }
  },
  },
});
