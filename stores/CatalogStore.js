import { defineStore } from "pinia";
import { ref } from "vue";
import { useNuxtApp } from "#app";

export const useCatalogStore = defineStore("catalog", () => {
  const catalogTree = ref([]);
  const catalogList = ref([]);
  const catalog = ref([]);

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
      catalog.value = catalogList.value;
    } catch (error) {
      console.error("Error fetching catalog:", error);
    }
  }

  return {
    catalogTree,
    catalogList,
    catalog,
    fetchCatalog,
  };
});
