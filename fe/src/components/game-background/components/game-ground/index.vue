<template>
  <div class="ground" :style="{ backgroundPositionX: `${bgXRef}px` }"></div>
</template>
<script setup lang="ts">
import { GameStatus, type GameStatusType } from '@/constant';
import useGameStore from '@/stores/game';
import { onMounted, ref, watch } from 'vue';

const gameStore = useGameStore();
const bgXRef = ref(0);
const animationFrameId = ref(0);

// 地面移动
const groundMove = () => {
  bgXRef.value -= gameStore.speed;
};

// 回收函数
const onRecycle = () => {
  bgXRef.value = 0;
  animationFrameId.value = 0;
};

// 游戏开始
const onGameStart = (gameStatus: GameStatusType) => {
  cancelAnimationFrame(animationFrameId.value);
  if (gameStatus !== GameStatus.Playing) {
    return;
  }
  const onGroundMove = () => {
    groundMove();
    animationFrameId.value = requestAnimationFrame(onGroundMove);
  };

  onGroundMove();
};

// 游戏状态改变时触发
watch(
  () => gameStore.gameStatus,
  (gameStatus) => {
    // 游戏预备，资源回收
    if (gameStatus === GameStatus.Ready) {
      onRecycle();
      return;
    }
    onGameStart(gameStatus);
  },
);

// TODO
onMounted(() => {
  onGameStart(GameStatus.Playing);
});
</script>
<script lang="ts">
export default {
  name: 'game-ground',
};
</script>
<style lang="scss">
.ground {
  width: 100%;
  height: 27px;
  position: absolute;
  bottom: 0;
  background-image: url('@/assets/场景图3.png');
  background-position: 0 90px;
  animation: groundAnimation 1s linear;
  overflow: hidden;
}

@keyframes groundAnimation {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
