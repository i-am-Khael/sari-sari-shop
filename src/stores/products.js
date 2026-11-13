import { defineStore } from "pinia";

export const useProductsStore = defineStore('useProductsStore', {

  state: () => ({
    apiURI: 'https://sari-sari-shop.infinityfree.io/api/shop',
    storage: 'https://sari-sari-shop.infinityfree.io/storage/',
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
