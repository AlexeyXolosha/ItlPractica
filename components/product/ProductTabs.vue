<script setup>
const props = defineProps({
  tabs: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="mb-8">
    <div class="mb-3">
      <ul class="flex items-center gap-4 text-base">
        <li><a href="#part-0">Описание</a></li>
        <li><a href="#part-1">Характеристики</a></li>

        <li v-for="(tab, index) in tabs" :key="index">
          <a :href="'#tab-' + index">{{ tab.title }}</a>
        </li>
        <li><a href="#part-2">Отзывы</a></li>
      </ul>
    </div>
    <div class="border-b border-blue-200"></div>
  </div>
</template>
