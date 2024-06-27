<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

const minValue = ref(props.min);
const maxValue = ref(props.max);

watch([minValue, maxValue], ([newMin, newMax]) => {
  console.log("Range changed:", newMin, newMax);
});
</script>

<template>
  <div>
    <input
      type="range"
      v-model="minValue"
      :min="min"
      :max="max"
      class="w-full mb-2"
    />
    <div>
      <span>{{ minValue }}</span>
    </div>
  </div>
</template>
