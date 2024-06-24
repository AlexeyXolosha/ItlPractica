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
  <div>
    <img :src="fullImageUrl" alt="" class="rounded" />
    <div>
      <h1 class="text-lg mb-3">{{ title }}</h1>
      <div>
        <p class="text-sm text-slate-400">{{ section_name }}</p>
      </div>
    </div>
  </div>
</template>
