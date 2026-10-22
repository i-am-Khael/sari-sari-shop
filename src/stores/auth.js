import { defineStore } from "pinia";

export const useAuthStore = defineStore('useAuthStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKey: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_KEY
    },
    isLoading: false,
    isAuth: false,
    toast: {
      show: false,
      type: '',
      msg: ''
    },
    errors: {},
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

      this.isLoading = true;

      const response = await fetch(`${this.apiURI}/auth/register`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === 201) {
        this.toast.show = true;
        this.toast.type = 'success';
        this.toast.msg = result.data.msg;
        this.timeout();
        this.profile = result.data.profile;
        return result;
      }

      this.isLoading = false;

      this.errors = result.errors;
      this.timeout();

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
        this.timeout();
        return result;
      }

      this.profile = result.data.profile;
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
        localStorage.clear();
        this.isAuth = result.data.authenticated;
        return result;
      }

    },

    timeout(time = 2500) {
      setTimeout(() => {
        this.toast.show = false;
        this.toast.type = '';
        this.toast.msg = '';
        this.errors = [];
      }, time);
    }

  }

});
