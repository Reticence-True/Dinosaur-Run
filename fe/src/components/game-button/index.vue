<template>
  <div class="g-button">
    <svg-icon v-if="svgClass" :name="svgClass" :size="'18px'" />
    <div v-else class="g-button-img" :style="{ backgroundImage: `url(${iconUrl})` }"></div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const { iconUrl, svgClass } = defineProps({
  iconUrl: String,
  svgClass: String,
});
</script>
<script lang="ts">
export default {
  name: 'game-button',
};
</script>

<style lang="scss" scoped>
.g-button {
  color: #535353;
  font-weight: bold;
  text-align: center;
  border: 3px solid #535353;
  border-radius: 1px;
  display: flex;
  padding: 5px 30px;
  cursor: pointer;
  user-select: none;

  &-img {
    width: 18px;
    height: 18px;
    align-self: center;
    margin-right: 5px;
    background: no-repeat center/100% 100%;
  }
}
</style>
