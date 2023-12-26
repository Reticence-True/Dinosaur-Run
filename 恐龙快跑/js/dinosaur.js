// 设置小恐龙最大跳跃高度 (单位：px)
let maxJumpHeight
let g // 重力加速度

var dinosaur = document.getElementsByClassName("dinosaur")[0]  // 获取小恐龙
var vertivalInitVelocity // 设置小恐龙跳跃时初速度
// 节流阀
var animating = false

/* 数据传递 */
function getData(tmaxJumpHeight, tg){
    maxJumpHeight = tmaxJumpHeight;
    g = tg;
    vertivalInitVelocity = Math.sqrt(2 * g * maxJumpHeight) // 设置小恐龙跳跃时初速度
}

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

// 键盘跳跃
function keyPressJump(key){
    if (key == " ") {
        if (!animating) {
            animating = true
            dinosaur.style.animationName = "dinosaurJump" // 小恐龙站立动画
            dinosaurJump(vertivalInitVelocity, 0)
        }
    }
}

export var dino = {
    getData,
    dinosaurJump, // 恐龙跳跃函数
    keyPressJump
}
