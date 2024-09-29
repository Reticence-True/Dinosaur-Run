import { GLOBAL } from "./global.js"

// 获取云朵所在父元素
const cloudFather = document.getElementsByClassName("cloud")[0]
// 云朵数组
var cloudArr = ["cloud1", "cloud2"]
// 存储云朵
var cloudStorage = []
// 保存云朵位置
var cloudPosArr = []

// 创建云朵
function createCloud() {
    // 不超过最大云朵数，添加云朵
    if (cloudStorage && cloudStorage.length < GLOBAL.maxCloudNum) {
        // 创建云朵元素
        let cloud = document.createElement("div")
        // 随机数：选择云朵
        let selCloud = Math.round(Math.random())
        // 随机数：生成云朵位置偏移
        // let spawnCloudOffset = Math.round(Math.random() * 2000)
        let spawnCloudOffset = 0

        // 设置云朵
        cloud.setAttribute("class", cloudArr[selCloud])

        // 随机数：随机云朵高度
        var margin = Math.floor(Math.random() * 56)
        // 设置云朵位置
        cloud.style.marginTop = margin + "px"
        // 添加云朵到背景中
        cloudFather.appendChild(cloud)
        // 监测云朵位置

        var cloudPos = parseFloat(getComputedStyle(cloud, null)["transform"].split(',')[4])
        // 检测本云朵与上一个云朵之间的距离
        if (cloudStorage.length >= 1) {
            if (cloudPos - cloudPosArr[cloudPosArr.length - 1] <= (GLOBAL.cloudsDistance + spawnCloudOffset)) {
                // 小于 [GLOBAL.cloudsDistance] px，删除该云，重新渲染
                cloud.remove()
                cloud = null
                return
            }
        }

        // 添加云朵到列表中
        cloudStorage.push(cloud)
        // 添加云朵位置
        cloudPosArr.push(cloudPos)
    }
}

// 云朵移动
function cloudMove(speed) {
    for (var i = 0; i < cloudStorage.length; i++) {
        cloudPosArr[i] -= speed
        cloudStorage[i].style.transform = `translateX(${cloudPosArr[i]}px)`
        if (cloudPosArr[i] < -100) {
            cloudFather.removeChild(cloudStorage[i])
            cloudStorage.splice(i, 1)
            cloudPosArr.splice(i, 1)
        }
    }
}

/**
 * 资源回收函数
 */
function recycle() {
    cloudArr = null
    cloudStorage = null
    cloudPosArr = null
}

export var cld = {
    createCloud, // 创造云朵函数
    cloudMove, // 云朵移动函数
    recycle
}
