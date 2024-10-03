import { GLOBAL } from "./global.js"

let dinosaur = document.getElementsByClassName("dinosaur")[0]  // 获取小恐龙

// 设置小恐龙跳跃时初速度
let vertivalInitVelocity = undefined

// 节流阀
let animating = false
let animationJumpId = undefined; // 动画请求ID
let animationRunId = undefined; // 动画请求ID

// 设置参数
function setDinosaur() {
    // 初速度
    vertivalInitVelocity = Math.sqrt(2 * GLOBAL.g * GLOBAL.maxJumpHeight)
}

/**
 * 小恐龙碰撞箱
 * @returns 恐龙碰撞箱列表
 */
function dinosaurCollisionBox() {
    // 头部碰撞箱
    const headCollisionBox = dinosaur.querySelector(".collision-head-box")
    // 身体碰撞箱
    const topBodyCollisionBox = dinosaur.querySelector(".collision-body-box")
    const handCollisionBox = dinosaur.querySelector(".collision-hand-box")
    const btnBodyCollisionBox = dinosaur.querySelector(".collision-btm-body-box")
    // 脚碰撞箱
    const footCollisionBox = dinosaur.querySelector(".collision-foot-box")
    return [headCollisionBox,
        topBodyCollisionBox, handCollisionBox, btnBodyCollisionBox, footCollisionBox]
}

/* 小恐龙跳跃动画 */
// 小恐龙跳跃函数
function dinosaurJump(initVelocity, initTime) {
    dinosaurUpJump(initVelocity, initTime)
}

// 向上跳跃
function dinosaurUpJump(initVelocity, initTime) {
    var height = initVelocity * initTime - 0.5 * GLOBAL.g * initTime * initTime
    var v = initVelocity - GLOBAL.g * initTime
    dinosaur.style.transform = `translateY(-${height}px)`
    initTime += 0.08

    // 游戏停止
    if (GLOBAL.gameStop) {
        return
    }

    if (v > 0) {
        animationJumpId = requestAnimationFrame(() => {
            cancelAnimationFrame(animationRunId)
            animationRunId = undefined
            dinosaurUpJump(initVelocity, initTime)
        })
    } else {
        animationRunId = requestAnimationFrame(() => {
            cancelAnimationFrame(animationJumpId)
            animationJumpId = undefined
            dinosaurDownFall(initVelocity, 0, height)
        })
    }
}

// 自由落体
function dinosaurDownFall(initVelocity, initTime, maxHeight) {
    var height = maxHeight - 0.5 * GLOBAL.g * initTime * initTime
    var v = GLOBAL.g * initTime
    dinosaur.style.transform = `translateY(-${height}px)`
    initTime += 0.08

    // 游戏停止
    if (GLOBAL.gameStop) {
        return
    }

    if (v <= initVelocity) {
        requestAnimationFrame(() => {
            dinosaurDownFall(initVelocity, initTime, maxHeight)
        })
    } else {
        dinosaur.style.transform = `translateY(0)`
        animating = false
        GLOBAL.isJump = false
        dinosaur.style.animationName = "dinosaurRun"
    }
}

// 键盘跳跃
function keyPressJump(key) {
    if (key == " ") {
        if (!animating) {
            animating = true
            GLOBAL.isJump = true
            dinosaur.style.animationName = "dinosaurJump" // 小恐龙站立动画
            dinosaurJump(vertivalInitVelocity, 0)
        }
    }
}

/**
 * 恐龙动画停止
 */
function dinosaurStop() {
    dinosaur.style.animationName = "dinosaurJump" // 小恐龙站立动画
    cancelAnimationFrame(animationJumpId)
    cancelAnimationFrame(animationRunId)
}

/**
 * 资源回收函数
 */
function recycle() {
    vertivalInitVelocity = undefined
    animating = undefined
    animationJumpId = undefined
    animationRunId = undefined
}


export var dino = {
    keyPressJump,
    dinosaurStop,
    setDinosaur,
    dinosaurCollisionBox,
    recycle
}
