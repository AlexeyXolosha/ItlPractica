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

<template></template>
