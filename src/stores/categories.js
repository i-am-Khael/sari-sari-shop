import { defineStore } from "pinia";

export const useCategoriesStore = defineStore('useCategoriesStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKey: import.meta.env.VITE_API_KEY,
    storage: import.meta.env.VITE_API_STORAGE,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_KEY
    },
    categories: [],
  }),

  actions: {

    async popularCategories() {

      const response = await fetch(`${this.apiURI}/categories/all`, {
        method: 'GET',
        headers: this.headers
      });

      const results = await response.json();

      if (results.status === 200) this.categories = results.data;

    }

  }

});
