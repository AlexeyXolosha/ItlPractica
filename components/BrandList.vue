<script setup>
import BrandItem from "./BrandItem.vue";

const props = defineProps({
  brands: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="flex justify-between gap-4">
    <brand-item
      v-for="brand in brands"
      :key="brand.id"
      :id="brand.id"
      :image="brand.image"
      :name="brand.name"
      :link="brand.url"
    />
  </div>
</template>
