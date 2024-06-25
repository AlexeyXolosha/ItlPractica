<template>
  <div
    class="wrapper-item border border-slate-200 p-7 flex flex-col justify-between"
  >
    <div class="relative">
      <div alt="" class="mb-6 w-52 h-44 mx-auto bg-gray-100 rounded-md"></div>
      <div class="absolute top-0 left-0 flex flex-col gap-2 text-center">
        <div class="px-3 rounded">
          <span class="text-white"></span>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2 mb-1">
      <div class="bg-gray-100 w-24 h-6 rounded"></div>
    </div>
    <div class="mb-2 bg-gray-100 w-56 h-6 rounded"></div>
    <div class="mb-2 bg-gray-100 w-56 h-6 rounded"></div>
    <div class="mb-2 bg-gray-100 w-56 h-6 rounded"></div>
    <div class="flex items-center gap-6">
      <div class="mb-2 bg-gray-100 w-28 h-11 rounded"></div>
    </div>
  </div>
</template>

<style scoped>
.wrapper-item {
  max-width: 300px; /* Adjust as needed */
}
.bg-gray-100 {
  animation: pulse 1.5s infinite ease-in-out;
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
