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
const banners = ref([]);
const bannersWide = ref([]);
const blog = ref([]);
const brands = ref([]);
const items = ref([]);

const { $apiClient } = useNuxtApp();

async function fetchItems() {
  try {
    const { data } = await $apiClient.get(
      "/catalog/elektronika/?include=items,filter,reviews-statistics,sections"
    );
    items.value = data.data;
    //console.log(items.value);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchDataMain(url, massive) {
  try {
    const { data } = await $apiClient.get(url);
    massive.value = data.data;
    console.log(massive.value);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchHit() {
  try {
    const { data } = await $apiClient.get("/include/mainpage/hit/hit/");
    categoryListHit.value = data.data;
    const allProducts = [];

    async function fetchProducts() {
      const requests = categoryListHit.value.map((category) =>
        $apiClient.get(category.links.self)
      );
      try {
        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          allProducts.push(...response.data.data);
        });
        hit.value = allProducts;
      } catch (error) {
        console.error("Error:", error);
      }
    }
    await fetchProducts();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchBannersSlider() {
  try {
    const { data } = await $apiClient.get("/include/banners/slider/");
    slider.value = data.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchAdvantages() {
  try {
    const { data } = await $apiClient.get("/include/mainpage/advantages/");
    advantages.value = data.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchHitStock() {
  try {
    const { data } = await $apiClient.get("/include/mainpage/hit/stock/");
    categoryListStock.value = data.data;

    const allProducts = [];

    async function fetchProducts() {
      const requests = categoryListStock.value.map((category) =>
        $apiClient.get(category.links.self)
      );
      try {
        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          allProducts.push(...response.data.data);
        });
        hitStock.value = allProducts;
      } catch (error) {
        console.error("Error:", error);
      }
    }
    await fetchProducts();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchHitRecommend() {
  try {
    const { data } = await $apiClient.get("/include/mainpage/hit/recommend/");
    categoryListRecommend.value = data.data;
    const allProducts = [];

    async function fetchProducts() {
      const requests = categoryListRecommend.value.map((category) =>
        $apiClient.get(category.links.self)
      );
      try {
        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          allProducts.push(...response.data.data);
        });
        hitRecommend.value = allProducts;
      } catch (error) {
        console.error("Error:", error);
      }
    }
    await fetchProducts();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchBanners() {
  try {
    const { data } = await $apiClient.get("/include/banners/banner-with-text/");
    banners.value = data.data;
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

async function fetchBrands() {
  try {
    const { data } = await $apiClient.get("/include/mainpage/brands/");
    brands.value = data.data;
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

const mainPageBrands = computed(() =>
  brands.value.slice(0, 8).map((brand) => ({
    id: brand.id,
    name: brand.attributes.main_page.name,
    image: brand.attributes.main_page.image,
    url: brand.attributes.main_page.url,
  }))
);

onMounted(() => {
  fetchDataMain("/include/mainpage/sale/", sale);
  fetchItems();
  fetchBannersSlider();
  fetchAdvantages();
  fetchHit();
  fetchHitStock();
  fetchHitRecommend();
  fetchBanners();
  fetchPopCategoriesMain();
  fetchBrands();
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
      <tabs-list :categoryListHit="categoryListHit"></tabs-list>
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
      <tabs-list :categoryListHit="categoryListStock"></tabs-list>
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
      <tabs-list :categoryListHit="categoryListRecommend"></tabs-list>
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
