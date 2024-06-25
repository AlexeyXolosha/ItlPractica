<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useNuxtApp } from "#app";
import { useCatalogStore } from "~/stores/CatalogStore";
import BannersSlideCatalog from "~/components/Banners/BannersCatalog.vue";
import Pagination from "~/components/Pagination.vue";
import CatalogCard from "~/components/Catalog/CatalogCard.vue";
import FilterCatalog from "~/components/Catalog/FilterCatalog.vue";
import CatalogListItem from "~/components/Catalog/CatalogListItem.vue";

const route = useRoute();
const { $apiClient } = useNuxtApp();
const category = ref(null);
const items = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");
const childrenCategories = ref([]);
const filters = ref([]);
const bannersCatalog = ref([]);

const catalogStore = useCatalogStore();

async function fetchBannersCatalog() {
  try {
    const { data } = await $apiClient.get("/include/banners/wide-catalog/");
    bannersCatalog.value = data.data;
  } catch (error) {
    console.error("Ошибка при получении баннеров каталога:", error);
  }
}

const fetchCategoryData = async (slug) => {
  try {
    const response = await $apiClient.get(
      `/catalog/${slug}/?include=items,filter,reviews-statistics,sections`
    );
    const { data } = response;
    return data.data;
  } catch (error) {
    console.error("Ошибка при получении данных категории:", error);
    errorMessage.value = "Не удалось получить данные категории.";
    return null;
  }
};

const fetchItemsData = async (itemsUrl) => {
  try {
    const { data } = await $apiClient.get(itemsUrl);
    return data.data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    errorMessage.value = "Ошибка при получении данных.";
  }
};

const findChildrenCategories = (parentId) => {
  if (!catalogStore.catalogList || !catalogStore.catalogList.length) return [];
  return catalogStore.catalogList.filter(
    (category) => category.parentId === parentId
  );
};

onMounted(async () => {
  await catalogStore.fetchCatalog();
  const categorySlug = route.params.category;
  category.value = await fetchCategoryData(categorySlug);
  if (category.value) {
    const itemsUrl = category.value.relationships?.items?.links?.self;
    if (itemsUrl) {
      items.value = await fetchItemsData(itemsUrl);
    }
    childrenCategories.value = findChildrenCategories(category.value.id);
  }
  isLoading.value = false;
});

onMounted(() => {
  fetchBannersCatalog();
});

watch(
  () => catalogStore.catalogList,
  (newCatalogList) => {
    if (category.value) {
      childrenCategories.value = findChildrenCategories(category.value.id);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="wrapper">
    <div class="mt-10">
      <banners-slide-catalog :bannersCatalog="bannersCatalog" />
    </div>
    <div class="mb-12">
      <p class="mb-5 text-sm text-slate-300">
        Главная / Каталог /
        <span class="text-black">{{ category?.attributes.name }}</span>
      </p>
      <h2 class="text-3xl">
        {{ category?.attributes.name }}
        <span class="text-gray-400"> - {{ category?.attributes.count }}</span>
      </h2>
    </div>

    <div v-if="childrenCategories.length" class="mb-16">
      <div class="flex gap-4">
        <div v-for="child in childrenCategories" :key="child.id">
          <CatalogCard :item="child" />
        </div>
      </div>
    </div>

    <div class="flex gap-7 w-full">
      <FilterCatalog />

      <catalog-list-item :items="items" v-if="!isLoading && items.length" />
      <p v-if="!isLoading && !items.length">No items found.</p>
      <p v-if="isLoading">Loading...</p>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <div class="flex justify-end mb-12">
      <pagination />
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
