<script setup>
import { ref, onMounted, computed } from "vue";
import { useNuxtApp } from "#app";
import Advantage from "~/components/Advantage.vue";
import HitList from "../components/HitList.vue";
import TabsList from "../components/TabsList.vue";
import CategoryList from "../components/CategoryList.vue";
import BannersSlide from "~/components/Banners/BannersSlide.vue";
import BrandList from "../components/BrandList.vue";
import BannersWide from "~/components/Banners/BannersWide.vue";
import BlogList from "../components/BlogList.vue";
import SaleList from "../components/SaleList.vue";

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
const blog = ref([]);
const brands = ref([]);

const { $apiClient } = useNuxtApp();

async function fetchDataMain(url, massive) {
  try {
    const { data } = await $apiClient.get(url);
    massive.value = data.data;
    // console.log(massive.value);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchHitProduct(url, massive, submassive, filters) {
  try {
    const { data } = await $apiClient.get(url);
    massive.value = data.data;
    // console.log(massive.value);
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
      } catch (error) {
        console.error("Error:", error);
      }
    }
    await fetchProducts();
  } catch (error) {
    console.error("Error:", error);
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
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchBlog() {
  try {
    const { data } = await $apiClient.get("/include/mainpage/blog/");
    blog.value = data.data.map((blog) => ({
      id: blog.id,
      date_active_to: blog.attributes.date_active_to,
      detail_page: blog.attributes.detail_page,
      image: blog.attributes.image,
      section_name: blog.attributes.section_name,
      title: blog.attributes.title,
    }));
  } catch (error) {
    console.error("Error:", error);
  }
}

async function selectedCategoryHit(category) {
  if (category === "null") {
    fetchHitProduct("/include/mainpage/hit/hit/", categoryListHit, hit);
    return;
  }
  try {
    const { data } = await $apiClient.get(category);
    hit.value = data.data;
    console.log(hit.value);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function selectedCategoryStock(category) {
  if (category === "null") {
    fetchHitProduct(
      "/include/mainpage/hit/stock/",
      categoryListStock,
      hitStock
    );
    return;
  }
  try {
    const { data } = await $apiClient.get(category);
    hitStock.value = data.data;
    console.log(hitStock.value);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function selectedCategoryRecommend(category) {
  if (category === "null") {
    fetchHitProduct(
      "/include/mainpage/hit/recommend/",
      categoryListRecommend,
      hitRecommend
    );
    return;
  }
  try {
    const { data } = await $apiClient.get(category);
    hitRecommend.value = data.data;
    console.log(hitRecommend.value);
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

onMounted(() => {
  fetchPopCategoriesMain();
  fetchHitProduct("/include/mainpage/hit/hit/", categoryListHit, hit);
  fetchHitProduct("/include/mainpage/hit/stock/", categoryListStock, hitStock);
  fetchHitProduct(
    "/include/mainpage/hit/recommend/",
    categoryListRecommend,
    hitRecommend
  );
  fetchDataMain("/include/mainpage/sale/", sale);
  fetchDataMain("/include/banners/slider/", slider);
  fetchDataMain("/include/mainpage/advantages/", advantages);
  fetchDataMain("/include/mainpage/brands/", brands);
  fetchBannersWide();
  fetchBlog();
});
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
      <h1 class="text-2xl mb-5">Хиты продаж</h1>
      <tabs-list
        :categoryListHit="categoryListHit"
        @update-category="selectedCategoryHit"
      ></tabs-list>
      <hit-list :products="hit" />
    </div>
    <div class="mb-16">
      <h1 class="text-2xl mb-5">Популярные категории</h1>
      <category-list
        :popularCategoriesMain="popularCategoriesMain"
      ></category-list>
    </div>
    <div class="mb-16">
      <h1 class="text-2xl mb-5">Популярные бренды</h1>
      <brand-list :brands="mainPageBrands"></brand-list>
    </div>
    <div class="mb-16">
      <h1 class="text-2xl mb-5">Распродажа</h1>
      <tabs-list
        :categoryListHit="categoryListStock"
        @update-category="selectedCategoryStock"
      ></tabs-list>
      <hit-list :products="hitStock"></hit-list>
    </div>
    <div class="mb-16">
      <banners-wide :bannersWide="bannersWide" />
    </div>
    <div class="mb-16">
      <h1 class="text-2xl mb-10">Акции</h1>
      <sale-list :sales="sale"></sale-list>
    </div>
    <div class="mb-16">
      <h1 class="text-2xl mb-5">Рекомендуем</h1>
      <tabs-list
        :categoryListHit="categoryListRecommend"
        @update-category="selectedCategoryRecommend"
      ></tabs-list>
      <hit-list :products="hitRecommend"></hit-list>
    </div>
    <div>
      <h1 class="text-2xl mb-5">Блог</h1>
      <blog-list :blog="blog" />
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
