import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blog: [],
    loading: false,
  }),

  actions: {
    async fetchBlog() {
      this.loading = true;
      const { $apiClient } = useNuxtApp();
      try {
        const { data } = await $apiClient.get("/include/mainpage/blog/");
        this.blog = data.data.map((blog) => ({
          id: blog.id,
          date_active_to: blog.attributes.date_active_to,
          detail_page: blog.attributes.detail_page,
          image: blog.attributes.image,
          section_name: blog.attributes.section_name,
          title: blog.attributes.title,
        }));
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
