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
    <a :href="link">
      <div
        class="bg-blue-50 container-category w-48 h-48 p-8 flex justify-center items-center mb-8 rounded"
      >
        <img :src="fullImageUrl" :alt="name" class="w-32 h-32" />
      </div>
    </a>
    <p class="text-center">{{ name }}</p>
  </div>
</template>
