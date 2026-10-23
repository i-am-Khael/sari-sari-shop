import { defineStore } from "pinia";

export const useProfileStore = defineStore('useProfileStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKey: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_KEY
    },
    profile: {}
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
        this.profile = result.data.profile;
        return result;
      }

      return result;

    },


    async saveProfile(data) {

      const response = await fetch(`${this.apiURI}/user/profile/save`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === 200) {
        localStorage.setItem('toast',
          JSON.stringify({
            show: true,
            type: 'success',
            msg: result?.data.msg
          })
        );
      }

      this

      if (result.errors.msg) {
        localStorage.setItem('toast',
          JSON.stringify({
            show: true,
            type: 'error',
            msg: result.errors.msg ?? ''
          })
        );
      }



    },


  }
});
