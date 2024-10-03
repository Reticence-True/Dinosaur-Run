import { GLOBAL, setConfigVariables } from "./global.js"
import { bg } from "./background.js"
import { cld } from "./cloud.js"
import { dino } from "./dinosaur.js"
import { sre } from "./score.js"
import { obs } from "./obstacle.js"
import { util } from "./functions.js"
import { achi } from "./achievement.js"
import { colli } from "./collision.js"

let animationMovingID = undefined // 移动动画帧ID
let spawnIntervalID = undefined // 生成对象定时器函数ID
let collisionAnimationId = undefined // 碰撞监听器ID

// #region 游戏初始化
async function gameInit() {
    // 游戏就绪
    await gameReady()


    gamePlay();
}
// #endregion

// #region 游戏就绪
async function gameReady() {
    // 获取配置信息
    await setConfigVariables()
    // 异步获取成就信息
    await achi.setAchievements()
    // 获取小恐龙信息
    dino.setDinosaur()
}
// #endregion

// #region 游戏开始
function gamePlay() {
    spawnObject()
    move()
    scoreCount() // 积分开始
    // 成就检查
    achi.achievementCheck()
    // 碰撞监听
    collisionListener()
}
// #endregion

// #region 游戏暂停
function gamePause() {

}
// #endregion

// #region 游戏继续
function gameContinue() {
    GLOBAL.gameStop = false
    gamePlay()
}
// #endregion

document.body.addEventListener("keydown", function (event) {
    if (event.key === "s" || event.key === "S") {
        gameover()
    }
})

// #region 游戏结束
function gameover() {
    // 标志位
    GLOBAL.gameStop = true
    // 恐龙动画停止
    dino.dinosaurStop()
    // 取消跳跃事件
    document.body.removeEventListener("keydown", jumpEvent)
    // 资源回收
    recycle()
}
// #endregion

// #region 移动函数
function move() {
    // 游戏停止
    if (GLOBAL.gameStop) {
        cancelAnimationFrame(animationMovingID)
        return
    }

    bg.groundMove(GLOBAL.speed)
    cld.cloudMove(GLOBAL.speed)
    obs.obstacleMove(GLOBAL.speed)
    animationMovingID = requestAnimationFrame(move)
}
// #endregion

// #region 生成函数
function spawnObject() {
    if (GLOBAL.gameStop) {
        clearInterval(spawnIntervalID)
        spawnIntervalID = undefined
        return
    }

    spawnIntervalID = setInterval(() => {
        GLOBAL.summomInterval = Math.floor(Math.random() * 5000) // 随机生成时间
        if (Math.abs(GLOBAL.preSummonInterval - GLOBAL.summomInterval) <= 3500) {
            GLOBAL.preSummonInterval = GLOBAL.summomInterval
        } else {
            obs.createObstacle()
            cld.createCloud()
        }
    }, GLOBAL.summomInterval)
}
// #endregions

// #region 碰撞监听函数 
/**
 * 监听碰撞
 * @param {Array<HTMLElement>} source 源HTML元素
 * @param {HTMLElement} target 目标HTML元素
 */
function collisionListener() {
    const source = dino.dinosaurCollisionBox()
    const target = obs.firstObstacle()

    // 目标存在，碰撞检测
    if (target) {
        // 碰撞检测
        const collisionList = source.map(e => colli.boundingBox(e, target))
        // 有碰撞产生
        if (collisionList.indexOf(true) !== -1) {
            gameover() // 游戏结束
            return
        }
    }

    collisionAnimationId = requestAnimationFrame(collisionListener)
}
// #endregion

// #region 键盘跳跃函数
function keyPressJump(key) {
    if (!GLOBAL.isJump) {
        GLOBAL.isJump = true;

        // 成就检查
        achi.achievementCheck()
    }
    dino.keyPressJump(key); // 恐龙跳跃
}

/**
 * 键盘跳跃事件接收
 * @param {object} event 键盘事件
 */
function jumpEvent(event) {
    if (event.key === " ") {
        keyPressJump(event.key)
    }
}

// 键盘跳跃
document.body.addEventListener("keydown", jumpEvent)
// #endregion

// #region 分数记录函数
function scoreCount() {
    sre.scoreCount(GLOBAL.scoreBouns)
}
// #endregion

// #region 资源回收函数
function recycle() {
    bg.recycle()
    cld.recycle()
    dino.recycle()
    sre.recycle()
    obs.recycle()
}
// #endregion

// 游戏开始
gameInit()
