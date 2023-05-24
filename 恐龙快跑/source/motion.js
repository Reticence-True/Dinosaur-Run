// #region 全局变量
const  // 设置速度(默认为3)
    g = 9.8 // 重力加速度
    ;
var speed = 3
// #endregion

// #region 背景物体生成时间
// 物体生成时间
var summomInterval = 0, preSummonInterval = 0

function spawnObject() {
    summomInterval = Math.floor(Math.random() * 5000)
    if (Math.abs(preSummonInterval - summomInterval) <= 3500) {
        preSummonInterval = summomInterval
    } else {
        // console.log("生成");
        createObstacle()
        createCloud()
    }
}
var summonTimer = setInterval(spawnObject, 10)

// #endregion

// #region 背景地面的移动
var ground = document.getElementsByClassName("ground")[0]  // 获取地面元素
var pos = null

pos = parseInt(getComputedStyle(ground, null)["backgroundPositionX"]) // 获取元素位置
// 移动地面
function groundMove() {
    pos -= speed
    ground.style.backgroundPositionX = pos + "px"
}
// #endregion

// #region 背景云朵移动
// 获取云朵所在父元素
const cloudFather = document.getElementsByClassName("cloud")[0]
// 云朵数组
const cloudArr = ["cloud1", "cloud2"]
// 存储云朵
var cloudStorage = []
// 保存云朵位置
var cloudPosArr = []
// 场上同时出现的最大云朵数
var maxCloudNum = 4
// 云朵最大偏移量
var cloudMaxOffset = 921

// 创建云朵
function createCloud() {
    // 不超过最大云朵数，添加云朵
    if (cloudStorage && cloudStorage.length < maxCloudNum) {
        // 创建云朵元素
        var cloud = document.createElement("div")
        // 随机数：选择云朵
        var selCloud = Math.round(Math.random())
        // 设置云朵
        cloud.setAttribute("class", cloudArr[selCloud])

        // 检测本云朵与上一个云朵之间的距离
        if (cloudStorage.length >= 1) {
            if (cloudMaxOffset - cloudPosArr[cloudPosArr.length - 1] < 400) {
                // 小于100px，删除该云，重新渲染
                cloud = null
                return
            }
        }

        // 随机数：随机云朵高度
        var margin = Math.floor(Math.random() * 56)
        // 设置云朵位置
        cloud.style.marginTop = margin + "px"
        // 添加云朵到列表中
        cloudStorage.push(cloud)
        // 添加云朵到背景中
        cloudFather.appendChild(cloud)
        // 监测云朵位置
        var cloudPos = parseInt(getComputedStyle(cloud, null)["marginLeft"])
        // 添加云朵位置
        cloudPosArr.push(cloudPos)
    }
}

// 云朵移动
function cloudMove() {
    for (var i = 0; i < cloudStorage.length; i++) {
        cloudPosArr[i] -= speed
        cloudStorage[i].style.marginLeft = cloudPosArr[i] + "px"
        if (cloudPosArr[i] < -100) {
            cloudFather.removeChild(cloudStorage[i])
            cloudStorage.splice(i, 1)
            cloudPosArr.splice(i, 1)
        }
    }
}

// #endregion

// #region 障碍物
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
function obstacleMove() {
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
// #endregion

// #region 小恐龙移动动画
var dinosaur = document.getElementsByClassName("dinosaur")[0]  // 获取小恐龙

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
// 节流阀
var animating = false
// 设置小恐龙最大跳跃高度 (单位：px)
const maxJumpHeight = 130
// 设置小恐龙跳跃时初速度
var vertivalInitVelocity = Math.sqrt(2 * g * maxJumpHeight)

document.body.addEventListener("keydown", function (event) {
    if (event.key == " ") {
        if (!animating) {
            animating = true
            dinosaur.style.animationName = "dinosaurJump" // 小恐龙站立动画
            dinosaurJump(vertivalInitVelocity, 0)
        }
    }
})
// #endregion

// #region 移动函数
function move() {
    groundMove()
    cloudMove()
    obstacleMove()
    requestAnimationFrame(move)
}
move()
// #endregion

// #region
/* 监听碰撞 */
function listenSpriteCollision() {
    console.log(pixelCollision(divToCanvas(dinosaur), divToCanvas(obstacleStroage[0])));
    if (obstacleStroage[0] && pixelCollision(divToCanvas(dinosaur), divToCanvas(obstacleStroage[0]))) {
        console.log("碰撞");
        gameover();
    }
    requestAnimationFrame(listenSpriteCollision);
}
listenSpriteCollision()

// // /* 包围盒检测算法 */
// function boundingBox(source, target) {
//     // 记录原点左上、右下点坐标
//     const sourcePos = source.getBoundingClientRect(),
//         sLx = sourcePos.left,
//         sLy = sourcePos.top,
//         sRx = sourcePos.left + sourcePos.width,
//         sRy = sourcePos.top + sourcePos.height
//         ;
//     // 记录目标左上、右下点坐标
//     const targetPos = target.getBoundingClientRect(),
//         tLx = targetPos.left,
//         tLy = targetPos.top,
//         tRx = targetPos.left + targetPos.width,
//         tRy = targetPos.top + targetPos.height
//         ;

//     return !(
//         (sLx > tRx) ||
//         (sRx < tLx) ||
//         (sLy > tRy) ||
//         (sRy < tLy)
//     )
// }
// // #endregion

function pixelCollision(source, target) {
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = Math.max(sourceRect.width, targetRect.width);
    canvas.height = Math.max(sourceRect.height, targetRect.height);

    ctx.drawImage(source, 0, 0, sourceRect.width, sourceRect.height);
    const sourceData = ctx.getImageData(0, 0, sourceRect.width, sourceRect.height).data;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(target, 0, 0, targetRect.width, targetRect.height);
    const targetData = ctx.getImageData(0, 0, targetRect.width, targetRect.height).data;

    for (let i = 0; i < sourceData.length; i += 4) {
        if (sourceData[i + 3] > 0 && targetData[i + 3] > 0) {
            return true;
        }
    }
    return false;
}

// #region div转canvas
function divToCanvas(element) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = element.clientWidth;
    canvas.height = element.clientHeight;

    ctx.drawImage(element, 0, 0, canvas.width, canvas.height);

    return canvas;
}
// #endregion

// #region 游戏结束
function gameover() {
    // 背景移动降为0
    speed = 0
    // 恐龙停止走动
    dinosaur.style.animationName = "dinosaurRun"
}

// #endregion