<script setup>
import SaleItems from "./SaleItems.vue";

const props = defineProps({
  sales: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="flex gap-8">
    <sale-items
      v-for="sale in sales.slice(0, 4)"
      :key="sale.id"
      :active_period="sale.attributes.active_period"
      :discount="sale.attributes.discount"
      :title="sale.attributes.title"
      :image="sale.attributes.image"
      :links="sale.links.self"
    ></sale-items>
  </div>
</template>
