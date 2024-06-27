<script setup>
import { useFooterStore } from "~/stores/Footer";
import { onMounted } from "vue";

const footerStore = useFooterStore();

onMounted(footerStore.fetchAllFooterData);
</script>

<template>
  <div>
    <div class="mb-16" v-for="footer in footerStore.footerData">
      <h1></h1>
      <ul>
        <li>
          <p>г. Алмата, ул. Толе Би 100</p>
          <span>Открыто до 19:00</span>
        </li>
        <li>
          <p>г. Алмата, ул. Пушкина 189</p>
          <span>Открыто до 19:00</span>
        </li>
        <li>
          <p>г. Алмата, ул. Фурманова 45</p>
          <span>Открыто до 19:00</span>
        </li>
      </ul>
    </div>
  </div>
</template>
