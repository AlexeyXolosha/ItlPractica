<script setup>
import ProductTabs from "./ProductTabs.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

console.log("ProductInfo props:", props.product.attributes.tabs);
</script>

<template>
  <product-tabs />
  <div>
    <p v-html="product?.attributes?.description"></p>
  </div>

  <div>
    <div class="flex flex-col gap-4 items-center">
      <div v-for="tab in product?.attributes?.tabs">
        <div v-html="tab.info"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
