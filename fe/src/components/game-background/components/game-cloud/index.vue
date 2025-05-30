<template>
  <div class="cloud-element" ref="cloudContainerRef"></div>
</template>
<script setup lang="ts">
import { GameStatus, type GameStatusType } from '@/constant';
import useGameStore from '@/stores/game';
import { onMounted, ref, watch } from 'vue';

const gameStore = useGameStore();
const cloudContainerRef = ref<HTMLDivElement | null>(null);
const animationFrameId = ref(0);

// 云朵数组
const cloudArr = ['cloud1', 'cloud2'];
// 云朵个数
const cloudCount = ref(0);
// 上一个云朵
const lastCloud = ref<HTMLDivElement | null>(null);
// 云朵数组
const cloudStorage = ref<HTMLDivElement[]>([]);

// 创建云朵
const createCloud = () => {
  const cloudFather = cloudContainerRef.value;

  if (!cloudFather || cloudCount.value >= gameStore.maxCloudNum) {
    return;
  }
  // 不超过最大云朵数，添加云朵
  // 创建云朵元素
  let cloud: HTMLDivElement | null = document.createElement('div');
  // 随机数：选择云朵
  let selCloud = Math.round(Math.random());
  // 随机数：生成云朵位置偏移
  let spawnCloudOffset = 0;

  // 设置云朵
  cloud.classList.add(cloudArr[selCloud]);
  cloud.classList.add('cloud-base');

  // 随机数：随机云朵高度
  var margin = Math.floor(Math.random() * 56);
  // 设置云朵位置
  cloud.style.marginTop = margin + 'px';
  // 创建云朵当前速度
  cloud.style.setProperty('--speed', gameStore.speed.toString());
  // 添加云朵到背景中
  cloudFather.appendChild(cloud);

  const curCloudPos = parseFloat(getComputedStyle(cloud).transform.split(',')[4]);
  const lastCloudPos = lastCloud.value
    ? parseFloat(getComputedStyle(lastCloud.value).transform.split(',')[4])
    : 0;

  // 检测本云朵与上一个云朵之间的距离
  if (curCloudPos - lastCloudPos <= gameStore.cloudsDistance + spawnCloudOffset) {
    // 小于 [cloudsDistance] px，删除该云，重新渲染
    cloud.remove();
    cloud = null;
    return;
  }

  // 监听云朵动画结束
  cloud.addEventListener('animationend', () => {
    // 删除云朵
    cloud?.remove();
    cloud = null;
    // 云朵数量--
    cloudCount.value--;
    // 删除云朵元素
    cloudStorage.value.shift();
  });

  // 云朵数量++
  cloudCount.value++;
  // 记录上一个云朵
  lastCloud.value = cloud;
  // push云朵
  cloudStorage.value.push(cloud);
};

// 游戏开始
const onGameStart = (gameStatus: GameStatusType) => {
  if (gameStatus !== GameStatus.Playing) {
    cancelAnimationFrame(animationFrameId.value);
    // 所有云朵动画暂停
    cloudStorage.value.forEach((cloud) => {
      cloud.style.animationPlayState = 'paused';
    });
    return;
  }
  // 所有云朵动画开始
  cloudStorage.value.forEach((cloud) => {
    cloud.style.animationPlayState = 'running';
  });

  // 创建云朵事件
  const onCreateCloud = () => {
    // 创建云朵
    createCloud();

    animationFrameId.value = requestAnimationFrame(onCreateCloud);
  };

  // 创建云朵
  onCreateCloud();
};

// 回收函数
const onRecycle = () => {
  animationFrameId.value = 0;
  cloudCount.value = 0;
  lastCloud.value = null;
  cloudStorage.value.length = 0;
  if (cloudContainerRef.value) {
    cloudContainerRef.value.innerHTML = '';
  }
};

// 游戏开始时触发
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
  name: 'game-cloud',
};
</script>
<style lang="scss">
.cloud-base {
  position: absolute;
  transform: translateX(921px);
  // 使用css动画
  animation: cloudMove linear forwards;
}
.cloud-base.cloud1 {
  width: 100px;
  height: 30px;
  background-image: url('@/assets/场景图2.png');
  background-position: -165px 0;
  animation-duration: calc(40s / var(--speed)); // 大云朵快速
}
.cloud-base.cloud2 {
  width: 52px;
  height: 15px;
  background-image: url('@/assets/场景图1.png');
  background-position: -84px 0;
  animation-duration: calc(60s / var(--speed)); // 小云朵慢速
}
@keyframes cloudMove {
  from {
    transform: translateX(921px);
  }
  to {
    transform: translateX(-300px);
  }
}
</style>
