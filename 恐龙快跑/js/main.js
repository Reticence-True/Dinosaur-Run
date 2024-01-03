import { bg } from "./background.js"
import { cld } from "./cloud.js"
import { dino } from "./dinosaur.js"
import { sre } from "./score.js"
import { obs } from "./obstacle.js"
import { util } from "./functions.js"
import { achi } from "./achienement.js"

// #region 配置文件可修改参数
// 设置小恐龙最大跳跃高度 (单位：px)
let scoreBouns = 1; // 积分倍率
let maxJumpHeight = 180 // 默认为 180
let g = 1.63 // 重力加速度 // 默认为 9.8
let isJump = false
// 场上同时出现的最大云朵数
let maxCloudNum = 5 // 默认 5
// 云朵最大垂直偏移量
let cloudMaxOffset = 921
// 云朵之间距离偏移量
let cloudsDistance = 400 // 默认 400
// #endregion

const speed = 3; // 物体移动像素
// 物体生成时间
var summomInterval = 0,
    preSummonInterval = 0
    ;

// #region 游戏初始化
function gameInit() {
    // 传递数据
    achi.getData(maxJumpHeight, g, maxCloudNum, cloudMaxOffset, cloudsDistance)
    dino.getData(maxJumpHeight, g)
    cld.getData(maxCloudNum, cloudMaxOffset, cloudsDistance)

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
    bg.groundMove(speed)
    cld.cloudMove(speed)
    obs.obstacleMove(speed)
    requestAnimationFrame(move)
}
// #endregion

// #region 生成函数
function spawnObject() {
    const spawnInterval = setInterval(() => {
        summomInterval = Math.floor(Math.random() * 5000) // 随机生成时间
        if (Math.abs(preSummonInterval - summomInterval) <= 3500) {
            preSummonInterval = summomInterval
        } else {
            // console.log("生成");
            obs.createObstacle()
            cld.createCloud()
        }
    }, summomInterval)

    return spawnInterval;
}
// #endregion

// #region 键盘跳跃函数
function keyPressJump(key) {
    isJump = true;
    setTimeout(() => {
        isJump = false
    }, 1000);
    dino.keyPressJump(key); // 恐龙跳跃
}
// 键盘跳跃
document.body.addEventListener("keydown", function (event) {
    keyPressJump(event.key)
})
// #endregion

// #region 分数记录函数
function scoreCount() {
    sre.scoreCount(scoreBouns)
}
// #endregion

// #region 资源回收函数
function recycle() {

}
// #endregion

// 游戏开始
gameInit()