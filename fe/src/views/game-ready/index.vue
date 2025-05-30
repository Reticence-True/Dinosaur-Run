<template>
  <div class="game-ready">
    <div class="ready-dinosaur"></div>
    <div class="play"></div>
    <GameButton class="rank-list" :iconUrl="'@/assets/rank.svg'" svgClass="rank">
      <span>排行榜</span>
    </GameButton>
    <GameButton class="achis-list" :iconUrl="'@/assets/champion.svg'" svgClass="champion">
      <span>成就榜</span>
    </GameButton>
    <div class="title">
      <div class="zh-title">
        <span>恐</span>
        <span>龙</span>
        <span>快</span>
        <span>跑</span>
      </div>
      <div class="en-title">Dinosaur Run</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameButton from '@/components/game-button/index.vue';
</script>
<script lang="ts">
export default {
  name: 'game-ready',
};
</script>

<style lang="scss" scoped>
.game-ready {
  width: 100%;
  height: 100%;
  position: relative;
  inset: 0;

  .title {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%);
    color: #535353;
    display: flex;
    flex-direction: column;
    user-select: none;

    .zh-title > span {
      font-size: 50px;
      font-weight: bold;
      margin: 0 20px;
    }

    .en-title {
      font-size: 20px;
      text-align: center;
    }
  }

  .ready-dinosaur {
    width: 144px;
    height: 144px;
    background: no-repeat center/100% 100% url('@/assets/恐龙.png');
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .rank-list {
    font-size: 12px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .achis-list {
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 0;
  }

  .play {
    width: 35px;
    height: 35px;
    background: url('@/assets/icons/play.svg') no-repeat;
    background-size: cover;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0);
    transform-origin: center;
    cursor: pointer;
    transition: all 350ms ease-in-out;

    &:hover {
      transform: translate(-50%, -50%) rotate(180deg);
    }
  }
}
</style>
