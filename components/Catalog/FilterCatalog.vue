<script setup>
import ButtonFilter from "../UI/ButtonFilter.vue";
import InputSelectorFilter from "../UI/InputSelectorFilter.vue";
</script>

<template>
  <aside class="flex flex-col w-64 p-3">
    <div class="mb-7 flex flex-col gap-2">
      <h1 class="mb-5">Популярные подборки</h1>
      <div>
        <ButtonFilter></ButtonFilter>
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
    <div>
      <div class="flex items-center relative">
        <h1 class="mb-5"></h1>
        <svg
          class="absolute top-3 right-0 cursor-pointer"
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.27734 1.27734C6.59375 0.960938 7.12109 0.960938 7.4375 1.27734L13.0977 6.90234C13.4141 7.25391 13.4141 7.78125 13.0977 8.09766C12.7461 8.44922 12.2188 8.44922 11.9023 8.09766L6.875 3.07031L1.84766 8.09766C1.49609 8.44922 0.96875 8.44922 0.652344 8.09766C0.300781 7.78125 0.300781 7.25391 0.652344 6.9375L6.27734 1.27734Z"
            fill="#333333"
          />
        </svg>
      </div>
      <div>
        <InputSelectorFilter></InputSelectorFilter>
      </div>
    </div>
    <!--<button class="border border-blue-100 w-64 h-9">Сбросить фильтр</button>-->
  </aside>
</template>
