<template>
  <div class="main">
    <GameReady v-show="gameStore.gameStatus === GameStatus.Ready"></GameReady>
    <GamePlay v-show="gameStore.gameStatus !== GameStatus.Ready"></GamePlay>
    <GameOver v-show="gameStore.gameStatus === GameStatus.Over"></GameOver>
  </div>
</template>
<script setup lang="ts">
import { GameStatus } from '@/constant';
import useGameStore from '@/stores/game';
import GameOver from '@/views/game-over/index.vue';
import GamePlay from '@/views/game-playing/index.vue';
import GameReady from '@/views/game-ready/index.vue';

const gameStore = useGameStore();
</script>
<script lang="ts">
export default {
  name: 'game-main',
};
</script>
<style lang="scss" scoped>
.main {
  /* 设置宽高 */
  width: 921px;
  height: 280px;
  /* 设置居中 */
  margin: 60px auto;
  /* 设置定位 */
  position: relative;
  /* 设置溢出样式 */
  overflow: hidden;
}
</style>
