import { defineStore } from "pinia";

export const useAddressStore = defineStore('useAddressStore', {

  state: () => ({
    uri: 'https://psgc.gitlab.io/api/',
    loading: {
      regions: false,
      provinces: false,
      municipalities: false,
      brgys: false
    },
    regions: [],
    provinces: [],
    municipalities: [],
    brgys: []
  }),

  actions: {

    async getRegions() {
      this.loading.regions = true;

      const response = await fetch(`${this.uri}regions`, {
        method: 'GET'
      });

      const result = await response.json();
      this.regions = result;

      this.loading.regions = false;
    },

    async getProvinces(regionCode) {
      this.loading.provinces = true;

      const response = await fetch(`${this.uri}regions/${regionCode}/provinces`, {
        method: 'GET'
      });

      const result = await response.json();
      this.provinces = result;

      this.loading.provinces = false;
    },

    async getMunicipalities(provinceCode) {
      this.loading.municipalities = true;

      const response = await fetch(`${this.uri}provinces/${provinceCode}/municipalities`, {
        method: 'GET'
      });

      const result = await response.json();
      this.municipalities = result;

      this.loading.municipalities = false;
    },

    async getBrgys(municipalityCode) {
      this.loading.brgys = true;

      const response = await fetch(`${this.uri}municipalities/${municipalityCode}/barangays`, {
        method: 'GET'
      });

      const result = await response.json();
      this.brgys = result;

      this.loading.brgys = false;
    }

  }

});
