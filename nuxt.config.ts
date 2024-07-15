// nuxt.config.js

export default defineNuxtConfig({
  plugins: ["@/plugins/apiClient.js", "@/plugins/pinia.js"],
  modules: ["nuxt-swiper"],
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
