<script setup>
const props = defineProps({
  id: Number,
  image: String,
  name: String,
  link: String,
});

const baseURL = "https://api.b2c.itl.digital";
const fullImageUrl = computed(() => `${baseURL}${props.image}`);
</script>

<template>
  <div class="w-48 mb-4">
    <div
      class="bg-blue-50 container-category w-48 h-32 p-8 flex justify-center items-center mb-8 rounded-md"
    >
      <img :src="fullImageUrl" :alt="name" />
    </div>
  </div>
</template>
