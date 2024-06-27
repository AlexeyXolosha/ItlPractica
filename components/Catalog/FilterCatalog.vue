<script setup>
import ButtonFilter from "../UI/ButtonFilter.vue";
import FilterInfo from "../UI/FilterInfo.vue";
import InputSelectorFilter from "../UI/InputSelectorFilter.vue";
import RangeFilter from "../UI/RangeFilter.vue";

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

const openFilters = ref({});

const toggleFilter = (filterName) => {
  openFilters.value[filterName] = !openFilters.value[filterName];
};
</script>

<template>
  <aside class="flex flex-col w-64 p-3">
    <div class="mb-7 flex flex-col gap-2">
      <h1 class="mb-5">Наши предложения</h1>
      <div
        v-for="filter in filters.attributes?.properties[0].values"
        :key="filter.id"
      >
        <ButtonFilter>{{ filter.name }}</ButtonFilter>
      </div>
    </div>

    <!--SideBar Цена-->
    <div class="mb-7">
      <h1 class="mb-5">Цена</h1>
      <div>
        <input id="priceRange" type="range" class="w-full mb-2" />
        <div class="flex justify-between">
          <span id="minPrice">0</span>
          <span id="maxPrice">140 900</span>
        </div>
      </div>
    </div>

    <!--SideBar Свойства-->
    <div
      v-for="filter in filters.attributes?.properties.slice(1)"
      :key="filter.name"
    >
      <FilterInfo
        :isOpen="openFilters[filter.name]"
        @toggle-filter="toggleFilter(filter.name)"
      >
        {{ filter.name }}
      </FilterInfo>
      <div v-if="openFilters[filter.name]">
        <div
          v-if="filter.type === 'N' && filter.values.min && filter.values.max"
        >
          <RangeFilter
            :min="filter.values.min.value"
            :max="filter.values.max.value"
          />
        </div>
        <div v-else>
          <div v-for="value in filter.values" :key="value.id">
            <InputSelectorFilter>{{ value.name }}</InputSelectorFilter>
          </div>
        </div>
      </div>
    </div>
    <!--<button class="border border-blue-100 w-64 h-9">Сбросить фильтр</button>-->
  </aside>
</template>
