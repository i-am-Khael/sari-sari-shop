import { defineStore } from "pinia";

export const useProfileStore = defineStore('useProfileStore', {

  state: () => ({
    apiURI: 'https://sari-sari-shop.infinityfree.io/api/shop',
    apiKey: 'https://sari-sari-shop.infinityfree.io/storage',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '',
      'X-CSRF-Token': ''
    },
    toast: {
      show: false,
      type: '',
      msg: ''
    },
    errors: {},
    profile: {}
  }),

  actions: {

    async getProfile(id) {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      this.headers["X-CSRF-Token"] = sessionStorage.getItem('csrf');

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

    },


    async saveProfile(data) {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      this.headers["X-CSRF-Token"] = sessionStorage.getItem('csrf');

      const response = await fetch(`${this.apiURI}/user/profile/save`, {
        method: 'PATCH',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {

        this.showToast('success', result.data.msg);

      } else {

        if (result.errors.msg) this.showToast('error', result.errors.msg);

        this.errors = result.errors ?? {};

      }

      this.hideToastAndErrors();

      return result;

    },

    showToast(type, msg) {
      this.toast.show = true;
      this.toast.type = type;
      this.toast.msg = msg;
    },

    hideToastAndErrors() {
      setTimeout(() => {
        this.toast.show = false;
        this.toast.type = '';
        this.toast.msg = '';
        this.errors = {};
      }, 2500);
    }

  }
});
