<script setup>
import CardItemSkeleton from "./layout/CardItemSkeleton.vue";
import "swiper/css";
import "swiper/css/navigation";
</script>

<template>
  <div class="flex items-center gap-5 overflow-hidden">
    <CardItemSkeleton />
    <CardItemSkeleton />
    <CardItemSkeleton />
    <CardItemSkeleton />
    <CardItemSkeleton />
    <CardItemSkeleton />
  </div>
</template>
