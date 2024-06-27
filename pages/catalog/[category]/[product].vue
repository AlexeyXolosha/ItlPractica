<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNuxtApp } from "#app";

import CardItem from "~/components/CardItem.vue";
import ProductItem from "~/components/product/ProductItem.vue";
import ProductInfo from "~/components/product/ProductInfo.vue";
import ProductOrder from "~/components/product/ProductOrder.vue";
import BlogList from "~/components/BlogList.vue";
import { useBlogStore } from "~/stores/blog";

const blogStore = useBlogStore();

const { $apiClient } = useNuxtApp();
const route = useRoute();

const product = ref(null);
const expandables = ref([]);

const categorySlug = route.params.category;
const productSlug = route.params.product;

async function fetchProductCatalog() {
  try {
    const { data } = await $apiClient.get(
      `/catalog/${categorySlug}/${productSlug}/`
    );
    product.value = data.data;
    console.log("Данные о продукте:", product.value);
  } catch (error) {
    console.error("Ошибка при загрузке данных о товаре:", error);
    if (error.response) {
      console.error("Статус ошибки:", error.response.status);
    }
  }
}

async function fetchExpandables() {
  try {
    const { data } = await $apiClient.get(
      `/catalog/${categorySlug}/${productSlug}/relationships/expandables/`
    );
    expandables.value = data.data;
    console.log("Данные о свойствах:", expandables.value);
  } catch (error) {
    console.error("Ошибка при загрузке отзывов:", error);
    if (error.response) {
      console.error("Статус ошибки:", error.response.status);
    }
  }
}

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

provide("product", product);

onMounted(() => {
  fetchProductCatalog();
  fetchExpandables();
  blogStore.fetchBlog();
});
</script>

<template>
  <div class="wrapper">
    <!--HeaderInfoBlock-->
    <div class="flex gap-3 items-center mb-4">
      <div>
        <h1 class="text-3xl">{{ product?.attributes.name }}</h1>
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

    <!--subHeaderInfoBlock-->
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

    <div class="flex gap-24">
      <div class="wrapper--info">
        <div v-if="product && product?.attributes" class="mb-16">
          <product-item :product="product"></product-item>
        </div>
        <div v-if="product && product?.attributes">
          <product-info :product="product"></product-info>
        </div>
      </div>
      <div v-if="product && product?.attributes">
        <product-order :product="product"></product-order>
      </div>
    </div>

    <div v-if="expandables && expandables.length > 0" class="mb-16">
      <h1 class="text-lg mb-10">С этим товаром покупают</h1>
      <div class="flex items-center gap-6">
        <div v-for="expandable in expandables" :key="expandable.id">
          <card-item
            :image="expandable.attributes.image"
            :name="expandable.attributes.name"
            :count-shop="expandable.attributes.product.stores.count.title"
            :value-formatted="
              expandable.attributes.product.price.valueFormatted
            "
            :stikers="expandable.attributes.stikers"
            :links="expandable.links.self"
          />
        </div>
      </div>
    </div>

    <div>
      <h1 class="text-2xl mb-5">Блог</h1>
      <blog-list :blog="blogStore.blog" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1739px;
  padding: 0 15px;
  margin: 0 auto;
}

.wrapper--info {
  max-width: 1200px;
  padding: 0 15px;
}
</style>
