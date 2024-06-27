<script setup>
import { defineProps } from "vue";

const props = defineProps({
  id: Number,
  title: String,
  section_name: String,
  image: String,
  link: String,
});

const baseURL = "https://api.b2c.itl.digital";
const fullImageUrl = computed(() => `${baseURL}${props.image}`);
</script>

<template>
  <div class="w-full">
    <div class="mb-4">
      <img :src="fullImageUrl" alt="" class="rounded" />
    </div>
    <div>
      <p class="text-black">{{ title }}</p>
      <p class="text-slate-400">{{ section_name }}</p>
    </div>
  </div>
</template>
