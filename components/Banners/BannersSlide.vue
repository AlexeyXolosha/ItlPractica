<script setup>
const props = defineProps({
  bannerSlide: {
    type: Array,
    required: true,
  },
});

const baseURL = "https://api.b2c.itl.digital";
const getImageUrl = (imagePath) => `${baseURL}${imagePath}`;
</script>

<template>
  <Swiper
    :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination]"
    :slides-per-view="1"
    :effect="'fade'"
    :loop="bannerSlide.length > 1"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: true,
    }"
    :pagination="{ clickable: true }"
  >
    <SwiperSlide v-for="slide in bannerSlide" :key="slide.id">
      <div class="bg-yellow-400 flex w-full items-center h-72 overflow-hidden">
        <div class="flex flex-col flex-grow p-5">
          <h1 class="text-3xl mb-9 w-1/2">{{ slide.attributes.name }}</h1>
          <p class="slider-subtitle">{{ slide.attributes.text.text }}</p>
        </div>
        <div class="flex-shrink-0 w-1/3 h-full relative overflow-hidden">
          <img
            :src="getImageUrl(slide.attributes.images.preview)"
            alt=""
            class="w-full h-full object-contain"
          />
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.slider-subtitle {
  width: 522px;
  color: #005ccc;
}
</style>
