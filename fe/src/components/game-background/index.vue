<template>
  <div class="game-background">
    <!-- 地面背景 -->
    <GameGround />
    <!-- 背景云朵 -->
    <GameCloud />
  </div>
</template>

<script setup lang="ts">
import GameCloud from './components/game-cloud/index.vue';
import GameGround from './components/game-ground/index.vue';
</script>
<script lang="ts">
export default {
  name: 'game-background',
};
</script>

<style lang="scss" scoped>
.game-background {
  width: 100%;
  height: 100%;
}
</style>
