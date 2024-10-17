// 背景地面移动
var ground = document.getElementsByClassName("ground")[0]  // 获取地面元素
var pos = parseInt(getComputedStyle(ground, null)["backgroundPositionX"]) // 获取元素位置

// 移动地面
function groundMove(speed) {
    pos -= speed
    ground.style.backgroundPositionX = pos + "px"
}
// #endregion

/**
 * 播放地面动画
 * @returns 动画对象
 */
function playGroundAnimation(){
    let groundAni = ground.getAnimations().length ? ground.getAnimations()[0] : undefined
    groundAni.play()
    return groundAni
}

/**
 * 资源回收函数
 */
function recycle(){
    pos = undefined
}

export var bg = {
    groundMove, // 地面移动
    playGroundAnimation,
    recycle
}