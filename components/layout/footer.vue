<script setup>
import { useFooterStore } from "~/stores/Footer";
import { onMounted } from "vue";

import StoreButton from "../UI/StoreButton.vue";

import downArrow from "../public/down_arrow.svg";
import upArrow from "../public/up_arrow.svg";

const footerStore = useFooterStore();

const isPhoneVisible = ref(false);

onMounted(async () => {
  await footerStore.fetchStores();
  await footerStore.fetchMenu();
  await footerStore.fetchInfo();
  await footerStore.fetchSocialMedia();
  await footerStore.fetchPhones();
});

const togglePhoneVisibility = () => {
  isPhoneVisible.value = !isPhoneVisible.value;
};
const images = { downArrow, upArrow };
</script>

<template>
  <div class="wrapper">
    <footer class="mt-36">
      <div
        class="flex items-center justify-between bg-blue-50 py-8 px-8 gap-6 rounded"
      >
        <div class="mr-6">
          <h2 class="text-xl mb-1">Подпишитесь на нашу рассылку</h2>
          <p class="text-sm text-nowrap">
            Вы первыми будите узнавать о наших акциях и эксклюзивных
            предложениях.
          </p>
        </div>
        <div class="flex justify-between w-full items-center gap-4">
          <input
            type="text"
            placeholder="Укажите ваш email"
            class="w-full p-3 rounded"
          />
        </div>
        <div>
          <StoreButton>Подписаться</StoreButton>
        </div>
      </div>

      <div class="flex justify-between py-14">
        <div class="flex flex-col gap-6">
          <div>
            <div class="flex items-center">
              <div v-for="phone in footerStore.phones[0]" :key="phone.id">
                <div class="text-3xl">
                  {{ phone.name }}
                </div>
              </div>
              <div class="ml-3">
                <img
                  :src="isPhoneVisible ? images.upArrow : images.downArrow"
                  alt=""
                  class="cursor-pointer"
                  @click="togglePhoneVisibility"
                />
              </div>
            </div>
            <div
              v-if="isPhoneVisible"
              v-for="phone in footerStore.phones[1]"
              :key="phone.id"
            >
              <div class="text-3xl">
                {{ phone.name }}
              </div>
            </div>
            <span class="text-slate-400"
              >Задать вопрос или оформить покупку.</span
            >
          </div>

          <div class="flex flex-col">
            <div v-for="info in footerStore.info" :key="info.id">
              <p>{{ info.attributes.name }}</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-xl">Магазины</h3>
          <div
            v-for="store in footerStore.stores.slice(0, 3)"
            :key="store.id"
            class="flex flex-col"
          >
            <p>{{ store.attributes?.name }}, {{ store.attributes?.address }}</p>
            <span
              class="text-sm text-slate-400"
              v-html="store.attributes?.schedule?.TEXT"
            >
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-xl">{{ footerStore.menu.company?.title }}</h3>
          <div
            v-for="company in footerStore.menu.company?.submenu[0]"
            :key="company.id"
          >
            <a :href="company.links.self">{{ company.name }}</a>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-xl">{{ footerStore.menu.info?.title }}</h3>
          <div v-for="item in footerStore.menu.info?.submenu[0]" :key="item.id">
            <a :href="item.links.self">{{ item.name }}</a>
          </div>
        </div>
      </div>
      <!--CopyBlock-->
      <div class="flex justify-between items-center pb-12">
        <div>
          <p>© ITL.B2C 2023</p>
        </div>
        <div>
          <img src="~/public/Logo.New.svg" alt="" />
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 1739px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
