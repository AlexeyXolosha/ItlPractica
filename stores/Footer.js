import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export const useFooterStore = defineStore("footer", {
  state: () => ({
    stores: [],
    menu: [],
    info: [],
    phones: [],
    socialMedia: [],
  }),
  actions: {
    async fetchData(url, key) {
      const { $apiClient } = useNuxtApp();
      try {
        const { data } = await $apiClient.get(url);
        this[key] = data;
        console.log(this[key]);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async fetchStores() {
      await this.fetchData("/include/menu/stores/", "stores");
    },
    async fetchMenu() {
      await this.fetchData("/include/menu/footer/", "menu");
    },
    async fetchInfo() {
      await this.fetchData("/include/menu/info/", "info");
    },
    async fetchPhones() {
      await this.fetchData("/include/static-info/phone/", "phones");
    },
    async fetchSocialMedia() {
      await this.fetchData("/include/static-info/social-media/", "socialMedia");
    },
    async fetchAllFooterData() {
      await Promise.all([
        this.fetchStores(),
        this.fetchMenu(),
        this.fetchInfo(),
        this.fetchPhones(),
        this.fetchSocialMedia(),
      ]);
    },
  },
});
