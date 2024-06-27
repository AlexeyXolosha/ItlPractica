<script setup>
const product = inject("product");

const baseURL = "https://api.b2c.itl.digital";
const getImageUrl = (imagePath) => `${baseURL}${imagePath}`;
</script>

<template>
  <div class="flex justify-between gap-5">
    <div
      v-for="tizer in product?.attributes?.tizers.slice(0, 3)"
      class="border border-slate-200 w-full"
    >
      <div class="flex items-center px-6 py-6 gap-4">
        <img :src="getImageUrl(tizer.images?.preview)" alt="" class="w-8 h-8" />
        <p v-html="tizer.attributes.name"></p>
      </div>
    </div>
  </div>
</template>
