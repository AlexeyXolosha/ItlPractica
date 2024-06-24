import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const apiClient = axios.create({
    baseURL: "https://api.b2c.itl.digital",
    headers: {
      "Content-Type": "application/json",
    },
  });
  nuxtApp.provide("apiClient", apiClient);
});
