<script setup>
import CardItem from "./CardItem.vue";
import "swiper/css";
import "swiper/css/navigation";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <swiper
    :modules="[SwiperNavigation, SwiperAutoplay]"
    :slides-per-view="6"
    :space-between="90"
    :loop="true"
    :navigation="true"
    :simulate-touch="false"
    :allow-touch-move="false"
  >
    <swiper-slide
      v-for="product in products"
      :key="product.id"
      style="width: 280px"
    >
      <card-item
        :key="product.id"
        :image="product.attributes.image"
        :name="product.attributes.name"
        :count-shop="product.attributes.product.stores.count.title"
        :value-formatted="product.attributes.product.price.valueFormatted"
        :stikers="product.attributes.stikers"
        :links="product.links.self"
      />
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.swiper-container {
  position: relative;
}

.swiper-slide {
  width: 280px !important;
  margin-right: 20px !important;
}

.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 4px;
}

.swiper-button-prev {
  left: 0;
}

.swiper-button-next {
  right: 0;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 30px;
  color: rgb(37, 99, 235); /* Изменение цвета стрелки */
}
</style>
