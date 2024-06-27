<script setup>
import ProductTabs from "./ProductTabs.vue";
import ProductTizers from "./ProductTizers.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

console.log("ProductInfo props:", props.product.attributes.tabs);
</script>

<template>
  <product-tabs :tabs="product?.attributes?.tabs" />
  <div class="mb-8">
    <h1 id="part-0" class="text-xl font-semibold mb-2">Описание</h1>
    <p v-html="product?.attributes?.description"></p>
  </div>

  <div>
    <div class="flex flex-col gap-4 items-center mb-9">
      <div
        v-for="(detailstabs, index) in product?.attributes?.tabs"
        :key="index"
        :id="'tab-' + index"
        class="product__details"
      >
        <div v-html="detailstabs.info"></div>
      </div>
    </div>
    <div class="w-full mb-16" id="part-1">
      <h1 class="text-xl font-semibold mb-3">Характеристики</h1>
      <ul class="flex flex-col gap-4">
        <li
          v-for="property in product?.attributes?.properties"
          :key="property.name"
          class="flex items-center gap-9"
        >
          {{ property.name }}
          <div class="flex-1 border-b border-dashed"></div>
          {{ property.value }}
        </li>
      </ul>
    </div>
    <div class="mb-16">
      <product-tizers />
    </div>
  </div>
</template>

<style>
.product__details {
  width: 100%;
}

.product__details h3 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
}

.product__details h4 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.product__details ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: disc;
  margin-left: 20px;
  margin-bottom: 20px;
}

.product__details p {
  margin-bottom: 20px;
}

.product__details table {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.product__details tr:first-child {
  font-weight: 500;
}

.product__details td {
  padding: 10px 10px;
  border-bottom: 1px solid #ccc;
}
</style>
