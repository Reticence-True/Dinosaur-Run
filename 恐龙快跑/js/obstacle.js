// 获取障碍物所在父元素
const obstacle = document.querySelector(".obstacle")
// 障碍物数组
const obstacleArr = ["s-cactus1", "s-cactus2", "s-cactus3", "s-cactus4", "s-cactus5", "s-cactus6"]
// 存储障碍物
var obstacleStroage = []
// 保存障碍物位置
var obstaclePosArr = []
// 场上同时出现的最大障碍物数
const maxObstacleNum = 1

// 创建障碍物
function createObstacle() {
    // console.log(summomInterval)
    if (obstacleStroage && obstacleStroage.length < maxObstacleNum) {
        // 创建障碍物节点
        var obstacleItem = document.createElement("div")
        // 随机数：选择障碍物
        var selObstacle = Math.floor(Math.random() * 6 % 6)
        // 设置障碍物
        obstacleItem.setAttribute("class", obstacleArr[selObstacle])
        // 将障碍物添加到背景中
        obstacle.appendChild(obstacleItem)
        // 添加障碍物到列表中
        obstacleStroage.push(obstacleItem)
        // 监测障碍物位置
        var obstaclePos = parseInt(getComputedStyle(obstacleItem, null)["marginLeft"])
        // 添加障碍物位置
        obstaclePosArr.push(obstaclePos)
    }
}

// 障碍物移动
function obstacleMove(speed) {
    for (var i = 0; i < obstacleStroage.length; i++) {
        obstaclePosArr[i] -= speed
        obstacleStroage[i].style.marginLeft = obstaclePosArr[i] + "px"
        // console.log(obstacleStroage[i].offsetLeft);
        if (obstaclePosArr[i] < -35) {
            obstacle.removeChild(obstacleStroage[i])
            obstacleStroage.splice(i, 1)
            obstaclePosArr.splice(i, 1)
        }
    }
}

export var obs = {
    createObstacle, // 障碍物创造函数
    obstacleMove // 障碍物移动函数
}
