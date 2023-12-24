import { bg } from "./background.js"
import { cld } from "./cloud.js"
import { dino } from "./dinosaur.js"
import { sre } from "./score.js"
import { obs } from "./obstacle.js"
import { util } from "./functions.js"

const speed = 3; // 物体移动像素
// 物体生成时间
var summomInterval = 0,
    preSummonInterval = 0
    ;

// #region 游戏开始
function gamePlay() {
    spawnObject()
    move()
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

// #region 游戏结束
function gameover() {
    // 背景移动降为0
    speed = 0
    // 恐龙停止走动
    dinosaur.style.animationName = "dinosaurJump"
    // 定时器清空
    clearInterval(summonTimer)
    // 阻止动画
    animating = true
}
// #endregion

// #region 移动函数
function move() {
    bg.groundMove(speed)
    cld.cloudMove(speed)
    obs.obstacleMove(speed)
    requestAnimationFrame(() => {
        move()
    })
}
// #endregion

// #region 生成函数
function spawnObject() {
    setInterval(() => {
        summomInterval = Math.floor(Math.random() * 5000)
        if (Math.abs(preSummonInterval - summomInterval) <= 3500) {
            preSummonInterval = summomInterval
        } else {
            // console.log("生成");
            obs.createObstacle()
            cld.createCloud()
        }
    }, summomInterval)
}
// #endregion

// #region 资源回收函数
function recycle() {

}
// #endregion

gamePlay()