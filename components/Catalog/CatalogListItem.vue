<script setup>
import CardItem from "../CardItem.vue";
import { defineProps } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="grid grid-cols-5 w-full gap-6 p-3">
    <CardItem
      v-for="item in items"
      :key="item.id"
      :image="item.attributes.preview"
      :name="item.attributes.name"
      :count-shop="item.attributes.product.stores?.count?.title"
      :value-formatted="item.attributes.product.price?.valueFormatted"
      :basePrice="item.attributes.product.basePrice?.valueFormatted"
      :links="item.links.self"
      :stikers="item.attributes.stikers"
    />
  </div>
</template>
