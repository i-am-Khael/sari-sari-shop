import { defineStore } from "pinia";

export const useProductsStore = defineStore('useProductsStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKey: import.meta.env.VITE_API_KEY,
    storage: import.meta.env.VITE_API_STORAGE,
    headers: {
      'Content-Type': 'application/json'
    },
    products: [],
    featured: [],
  }),

  actions: {

    async getAll() {

      const response = await fetch(`${this.apiURI}/products`, {
        method: 'GET',
        headers: this.headers
      });

      const results = await response.json();

      if (results.status === 200) this.products = results.data;

    },

    async featuredProducts() {

      const response = await fetch(`${this.apiURI}/products/featured`, {
        method: 'GET',
        headers: this.headers
      });

      const results = await response.json();

      if (results.status === 200) this.featured = results.data;

    }

  }

});
