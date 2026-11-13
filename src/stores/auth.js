import { defineStore } from "pinia";

export const useAuthStore = defineStore('useAuthStore', {

  state: () => ({
    apiURI: 'https://sari-sari-shop.infinityfree.io/api/shop',
    apiKey: 'https://sari-sari-shop.infinityfree.io/storage/',
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
        headers: {
          'Access-Control-Allow-Origin': 'https://sari-sari-shop.michaelcasals.dev/',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const result = await response.json();

      if (!response.ok) return false;

      this.isAuth = result.data.authenticated;

      return result.data.authenticated;

    },


    async loadCSRF() {

      sessionStorage.removeItem('csrf');

      const response = await fetch(`${this.apiURI}/auth/csrf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) return;

      const result = await response.json();
      const csrf = result.data.csrf;

      sessionStorage.setItem('csrf', csrf);

    },


    async register(data) {

      const response = await fetch(`${this.apiURI}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': sessionStorage.getItem('csrf')
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        this.errors = result?.errors;
        this.timeout();
        return result;
      }

      sessionStorage.setItem('uid', result.data.id);
      sessionStorage.setItem('csrf', result.data.csrf);
      sessionStorage.setItem('bearer', result.data.bearer);

      return result;

    },


    async login(data) {

      const response = await fetch(`${this.apiURI}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': sessionStorage.getItem('csrf')
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        this.errors = result.errors;
        this.timeout();
        return result;
      }

      sessionStorage.setItem('uid', result.data.id);
      sessionStorage.setItem('csrf', result.data.csrf);
      sessionStorage.setItem('bearer', result.data.bearer);

      return result;

    },


    async logout() {

      const response = await fetch(`${this.apiURI}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': sessionStorage.getItem('csrf'),
          'Authorization': `Bearer ${sessionStorage.getItem('bearer')}`
        },
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.clear();
        this.isAuth = result.data.authenticated;
        await this.loadCSRF();
        return result;
      }

      return result;

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
