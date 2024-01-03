// #region 配置文件可修改参数
// 场上同时出现的最大云朵数
let maxCloudNum
// 云朵最大垂直偏移量
let cloudMaxOffset
// 云朵之间距离偏移量
let cloudsDistance
// #endregion

// 获取云朵所在父元素
const cloudFather = document.getElementsByClassName("cloud")[0]
// 云朵数组
const cloudArr = ["cloud1", "cloud2"]
// 存储云朵
var cloudStorage = []
// 保存云朵位置
var cloudPosArr = []

/* 数据传递 */
function getData(tMaxCloudNum, tCloudMaxOffset, tCloudsDistance){
    maxCloudNum = tMaxCloudNum;
    cloudMaxOffset = tCloudMaxOffset;
    cloudsDistance = tCloudsDistance;
}

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
            if (cloudMaxOffset - cloudPosArr[cloudPosArr.length - 1] < cloudsDistance) {
                // 小于 [cloudsDistance] px，删除该云，重新渲染
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
function cloudMove(speed) {
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

export var cld = {
    getData,
    createCloud, // 创造云朵函数
    cloudMove // 云朵移动函数
}
