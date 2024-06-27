<script setup>
import ProductSaleAuth from "./ProductSaleAuth.vue";
import ProductDeliveryBlock from "./ProductDeliveryBlock.vue";
import StoreButton from "../UI/StoreButton.vue";
import plusImage from "../public/plus.svg";
const imagePath = ref(plusImage);

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <ProductSaleAuth />
    </div>
    <div class="bg-blue-50 flex flex-col">
      <div class="mb-6 px-8 pt-9 pb-6">
        <div>
          <span
            v-if="product.attributes?.product?.basePrice?.valueFormatted"
            class="text-sm text-slate-500 line-through"
            >{{ product.attributes?.product?.basePrice?.valueFormatted }}</span
          >
          <span v-else>Цена не доступна</span>
        </div>
        <div>
          <span class="text-3xl">{{
            product.attributes?.product?.price?.valueFormatted
          }}</span>
        </div>
        <div>
          <span class="text-slate-500 text-xs"
            >Цена указана с НДС и действительна при заказе в интернет-магазине.
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-3 px-8 mb-6">
        <StoreButton :imageSrc="imagePath">Добавить в корзину</StoreButton>
        <div class="border border-blue-200 inline-block text-center p-2">
          <a
            v-if="product.attributes?.product?.basePrice?.valueFormatted"
            href="#"
            >Купить в 1 клик</a
          >
          <a v-else href="#">Не доступно</a>
        </div>
      </div>
      <div class="border-b border-blue-200"></div>
      <div class="flex justify-between items-center gap-6 px-9 py-6">
        <div>
          <span class="text-slate-500 text-sm">Товар участвует в акции:</span>
          <p>Черная пятница в разгаре, скидки до 80%!</p>
        </div>
        <div>
          <img src="~/public/percent.svg" alt="" />
        </div>
      </div>
    </div>
    <div>
      <product-delivery-block />
    </div>
  </div>
</template>

<style scoped></style>
