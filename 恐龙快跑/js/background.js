// 背景地面移动
var ground = document.getElementsByClassName("ground")[0]  // 获取地面元素
var pos = parseInt(getComputedStyle(ground, null)["backgroundPositionX"]) // 获取元素位置

// 移动地面
function groundMove(speed) {
    pos -= speed
    ground.style.backgroundPositionX = pos + "px"
}
// #endregion

export var bg = {
    groundMove // 地面移动
}