<script setup>
import BlogItem from "./BlogItem.vue";
const props = defineProps({
  blog: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="flex gap-4 justify-between">
    <blog-item
      v-for="post in blog"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :section_name="post.section_name"
      :image="post.image"
      :link="post.link"
    />
  </div>
</template>
