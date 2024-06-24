import { defineStore } from "pinia";
import { ref } from "vue";
import { useNuxtApp } from "#app";

export const useCatalogStore = defineStore("catalog", () => {
  const catalogTree = ref([]);
  const catalogList = ref([]);
  const catalog = ref([]);
  const filters = ref({});

  function buildTree(items) {
    let tree = [];
    let lookup = {};

    items.forEach((item) => {
      lookup[item.id] = {
        ...item.attributes,
        id: item.id,
        link: item.links.self,
        children: [],
        parentId: item.attributes.parentId || null,
      };
    });

    items.forEach((item) => {
      if (item.attributes.parentId) {
        lookup[item.attributes.parentId].children.push(lookup[item.id]);
      } else {
        tree.push(lookup[item.id]);
      }
    });
    return tree;
  }

  async function fetchCatalog() {
    const { $apiClient } = useNuxtApp();
    try {
      const { data } = await $apiClient.get("/catalog");
      catalogList.value = data.data.map((item) => ({
        ...item.attributes,
        id: item.id,
        link: item.links.self,
        parentId: item.attributes.parentId || null,
      }));
      catalogTree.value = buildTree(data.data);
      catalog.value = catalogList.value; // Обновим каталог
    } catch (error) {
      console.error("Error fetching catalog:", error);
    }
  }

  async function fetchFilters(slug) {
    const { $apiClient } = useNuxtApp();
    try {
      const response = await $apiClient.get(`/catalog/${slug}/filters`);
      if (response.data && response.data.attributes) {
        filters.value = response.data.attributes;
        console.log("Filters fetched:", filters.value);
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  }

  return {
    catalogTree,
    catalogList,
    catalog,
    filters,
    fetchCatalog,
    fetchFilters,
  };
});
