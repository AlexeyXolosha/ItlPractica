<script setup>
import { ref, onMounted, computed } from "vue";
import { useNuxtApp } from "#app";
import { useBlogStore } from "~/stores/blog";

import Advantage from "~/components/Advantage.vue";
import HitList from "../components/HitList.vue";
import TabsList from "../components/TabsList.vue";
import CategoryList from "../components/CategoryList.vue";
import BrandList from "../components/BrandList.vue";
import BannersWide from "~/components/Banners/BannersWide.vue";
import BlogList from "../components/BlogList.vue";
import SaleList from "../components/SaleList.vue";
import SkeletonList from "~/components/SkeletonList.vue";
import SkeletonCategoryList from "~/components/SkeletonCategoryList.vue";

const blogStore = useBlogStore();

const slider = ref([]);
const advantages = ref([]);
const hit = ref([]);
const hitStock = ref([]);
const hitRecommend = ref([]);
const categoryListHit = ref([]);
const categoryListStock = ref([]);
const categoryListRecommend = ref([]);
const popularCategoriesMain = ref([]);
const sale = ref([]);
const bannersWide = ref([]);
const brands = ref([]);

const loading = ref({
  hit: true,
  stock: true,
  recommend: true,
  main: true,
});

const { $apiClient } = useNuxtApp();

async function fetchDataMain(url, massive, key) {
  try {
    const { data } = await $apiClient.get(url);
    massive.value = data.data;
    //   console.log(massive.value);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loading.value[key] = false;
  }
}

async function fetchHitProduct(url, massive, submassive, filters, key) {
  try {
    const { data } = await $apiClient.get(url);
    massive.value = data.data;
    const allProducts = [];

    async function fetchProducts() {
      const requests = massive.value.map((category) =>
        $apiClient.get(category.links.self)
      );
      try {
        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          allProducts.push(...response.data.data);
        });
        submassive.value = allProducts;

        //console.log(submassive.value);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        loading.value[key] = false;
      }
    }
    await fetchProducts();
  } catch (error) {
    console.error("Error:", error);
    loading.value[key] = false;
  }
}

async function fetchPopCategoriesMain() {
  try {
    const { data } = await $apiClient.get(
      "/include/mainpage/popular-category/"
    );
    popularCategoriesMain.value = data.data.slice(0, 8);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loading.value.main = false;
  }
}

async function fetchBannersWide() {
  try {
    const { data } = await $apiClient.get("/include/banners/wide");
    bannersWide.value = data.data.map((bannerwide) => ({
      id: bannerwide.id,
      name: bannerwide.attributes.name,
      image: bannerwide.attributes.images.preview,
    }));
    //console.log(bannersWide.value);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function selectedCategoryHit(category) {
  if (category === "null") {
    fetchHitProduct(
      "/include/mainpage/hit/hit/",
      categoryListHit,
      hit,
      null,
      "hit"
    );
    return;
  }
  try {
    const { data } = await $apiClient.get(category);
    hit.value = data.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function selectedCategoryStock(category) {
  if (category === "null") {
    fetchHitProduct(
      "/include/mainpage/hit/stock/",
      categoryListStock,
      hitStock,
      null,
      "stock"
    );
    return;
  }
  try {
    const { data } = await $apiClient.get(category);
    hitStock.value = data.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function selectedCategoryRecommend(category) {
  if (category === "null") {
    fetchHitProduct(
      "/include/mainpage/hit/recommend/",
      categoryListRecommend,
      hitRecommend,
      null,
      "recommend"
    );
    return;
  }
  try {
    const { data } = await $apiClient.get(category);
    hitRecommend.value = data.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

const mainPageBrands = computed(() =>
  brands.value.slice(0, 8).map((brand) => ({
    id: brand.id,
    name: brand.attributes.main_page.name,
    image: brand.attributes.main_page.image,
    url: brand.attributes.main_page.url,
  }))
);

fetchPopCategoriesMain();
fetchHitProduct(
  "/include/mainpage/hit/hit/",
  categoryListHit,
  hit,
  null,
  "hit"
);
fetchHitProduct(
  "/include/mainpage/hit/stock/",
  categoryListStock,
  hitStock,
  null,
  "stock"
);
fetchHitProduct(
  "/include/mainpage/hit/recommend/",
  categoryListRecommend,
  hitRecommend,
  null,
  "recommend"
);
fetchDataMain("/include/mainpage/sale/", sale, "main");
fetchDataMain("/include/banners/slider/", slider, "main");
fetchDataMain("/include/mainpage/advantages/", advantages, "main");
fetchDataMain("/include/mainpage/brands/", brands, "main");
fetchBannersWide();
blogStore.fetchBlog();
</script>

<template>
  <div class="mb-16 py-9 bg-blue-50 w-full">
    <div class="wrapper">
      <banners-slide class="mb-8" :bannerSlide="slider" />
      <advantage :advantagesList="advantages" />
    </div>
  </div>
  <div class="wrapper">
    <div class="mb-16">
      <h1 class="text-2xl mb-4">Хиты продаж</h1>
      <tabs-list
        :categoryListHit="categoryListHit"
        @update-category="selectedCategoryHit"
      ></tabs-list>
      <div v-if="loading.hit">
        <skeleton-list />
      </div>
      <div v-else>
        <hit-list :products="hit" />
      </div>
    </div>
    <div class="mb-16">
      <h1 class="text-2xl mb-10">Популярные категории</h1>
      <div v-if="loading.main">
        <skeleton-category-list />
      </div>
      <div v-else>
        <category-list :popularCategoriesMain="popularCategoriesMain" />
      </div>
    </div>
    <div class="mb-16">
      <h1 class="text-2xl mb-10">Популярные бренды</h1>
      <div v-if="loading.main">
        <skeleton-category-list />
      </div>
      <div v-else>
        <brand-list :brands="mainPageBrands"></brand-list>
      </div>
    </div>
    <div class="mb-16">
      <h1 class="text-2xl mb-4">Распродажа</h1>
      <tabs-list
        :categoryListHit="categoryListStock"
        @update-category="selectedCategoryStock"
      ></tabs-list>
      <div v-if="loading.stock">
        <skeleton-list />
      </div>
      <div v-else>
        <hit-list :products="hitStock"></hit-list>
      </div>
    </div>
    <div class="mb-16">
      <banners-wide :bannersWide="bannersWide" />
    </div>
    <div class="mb-16">
      <h1 class="text-2xl mb-10">Акции</h1>
      <sale-list :sales="sale"></sale-list>
    </div>
    <div class="mb-16">
      <h1 class="text-2xl mb-4">Рекомендуем</h1>
      <tabs-list
        :categoryListHit="categoryListRecommend"
        @update-category="selectedCategoryRecommend"
      ></tabs-list>
      <div v-if="loading.recommend">
        <skeleton-list />
      </div>
      <div v-else>
        <hit-list :products="hitRecommend"></hit-list>
      </div>
    </div>
    <div>
      <h1 class="text-2xl mb-10">Блог</h1>
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
</style>
