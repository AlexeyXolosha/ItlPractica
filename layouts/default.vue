<script setup>
import { ref, onMounted, provide } from "vue";
import { useNuxtApp } from "#app";

/* Компоненты */
import CatalogModal from "~/components/Catalog/CatalogModal.vue";

const popularCategories = ref([]);
const { $apiClient } = useNuxtApp();

/* Модальное окно */
const modalCategoryOpen = ref(false);
const closeModal = () => {
  modalCategoryOpen.value = false;
};
const openModal = () => {
  modalCategoryOpen.value = true;
};

async function fetchPopularCategories() {
  try {
    const { data } = await $apiClient.get("/include/menu/main/");
    popularCategories.value = data.data.map((category) => ({
      id: category.id,
      name: category.attributes.name,
      link: category.links?.self || "#",
    }));
  } catch (error) {
    console.error("Ошибка: ", error);
  }
}

onMounted(() => {
  fetchPopularCategories();
});

provide("CategoryModal", {
  closeModal,
  openModal,
});
</script>

<template>
  <LayoutNavbar
    :popularCategories="popularCategories"
    @open-modal="openModal"
  />
  <CatalogModal v-if="modalCategoryOpen" @close-modal="closeModal" />
  <div>
    <slot></slot>
  </div>
</template>
