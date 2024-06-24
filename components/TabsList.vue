<script setup>
import { defineProps } from "vue";
import TabsButton from "./UI/TabsButton.vue";

const props = defineProps({
  categoryListHit: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center gap-7 mb-10">
    <tabs-button>Все категории</tabs-button>
    <tabs-button v-for="category in categoryListHit" :key="category.id">
      {{ category.attributes.name }}
    </tabs-button>
  </div>
</template>
