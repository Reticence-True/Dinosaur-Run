// 设置小恐龙最大跳跃高度 (单位：px)
const maxJumpHeight = 130
const g = 9.8 // 重力加速度
var dinosaur = document.getElementsByClassName("dinosaur")[0]  // 获取小恐龙
// 节流阀
var animating = false
// 设置小恐龙跳跃时初速度
var vertivalInitVelocity = Math.sqrt(2 * g * maxJumpHeight)

/* 小恐龙跳跃动画 */
// 小恐龙跳跃函数
function dinosaurJump(initVelocity, initTime) {
    dinosaurUpJump(initVelocity, initTime)
}

// 向上跳跃
function dinosaurUpJump(initVelocity, initTime) {
    var height = initVelocity * initTime - 0.5 * g * initTime * initTime
    var v = initVelocity - g * initTime
    dinosaur.style.marginBottom = height + "px"
    initTime += 0.08
    if (v > 0) {
        requestAnimationFrame(() => {
            dinosaurUpJump(initVelocity, initTime)
        })
    } else {
        requestAnimationFrame(() => {
            dinosaurDownFall(initVelocity, 0, height)
        })
    }
}

// 自由落体
function dinosaurDownFall(initVelocity, initTime, maxHeight) {
    var height = maxHeight - 0.5 * g * initTime * initTime
    var v = g * initTime
    dinosaur.style.marginBottom = height + "px"
    initTime += 0.08
    if (v <= initVelocity) {
        requestAnimationFrame(() => {
            dinosaurDownFall(initVelocity, initTime, maxHeight)
        })
    } else {
        dinosaur.style.marginBottom = 0
        animating = false
        dinosaur.style.animationName = "dinosaurRun"
    }
}

// 添加键盘监听
document.body.addEventListener("keydown", function (event) {
    if (event.key == " ") {
        if (!animating) {
            animating = true
            dinosaur.style.animationName = "dinosaurJump" // 小恐龙站立动画
            dinosaurJump(vertivalInitVelocity, 0)
        }
    }
})

export var dino = {
    dinosaurJump // 恐龙跳跃函数
}
