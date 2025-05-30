<template>
  <svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size">
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon-',
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '1em',
  },
});
const symbolId = computed(() => `#${props.prefix}${props.name}`);
</script>
<script lang="ts">
export default {
  name: 'svg-icon',
};
</script>
<style lang="scss" scoped></style>
