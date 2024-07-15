<script setup>
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
    :slides-per-view="6"
    :modules="[SwiperNavigation]"
    :navigation="true"
    :loop="false"
    :space-between="24"
    :watch-overflow="true"
  >
    <swiper-slide v-for="product in products" :key="product.id">
      <card-item
        :key="product.id"
        :image="product.attributes.image"
        :name="product.attributes.name"
        :count-shop="product.attributes.product.stores.count.title"
        :value-formatted="product.attributes.product.price.valueFormatted"
        :basePrice="product.attributes.product.basePrice?.valueFormatted"
        :stikers="product.attributes.stikers"
        :links="product.links.self"
      />
    </swiper-slide>
  </swiper>
</template>

<style scoped></style>
