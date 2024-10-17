import { GLOBAL, GAME_STATUS, setConfigVariables } from "./global.js"
import { bg } from "./background.js"
import { cld } from "./cloud.js"
import { dino } from "./dinosaur.js"
import { sre } from "./score.js"
import { obs } from "./obstacle.js"
import { util } from "./functions.js"
import { achi } from "./achievement.js"
import { colli } from "./collision.js"

/** 游戏对象 */
// 游戏就绪
const gameReadyEl = document.querySelector(".game-ready")
const gameReadyPlayEl = document.querySelector(".game-ready .play")

// 游戏开始
const gamePlayEl = document.querySelector(".game-play")

let animationMovingID = undefined // 移动动画帧ID
let spawnIntervalID = undefined // 生成对象定时器函数ID
let collisionAnimationId = undefined // 碰撞监听器ID

// #region 游戏初始化
async function gameInit() {
    // 游戏就绪
    await gameReady()
}
// #endregion

// #region 游戏就绪
async function gameReady() {
    // 设置游戏状态
    GLOBAL.gameStatus = GAME_STATUS.Ready
    // ready内容显示
    gameReadyEl.style.display = "block"
    // play隐藏
    gamePlayEl.style.display = "none"
    // 获取配置信息
    await setConfigVariables()
    // 异步获取成就信息
    await achi.setAchievements()
    // 获取小恐龙信息
    dino.setDinosaur()

    // 添加一次性检测按键抬起开始游戏信号
    document.body.addEventListener("keyup", gamePlayEvent, { once: true })
}
// #endregion

// #region 游戏开始前
function gamePrePlay() {
    // 隐藏游戏就绪
    gameReadyEl.style.display = "none"
    // 显示游戏开始
    gamePlayEl.style.display = "block"
    // 监听游戏背景动画
    let bgAnimate = bg.playGroundAnimation()

    // 恐龙跳跃一下
    dino.keyPressJump();
    // 地面动画结束
    Promise.resolve(bgAnimate.finished).then(() => {
        // 游戏开始
        gamePlay()
    })
}
// #endregion

// #region 游戏开始
function gamePlay() {
    // 设置游戏状态
    GLOBAL.gameStatus = GAME_STATUS.Playing
    spawnObject() // 生成
    move() // 移动
    scoreCount() // 积分开始
    // 成就检查
    achi.achievementCheck()
    // 碰撞监听
    collisionListener()
}
// #endregion

// #region 游戏暂停
function gamePause() {
    // 设置游戏状态
    GLOBAL.gameStatus = GAME_STATUS.Pause
}
// #endregion

// #region 游戏继续
function gameContinue() {
    // 设置游戏状态
    GLOBAL.gameStatus = GAME_STATUS.Playing
    // gamePlay()
}
// #endregion

// #region 游戏结束
function gameover() {
    // 设置游戏状态
    GLOBAL.gameStatus = GAME_STATUS.Over
    // 恐龙动画停止
    dino.dinosaurStop()
    // 写回成就
    achi.writeBackAchievements()
    // 资源回收
    recycle()
}
// #endregion

// #region 移动函数
function move() {
    // 游戏停止
    if (GLOBAL.gameStatus !== GAME_STATUS.Playing) {
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
    if (GLOBAL.gameStatus !== GAME_STATUS.Playing) {
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

// 键盘事件
// 按下
document.body.addEventListener("keydown", keyDownEvent)

// 按下函数
function keyDownEvent(event) {
    if (event.key === " ") {
        // 游戏状态
        // 游戏中
        if (GLOBAL.gameStatus === GAME_STATUS.Playing) {
            // 空格为跳跃
            keyPressJump()
        }
        // 预备状态
        else if (GLOBAL.gameStatus === GAME_STATUS.Ready) {
            // 空格为旋转Play按钮
            gameReadyPlayEl.style.transform = "translate(-50%, -50%) rotate(180deg)"
        }
    }
}

function keyPressJump() {
    dino.keyPressJump(); // 恐龙跳跃
    // 成就检查
    achi.achievementCheck()
}

// #region play点击事件
gameReadyPlayEl.addEventListener("click", gamePlayEvent)
// #endregion

function gamePlayEvent(event) {
    if (event.type === "keyup") {
        if (event.key === " ") {
            // 游戏准备状态
            if (GLOBAL.gameStatus === GAME_STATUS.Ready) {
                // 游戏开始
                gamePrePlay()
            }
        }
    } else {
        // 去掉键盘事件
        document.body.removeEventListener("keyup", gamePlayEvent)
        // 游戏开始
        gamePrePlay()
    }
}

// 游戏开始
gameInit()
