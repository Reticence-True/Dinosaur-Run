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
// #endregion

const speed = 3; // 物体移动像素
const achisList = []; // 获得成就队列
// 物体生成时间
var summomInterval = 0,
    preSummonInterval = 0
    ;

// #region 游戏初始化
function gameInit() {
    // 传递数据
    dino.getData(maxJumpHeight, g)

    // 游戏开始
    gamePlay();
}
// #endregion

// #region 游戏开始
function gamePlay() {
    spawnObject()
    move()
    scoreCount() // 积分开始
    achievementCheck() // 成就检查
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

// #region 成就检查函数
function achievementCheck() {
    var showTime = 0; // 成就显示时间
    setInterval(() => { // 每 1s 检查一次成就
        var move2TheMoon = achi.move2TheMoon(g, isJump);
        if (move2TheMoon) {
            achisList.push(move2TheMoon)
            isJump = false
        }

        console.log("object");

        achisList.forEach(e => {
            setTimeout(() => { // 成就显示
                achi.showAchievement(e.achi, e.vice)
            }, showTime);
            setTimeout(() => { // 延迟显示3s后隐藏
                achi.hideAchievement()
            }, (showTime + 3000));

            showTime += 1000
        })

        achisList.length = 0 // 数组清空
        showTime = 0; // 成就显示时间清空

    }, 500);
}

// achievementCheck()

// #endregion

// #region 资源回收函数
function recycle() {

}
// #endregion

// 游戏开始
gameInit()