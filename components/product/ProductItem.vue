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

const currentImage = ref(
  getImageUrl(props.product?.attributes?.images?.detail)
);
const currentStartIndex = ref(0);

const changeImage = (newImage) => {
  currentImage.value = getImageUrl(newImage);
};

const scrollImagesUp = () => {
  if (currentStartIndex.value > 0) {
    currentStartIndex.value -= 1;
  }
};

const scrollImagesDown = () => {
  if (
    currentStartIndex.value <
    props.product.attributes.images.more.length - 4
  ) {
    currentStartIndex.value += 1;
  }
};

const displayedImages = computed(() => {
  return props.product.attributes.images.more.slice(
    currentStartIndex.value,
    currentStartIndex.value + 4
  );
});
</script>

<template>
  <div class="flex items-start gap-10">
    <div v-if="product?.attributes?.images.more">
      <ul class="flex flex-col gap-2 w-20 h-96 items-center mr-16">
        <li
          class="border border-blue-100 py-1 px-7 cursor-pointer"
          @click="scrollImagesUp"
        >
          <img src="~/public/angle-up.svg" alt="Scroll Up" />
        </li>

        <li
          v-for="(image, index) in displayedImages"
          :key="index"
          class="w-16 h-16 cursor-pointer"
        >
          <img
            :src="getImageUrl(image)"
            :alt="'Image ' + (index + 1)"
            @click="changeImage(image)"
          />
        </li>

        <li
          class="border border-blue-100 py-1 px-7 cursor-pointer"
          @click="scrollImagesDown"
        >
          <img src="~/public/angle-down.svg" alt="Scroll Down" />
        </li>
      </ul>
    </div>

    <div class="mr-24">
      <img :src="currentImage" alt="Current Image" />
    </div>

    <div class="flex flex-col gap-4 w-1/2">
      <div v-for="property in productProperties" :key="property.name">
        <div class="flex flex-1">
          <span>{{ property.name }}</span>
          <div class="flex-1 border-b border-dashed"></div>
          <span>{{ property.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
