import { defineStore } from "pinia";

export const useAuthStore = defineStore('useAuthStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKey: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_KEY
    },
    isAuth: false,
    errors: [],
  }),

  actions: {

    async checkAuth() {

      const response = await fetch(`${this.apiURI}/auth/check`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include'
      });

      const result = await response.json();

      if (!response.ok || result.status !== 200) return false;

      this.isAuth = result.data.authenticated;

      return result.data.authenticated;

    },

    async register(data) {

      const response = await fetch(`${this.apiURI}/auth/register`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status !== 200) {
        this.errors = result.errors;
        this.removeErrorMsg();
        return;
      }

      return result;

    },


    async login(data) {

      const response = await fetch(`${this.apiURI}/auth/login`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status !== 200) {
        this.errors = result.errors;
        this.removeErrorMsg();
        return;
      }

      return result;

    },


    async logout() {

      const response = await fetch(`${this.apiURI}/auth/logout`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok) {
        this.isAuth = result.data.authenticated;
        return result;
      }

    },

    removeErrorMsg() {
      setTimeout(() => {
        this.errors = [];
      }, 2000);
    }

  }

});
