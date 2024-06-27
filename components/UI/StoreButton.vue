<template>
  <button
    class="flex justify-center items-center gap-4 bg-yellow-300 py-3 px-5 cursor-pointer rounded whitespace-nowrap"
  >
    <img v-if="imageSrc" :src="imageSrc" alt="Button Image" />
    <a>
      <slot></slot>
    </a>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  imageSrc: String,
});
</script>
