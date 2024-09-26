import { GLOBAL } from "./global.js"
import { bg } from "./background.js"
import { cld } from "./cloud.js"
import { dino } from "./dinosaur.js"
import { sre } from "./score.js"
import { obs } from "./obstacle.js"
import { util } from "./functions.js"
import { achi } from "./achienement.js"

// #region 游戏初始化
function gameInit() {
    // 游戏开始
    gamePlay();
}
// #endregion

// #region 游戏开始
function gamePlay() {
    spawnObject()
    move()
    scoreCount() // 积分开始
    achi.achievementCheck() // 成就检查
}
// #endregion

// #region 游戏暂停
function gamePause() {

}
// #endregion

// #region 游戏继续
function gameContinue() {

}
// #endregion


document.body.addEventListener("keydown", function (event) {
    if (event.key == "s") {
        gameover()
    }
})



// #region 游戏结束
function gameover() {
    cancelAnimationFrame(move)
}
// #endregion

// #region 移动函数
function move() {
    bg.groundMove(GLOBAL.speed)
    cld.cloudMove(GLOBAL.speed)
    obs.obstacleMove(GLOBAL.speed)
    requestAnimationFrame(move)
}
// #endregion

// #region 生成函数
function spawnObject() {
    const spawnInterval = setInterval(() => {
        GLOBAL.summomInterval = Math.floor(Math.random() * 5000) // 随机生成时间
        if (Math.abs(GLOBAL.preSummonInterval - GLOBAL.summomInterval) <= 3500) {
            GLOBAL.preSummonInterval = GLOBAL.summomInterval
        } else {
            // console.log("生成");
            obs.createObstacle()
            cld.createCloud()
        }
    }, GLOBAL.summomInterval)

    return spawnInterval;
}
// #endregion

// #region 键盘跳跃函数
function keyPressJump(key) {
    GLOBAL.isJump = true;
    achi.toggleJump() // 修改成就的是否跳跃
    setTimeout(() => {
        GLOBAL.isJump = false
        achi.toggleJump() // 修改成就的是否跳跃
    }, 1000);
    dino.keyPressJump(key); // 恐龙跳跃
}
// 键盘跳跃
document.body.addEventListener("keydown", function (event) {
    if (event.key == " ") {
        keyPressJump(event.key)
    }
})
// #endregion

// #region 分数记录函数
function scoreCount() {
    sre.scoreCount(GLOBAL.cloudsDistance)
}
// #endregion

// #region 资源回收函数
function recycle() {

}
// #endregion

// 游戏开始
gameInit()