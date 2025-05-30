<template>
  <div class="obstacle" ref="obstacleParentRef"></div>
</template>
<script setup lang="ts">
import { GameStatus, type GameStatusType } from '@/constant';
import useGameStore from '@/stores/game';
import { onMounted, ref, watch } from 'vue';

const gameStore = useGameStore();
// 获取障碍物所在父元素
const obstacleParentRef = ref<HTMLDivElement | null>(null);
// 障碍物数组
const obstacleArr = ['s-cactus1', 's-cactus2', 's-cactus3', 's-cactus4', 's-cactus5', 's-cactus6'];
// 存储障碍物
const obstacleStroage = ref<HTMLElement[]>([]);
// 场上同时出现的最大障碍物数
const maxObstacleNum = 1; // 默认 1
const animationFrameId = ref<number>(0);

// 创建障碍物
const createObstacle = () => {
  if (!obstacleParentRef.value || obstacleStroage.value.length >= maxObstacleNum) {
    return;
  }

  // 创建障碍物节点
  var obstacleItem = document.createElement('div');
  // 随机数：选择障碍物
  var selObstacle = Math.floor((Math.random() * 6) % 6);
  // 设置障碍物
  obstacleItem.classList.add(obstacleArr[selObstacle]);
  obstacleItem.classList.add('s-cactus-base');
  // 将障碍物添加到背景中
  obstacleParentRef.value.appendChild(obstacleItem);
  // 添加障碍物到列表中
  obstacleStroage.value.push(obstacleItem);
};

// 障碍物移动
const obstacleMove = () => {
  for (const obstacle of obstacleStroage.value) {
    const obstacleTranslateX = parseFloat(getComputedStyle(obstacle).transform.split(',')[4]);

    if (obstacleTranslateX <= -40) {
      obstacle.remove();
      obstacleStroage.value.splice(obstacleStroage.value.indexOf(obstacle), 1);
      continue;
    }
    obstacle.style.transform = `translateX(${obstacleTranslateX - gameStore.speed}px)`;
    console.log(obstacle.style.transform);
  }
};

// 游戏开始
const onGameStart = (gameStatus: GameStatusType) => {
  cancelAnimationFrame(animationFrameId.value);
  if (gameStatus !== GameStatus.Playing) {
    return;
  }

  // 障碍物事件
  const onObstacle = () => {
    // 创建障碍物
    createObstacle();
    // 障碍物移动
    obstacleMove();
    animationFrameId.value = requestAnimationFrame(onObstacle);
  };

  onObstacle();
};

/**
 * 资源回收函数
 */
function onRecycle() {
  obstacleStroage.value = [];
  animationFrameId.value = 0;
}

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
  name: 'game-obstacle',
};
</script>
<style lang="scss">
.obstacle {
  height: 100%;

  .s-cactus-base {
    width: 30px;
    height: 84px;
    background-image: url('@/assets/场景图2.png');
    position: absolute;
    bottom: -10px;
    transform: translateX(921px);
  }

  .s-cactus1 {
    background-position: -448px 0;
  }
  .s-cactus2 {
    background-position: -482px 0;
  }
  .s-cactus3 {
    background-position: -516px 0;
  }
  .s-cactus4 {
    background-position: -550px 0;
  }
  .s-cactus5 {
    width: 31px;
    background-position: -584px 0;
  }
  .s-cactus6 {
    background-position: -618px 0;
  }
}
</style>
