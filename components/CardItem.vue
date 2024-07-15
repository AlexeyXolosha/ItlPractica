<script setup>
import StoreButton from "./UI/StoreButton.vue";
import plusImage from "../public/plus.svg";
const imagePath = ref(plusImage);

const props = defineProps({
  image: String,
  name: String,
  countShop: String,
  valueFormatted: String,
  basePrice: String,
  links: String,
  stikers: Array,
});

const getStickerClass = (stiker) => {
  switch (stiker) {
    case "Хит":
      return "bg-blue-600";
    case "Советуем":
      return "bg-orange-400";
    case "Новинка":
      return "bg-green-600";
    case "Акция":
      return "bg-red-600";
    default:
      return "bg-gray-400";
  }
};

const baseURL = "https://api.b2c.itl.digital";
const fullImageUrl = computed(() => `${baseURL}${props.image}`);
</script>

<template>
  <nuxt-link :href="links">
    <div
      class="wrapper-item border border-slate-200 p-7 flex flex-col justify-between"
    >
      <div class="relative">
        <img
          :src="fullImageUrl"
          alt=""
          class="mb-6 w-52 h-44 object-contain mx-auto"
        />
        <div class="absolute top-0 left-0 flex flex-col text-center gap-2">
          <div
            v-for="stiker in stikers"
            :key="stiker"
            class="px-3 inline-block rounded"
            :class="getStickerClass(stiker)"
          >
            <span class="text-white">{{ stiker }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 mb-1">
        <img src="../public/estimation.svg" alt="" />
        <span class="text-slate-400">4.8</span>
      </div>
      <p class="mb-2">{{ name }}</p>
      <p class="text-sm mb-2">
        <span class="text-blue-600">{{ countShop }}</span>
      </p>
      <div class="flex flex-col mb-3">
        <span v-if="basePrice" class="line-through text-slate-400 text-sm">{{
          basePrice
        }}</span>
        <h3 class="text-2xl" v-if="valueFormatted">{{ valueFormatted }}</h3>
      </div>
      <!--Блок кнопок-->
      <div class="flex items-center gap-6">
        <store-button :imageSrc="imagePath">В корзину</store-button>
        <div class="flex items-center gap-3">
          <svg
            class="cursor-pointer"
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M9.53125 2.78125L9.96094 3.25L10.4297 2.82031C11.7188 1.53125 13.5547 0.945312 15.3125 1.25781C18.0078 1.6875 20 4.03125 20 6.76562V6.96094C20 8.60156 19.2969 10.1641 18.125 11.2578L11.0547 17.8594C10.7812 18.1328 10.3906 18.25 10 18.25C9.57031 18.25 9.17969 18.1328 8.90625 17.8594L1.83594 11.2578C0.664062 10.1641 0 8.60156 0 6.96094V6.76562C0 4.03125 1.95312 1.6875 4.64844 1.25781C6.40625 0.945312 8.24219 1.53125 9.53125 2.78125C9.53125 2.82031 9.49219 2.78125 9.53125 2.78125ZM9.96094 5.90625L8.20312 4.10938C7.34375 3.28906 6.13281 2.89844 4.96094 3.09375C3.16406 3.40625 1.875 4.92969 1.875 6.76562V6.96094C1.875 8.09375 2.30469 9.14844 3.125 9.89062L10 16.2969L16.8359 9.89062C17.6562 9.14844 18.125 8.09375 18.125 6.96094V6.76562C18.125 4.92969 16.7969 3.40625 15 3.09375C13.8281 2.89844 12.6172 3.28906 11.7578 4.10938L9.96094 5.90625Z"
              fill="#0E6CDD"
            />
          </svg>
          <svg
            class="cursor-pointer"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M17.6562 2.84375H19.0625C19.4922 2.84375 19.8438 3.19531 19.8438 3.625C19.8438 4.09375 19.4922 4.40625 19.0625 4.40625H17.6562V5.8125C17.6562 6.24219 17.3047 6.59375 16.875 6.59375C16.4062 6.59375 16.0938 6.24219 16.0938 5.8125V4.40625H14.6875C14.2188 4.40625 13.9062 4.09375 13.9062 3.625C13.9062 3.19531 14.2188 2.84375 14.6875 2.84375H16.0938V1.4375C16.0938 1.00781 16.4062 0.65625 16.875 0.65625C17.3047 0.65625 17.6562 1.00781 17.6562 1.4375V2.84375ZM10.9375 5.73438L19.1406 9.21094C19.6484 9.44531 20 9.95312 20 10.5C20 11.0859 19.6484 11.5938 19.1406 11.8281L10.9375 15.3047C10.625 15.4609 10.3125 15.5 10 15.5C9.64844 15.5 9.33594 15.4609 9.02344 15.3047L0.820312 11.8281C0.3125 11.5938 0 11.0859 0 10.5C0 9.95312 0.3125 9.44531 0.820312 9.21094L9.02344 5.73438C9.33594 5.57812 9.64844 5.5 10 5.5C10.3125 5.5 10.625 5.57812 10.9375 5.73438ZM2.57812 10.5L9.76562 13.5859C9.80469 13.625 9.88281 13.625 10 13.625C10.0781 13.625 10.1562 13.625 10.1953 13.5859L17.3828 10.5L10.1953 7.45312C10.1562 7.41406 10.0781 7.375 10 7.375C9.88281 7.375 9.80469 7.41406 9.76562 7.45312L2.57812 10.5ZM2.30469 14.2109C2.57812 14.5625 2.53906 15.0703 2.22656 15.3828L9.76562 18.5859C9.80469 18.625 9.88281 18.625 10 18.625C10.0781 18.625 10.1562 18.625 10.1953 18.5859L17.6562 15.4219C17.4609 15.1484 17.4219 14.7969 17.5781 14.4844C17.8125 14.0156 18.3594 13.8203 18.8281 14.0547L19.1797 14.25C19.6875 14.4844 20 14.9531 20 15.5C20 16.0859 19.6484 16.5938 19.1016 16.8281L10.9375 20.3047C10.625 20.4609 10.3125 20.5 10 20.5C9.64844 20.5 9.33594 20.4609 9.02344 20.3047L0.859375 16.8281C0.3125 16.5938 0 16.0859 0 15.4609C0 14.9922 0.195312 14.5625 0.585938 14.2891L1.01562 13.9766C1.40625 13.7031 1.99219 13.7812 2.30469 14.2109Z"
              fill="#0E6CDD"
            />
          </svg>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<style scoped>
.wrapper-item {
  height: 462px;
}
</style>
