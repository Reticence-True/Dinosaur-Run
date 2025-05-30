<template>
  <div class="game-play">
    <!-- 背景 -->
    <div class="game-background">
      <GameBackground />
    </div>
    <!-- 障碍物 -->
    <div class="game-obstacle">
      <GameObstacle />
    </div>
    <!-- 角色 -->
    <!-- <div class="role"> -->
    <!-- 小恐龙 -->
    <!-- <div class="dinosaur"> -->
    <!-- 头碰撞箱 -->
    <!-- <div class="collision-head-box"></div> -->
    <!-- 身体碰撞箱 -->
    <!-- <div class="collision-body-box"> -->
    <!-- <div class="collision-hand-box"></div> -->
    <!-- <div class="collision-btm-body-box"></div> -->
    <!-- </div> -->
    <!--  脚碰撞箱 -->
    <!-- <div class="collision-foot-box"></div> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- 计分板 -->
    <!-- <div class="score-board">
      <div class="score score1"></div>
      <div class="score score2"></div>
      <div class="score score3"></div>
      <div class="score score4"></div>
      <div class="score score5"></div>
      <div class="score score6"></div>
    </div> -->
    <!-- 成就框 -->
    <!-- <div class="animate__animated animate__fadeInDown achievement-container" style="display: none">
      <div class="achievement-title">
        <span class="award-achievement">获得成就</span>
      </div>
      <div class="achievement">
        <div class="award-icon"></div>
        <div class="context">
          <div class="achievement-context"></div>
          <div class="vice-context"></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import GameBackground from '@/components/game-background/index.vue';
import GameObstacle from '@/components/game-obstacle/index.vue';
</script>
<script lang="ts">
export default {
  name: 'game-playing',
};
</script>

<style lang="scss" scoped>
// 定义基础变量
$game-play-bg-bottom: 30px;
$dinosaur-bottom-offset: -5px;
$dinosaur-left-offset: 20px;

/* 游戏运行样式 */
.game-play {
  width: 100%;
  height: 100%;
  position: relative;

  .game-background {
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
  }

  .game-obstacle {
    width: 100%;
    position: absolute;
    inset-block: 0;
  }

  /* 角色 */
  .role {
    width: 100%;
    height: calc(100% - 25px);
    position: absolute;
    bottom: 0;

    /* 小恐龙 */
    .dinosaur {
      width: 82px;
      height: 95px;
      background-image: url('../source/images/场景图2.png');
      background-position: -1860px 0;
      position: absolute;
      bottom: $dinosaur-bottom-offset;
      left: $dinosaur-left-offset;
      margin-bottom: 0;
      overflow: visible;
      animation: dinosaurJump 100ms steps(2) infinite alternate;

      /* 动画 */
      @keyframes dinosaurJump {
        from,
        to {
          background-position-x: -1680px;
        }
      }

      @keyframes dinosaurRun {
        from {
          background-position-x: -1856px;
        }
        to {
          background-position-x: -2032px;
        }
      }

      /* 碰撞箱 */
      .collision-head-box {
        width: 44%;
        height: 32%;
        position: absolute;
        top: 6%;
        right: 5%;
      }

      .collision-body-box {
        width: 30%;
        height: 30%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-30%, -50%);

        .collision-hand-box {
          width: 32%;
          height: 30%;
          position: absolute;
          top: 51%;
          right: -32%;
          transform: translate(0, -50%);
        }

        .collision-btm-body-box {
          width: 162%;
          height: 100%;
          position: absolute;
          top: 50%;
          left: 2%;
          transform: translate(-50%, -14%);
        }
      }

      .collision-foot-box {
        width: 36%;
        height: 20%;
        position: absolute;
        left: 43%;
        bottom: 5%;
        transform: translateX(-50%);
      }
    }
  }

  /* 计分板 */
  .score-board {
    display: flex;
    flex-direction: row-reverse;
    position: absolute;
    top: 0;
    right: 0;

    .score {
      width: 21px;
      height: 25px;
      background-image: url('../source/images/场景图2.png');
      background-position: -1291px 0;
    }
  }

  /* 成就框 */
  .achievement-container {
    width: 350px;
    border: 5px double #535353;
    border-radius: 15px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -175px;
    overflow: hidden;
    user-select: none;

    .achievement-title {
      text-align: center;
      background: #535353;

      .award-achievement {
        color: #fff;
      }
    }

    .achievement {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: left;

      .award-icon {
        width: 110px;
        height: 80px;
        background: url('../source/images/奖杯.svg') no-repeat center;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
      }

      .context {
        width: 100%;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .achievement-context,
        .vice-context {
          width: 100%;
          text-align: center;
        }

        .achievement-context {
          font-size: 17.5px;
          font-weight: bolder;
          color: #535353;
        }

        .vice-context {
          font-size: 9.5px;
          font-weight: bold;
          color: #535353;
        }
      }
    }
  }
}
</style>
