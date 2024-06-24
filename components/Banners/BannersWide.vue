<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  bannersWide: {
    type: Array,
    required: true,
  },
});

const baseURL = "https://api.b2c.itl.digital";
const getImageUrl = (imagePath) => `${baseURL}${imagePath}`;
</script>

<template>
  <div>
    <div v-for="banner in bannersWide" :key="banner.id">
      <img :src="getImageUrl(banner.image)" :alt="banner.name" />
    </div>
  </div>
</template>
