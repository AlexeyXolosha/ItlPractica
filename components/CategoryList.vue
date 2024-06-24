<script setup>
import CategoryItem from "./CategoryItem.vue";

const props = defineProps({
  popularCategoriesMain: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="flex gap-4 justify-between">
    <category-item
      v-for="category in popularCategoriesMain"
      :key="category.id"
      :name="category.attributes.name"
      :image="category.attributes.images.preview"
      :link="category.links.self"
    />
  </div>
</template>
