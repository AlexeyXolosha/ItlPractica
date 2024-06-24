<script setup>
const props = defineProps({
  bannersCatalog: {
    type: Array,
    default: () => [],
  },
});

const baseURL = "https://api.b2c.itl.digital";
const getImageUrl = (imagePath) => `${baseURL}${imagePath}`;
</script>

<template>
  <div class="mb-16 py-9 bg-blue-50 w-full">
    <div
      v-for="banner in bannersCatalog"
      :key="banner.id"
      class="flex items-center justify-between px-14"
    >
      <div>
        <p class="text-3xl">{{ banner.attributes.text.title }}</p>
      </div>
      <div>
        <img
          :src="getImageUrl(banner.attributes.images.preview)"
          alt=""
          class="w-80"
        />
      </div>
    </div>
  </div>
</template>
