import { GameStatus, type GameStatusType } from '@/constant';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useGameStore = defineStore('game', () => {
  /* state */
  // 游戏状态
  const gameStatus = ref<GameStatusType>(GameStatus.Playing);
  // 物体移动像素
  const speed = ref<number>(8);
  // 监测是否跳跃
  const isJump = ref<boolean>(false);
  // 云朵
  const maxCloudNum = ref<number>(5); // 最大云朵数量
  const cloudsDistance = ref<number>(350); // 云朵距离

  /* actions */
  // 设置游戏状态
  const setGameStatus = (status: GameStatusType) => {
    gameStatus.value = status;
  };

  // 设置跳跃状态
  const setIsJump = (status: boolean) => {
    isJump.value = status;
  };

  return {
    gameStatus,
    speed,
    isJump,
    maxCloudNum,
    cloudsDistance,
    setGameStatus,
    setIsJump,
  };
});

export default useGameStore;
