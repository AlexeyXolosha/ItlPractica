<script setup>
import { defineProps, defineEmits } from "vue";
import TabsButton from "./UI/TabsButton.vue";

const props = defineProps({
  categoryListHit: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["updateCategory"]);

function updateCategory(category) {
  emits("updateCategory", category);
}
</script>

<template>
  <div class="flex items-center gap-7 mb-10">
    <tabs-button @click="updateCategory('null')">Все категории</tabs-button>
    <tabs-button
      v-for="category in categoryListHit"
      :key="category.id"
      @click="updateCategory(category.links.self)"
    >
      {{ category.attributes.name }}
    </tabs-button>
  </div>
</template>
