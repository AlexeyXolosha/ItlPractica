<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNuxtApp } from "#app";

import ProductItem from "~/components/product/ProductItem.vue";
import ProductInfo from "~/components/product/ProductInfo.vue";

const { $apiClient } = useNuxtApp();
const route = useRoute();

const product = ref(null);

const categorySlug = route.params.category;
const productSlug = route.params.product;

const fetchProductCatalog = async () => {
  try {
    const response = await $apiClient.get(
      `/catalog/${categorySlug}/${productSlug}/`
    );
    const { data } = response;
    //  console.log("Ответ сервера:", response);
    product.value = response.data.data;
    console.log("Данные о продукте:", product.value);
  } catch (error) {
    console.error("Ошибка при загрузке данных о товаре:", error);
    if (error.response) {
      console.error("Статус ошибки:", error.response.status);
    }
  }
};

const getStickerClass = (stiker) => {
  switch (stiker) {
    case "Хит":
      return "bg-blue-600";
    case "Советуем":
      return "bg-orange-400";
    case "Новинка":
      return "bg-green-600";
    case "Акция":
      return "bg-red-600";
    default:
      return "bg-gray-400";
  }
};

onMounted(fetchProductCatalog);
</script>

<template>
  <div class="wrapper">
    <div class="flex gap-3 items-center mb-4">
      <div>
        <h1>{{ product?.attributes.name }}</h1>
      </div>
      <div>
        <div class="flex gap-2 text-center">
          <div
            v-for="stiker in product?.attributes.stikers?.value"
            :key="stiker"
            class="px-3 rounded"
            :class="getStickerClass(stiker)"
          >
            <span class="text-white">{{ stiker }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-9 mb-16">
      <div class="flex items-center gap-2 mb-1">
        <img src="~/public/estimation.svg" alt="" />
        <span class="text-slate-400">4.8</span>
      </div>
      <div class="flex items-center">
        <p class="text-slate-400">
          Код товара:
          <span class="text-black">{{
            product?.attributes?.properties?.cml2Article?.value
          }}</span>
        </p>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <img src="~/public/srav.svg" alt="" />
          <span>Сравнить</span>
        </div>
        <div class="flex items-center gap-3">
          <img src="~/public/heart_catalog.svg" alt="" />
          <span>Избранное</span>
        </div>
        <div class="flex items-center gap-3">
          <img src="~/public/share.svg" alt="" />
          <span>Поделиться</span>
        </div>
      </div>
    </div>

    <div v-if="product && product.attributes" class="mb-32">
      <product-item :product="product"></product-item>
    </div>
    <div v-if="product && product.attributes">
      <product-info :product="product"></product-info>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1739px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
