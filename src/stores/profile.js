import { defineStore } from "pinia";

export const useProfileStore = defineStore('useProfileStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKey: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_KEY
    },
    profile: []
  }),

  actions: {

    async getProfile(id) {

      const response = await fetch(`${this.apiURI}/user/profile`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({ 'id': id })
      });

      const result = await response.json();

      if (result.status === 200) {
        this.profile = result.data;
        return result;
      }

      return result;

    }

  }

});
