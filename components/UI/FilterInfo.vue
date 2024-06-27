<script setup>
const emit = defineEmits(["toggle-filter"]);
defineProps(["isOpen"]);

const toggleFilter = () => {
  emit("toggle-filter");
};
</script>

<template>
  <div
    class="flex items-center relative mb-3 cursor-pointer"
    @click="toggleFilter"
  >
    <h1 class="text-lg w-36">
      <slot></slot>
    </h1>
    <svg
      v-if="isOpen"
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
    <svg
      v-else
      class="absolute top-3 right-0 cursor-pointer"
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.58984 5.96484C5.31641 6.23828 4.90625 6.23828 4.66016 5.96484L0.285156 1.58984C0.0117188 1.34375 0.0117188 0.933594 0.285156 0.6875C0.53125 0.414062 0.941406 0.414062 1.1875 0.6875L5.09766 4.59766L9.03516 0.660156C9.28125 0.414062 9.69141 0.414062 9.9375 0.660156C10.2109 0.933594 10.2109 1.34375 9.9375 1.58984L5.58984 5.96484Z"
        fill="#333333"
      />
    </svg>
  </div>
</template>
