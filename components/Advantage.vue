<script setup>
const props = defineProps({
  advantagesList: {
    type: Array,
    required: true,
  },
});

const baseURL = "https://api.b2c.itl.digital";
const getImageUrl = (imagePath) => `${baseURL}${imagePath}`;
</script>

<template>
  <div class="flex gap-8">
    <div
      class="bg-white flex rounded items-center justify-between gap-4 py-5 px-7"
      v-for="advantage in advantagesList"
      :key="advantage.id"
    >
      <img :src="getImageUrl(advantage.attributes.image)" alt="" />
      <p v-html="advantage.attributes.text"></p>
    </div>
  </div>
</template>
