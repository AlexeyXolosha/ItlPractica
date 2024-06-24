<script setup>
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const baseURL = "https://api.b2c.itl.digital";
const getImageUrl = (imagePath) => `${baseURL}${imagePath}`;

const getCategoryLink = (item) => item.link;
onMounted(() => {
  // console.log("Item props:", props.item);
});
</script>

<template>
  <NuxtLink :to="getCategoryLink(item)">
    <div class="border border-slate-200 py-6 px-7 text-nowrap">
      <div class="flex items-center gap-5">
        <img
          v-if="item.img"
          :src="getImageUrl(item.img)"
          alt=""
          class="w-16 h-16"
        />
        <img v-else src="../../public/zaglushka.png" alt="" class="w-16 h-16" />
        <div>
          <h3 class="text-blue-600 font-medium text-lg">{{ item.name }}</h3>
          <p class="text-slate-400 text-sm">{{ item.count }} товар(ов)</p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
