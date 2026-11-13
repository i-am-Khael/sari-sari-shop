import { defineStore } from "pinia";

export const useCategoriesStore = defineStore('useCategoriesStore', {

  state: () => ({
    apiURI: 'https://sari-sari-shop.infinityfree.io/api/shop',
    storage: 'https://sari-sari-shop.infinityfree.io/storage/',
    headers: {
      'Content-Type': 'application/json'
    },
    categories: [],
  }),

  actions: {

    async popularCategories() {

      const response = await fetch(`${this.apiURI}/categories`, {
        method: 'GET',
        headers: this.headers
      });

      const results = await response.json();

      if (results.status === 200) this.categories = results.data;

    }

  }

});
