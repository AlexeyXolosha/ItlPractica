<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const baseURL = "https://api.b2c.itl.digital";
const getImageUrl = (imagePath) => `${baseURL}${imagePath}`;

const productProperties = computed(() => {
  const properties = props.product.attributes.properties;
  let propertiesList = [];
  for (const key in properties) {
    propertiesList.push({
      name: properties[key].name,
      value: properties[key].value,
    });
  }
  return propertiesList;
});
</script>

<template>
  <div class="flex gap-10">
    <ul class="flex flex-col gap-2 w-20 h-96 items-center mr-16">
      <li class="border border-blue-100 py-1 px-7">
        <img src="~/public/angle-up.svg" alt="" />
      </li>

      <li
        v-for="(image, index) in product?.attributes?.images.more"
        :key="index"
        class="w-16 h-16"
      >
        <img :src="getImageUrl(image)" :alt="'Image ' + (index + 1)" />
      </li>

      <li class="border border-blue-100 py-1 px-7">
        <img src="~/public/angle-down.svg" alt="" />
      </li>
    </ul>

    <div class="mr-24">
      <img
        :src="getImageUrl(product?.attributes?.images?.detail)"
        alt=""
        class="w-full"
      />
    </div>

    <div>
      <ul>
        <li
          v-for="property in productProperties"
          :key="property.name"
          class="flex items-center gap-9"
        >
          {{ property.name }}
          <div class="flex-1 border-b border-dashed"></div>
          {{ property.value }}
        </li>
      </ul>
    </div>
  </div>
</template>
