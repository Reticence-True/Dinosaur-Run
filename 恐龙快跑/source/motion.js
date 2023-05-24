
let speed = 3 // 设置速度(默认为3)

// #region 背景地面的移动
let ground = document.getElementsByClassName("ground")[0]  // 获取地面元素
let pos = null

pos = parseInt(getComputedStyle(ground, null)["backgroundPositionX"]) // 获取元素位置
// 移动地面
setInterval(() => {
    pos -= speed
    ground.style.backgroundPositionX = pos + "px"
}, 0);
// #endregion

// #region 背景云朵移动
// 获取云朵所在父元素
const cloudFather = document.getElementsByClassName("cloud")[0]
// 云朵数组
const cloudArr = ["cloud1", "cloud2"]
// 存储云朵
let cloudStorage = []
// 保存云朵位置
let cloudPosArr = []
// 云朵生成时间
let summomInterval

// 创建云朵
setInterval(() => {
    // 云朵生成时间
    summomInterval = Math.floor(Math.random()*8000)
    if(summomInterval < 1000){
        summomInterval += 8000
    }
    // console.log(summomInterval)
    setTimeout(() => {
        // 创建云朵元素
        let cloud = document.createElement("div")
        // 随机数：选择云朵
        let selCloud = Math.round(Math.random())
        // 设置云朵
        cloud.setAttribute("class", cloudArr[selCloud])
        // 随机数：选择数值位置
        let margin = Math.floor(Math.random()*56)
        // 设置云朵位置
        cloud.style.marginTop = margin + "px"
        // 添加云朵到背景中
        cloudFather.appendChild(cloud)
        // 添加云朵到列表中
        cloudStorage.push(cloud)
        // 监测云朵位置
        let cloudPos = parseInt(getComputedStyle(cloud, null)["marginLeft"])
        // 添加云朵位置
        cloudPosArr.push(cloudPos)
    }, summomInterval);
}, 1000);

// 云朵移动
setInterval(() => {
    for(let i = 0; i < cloudStorage.length; i++){
        cloudPosArr[i] -= speed
        cloudStorage[i].style.marginLeft = cloudPosArr[i] + "px"
        if(cloudPosArr[i] < -100){
            cloudFather.removeChild(cloudStorage[i])
            cloudStorage.splice(i, 1)
            cloudPosArr.splice(i, 1)
        }
    }
}, 0);
// #endregion

// #region 小恐龙移动动画
let dinosaur = document.getElementsByClassName("dinosaur")[0]  // 获取小恐龙
// 小恐龙动作偏移量
let dinosaurPos = -1856
// 定时器
let timer = null
function dinosaurMove(){
    dinosaurPos = -1856
    timer = setInterval(() => {
        if(dinosaurPos === -1856){
            // 设置背景偏移量
            dinosaur.style.backgroundPositionX = dinosaurPos + "px"
            dinosaurPos = -1944
        }
        else{
            // 设置背景偏移量
            dinosaur.style.backgroundPositionX = dinosaurPos + "px" 
            dinosaurPos = -1856
        }
    }, 100);
}
dinosaurMove()

/* 小恐龙跳跃动画 */
// 添加键盘监听
let timeout = null
// 节流阀
let animating = false
document.body.addEventListener("keydown", function(event){
    if(event.key == " "){
        if(!animating){
            animating = true
            clearInterval(timer)
            dinosaur.style.backgroundPositionX = -1680 + "px"
            dinosaur.style.animation = "dinosaurJump 600ms 2 alternate"
            if(parseInt(getComputedStyle(dinosaur, null)["marginBottom"]) === 0){
                clearTimeout(timeout)
                timeout = setTimeout(()=>{
                    dinosaur.removeAttribute("style")
                    animating = false
                    dinosaurMove()
                }, 1220)
            }
        }
    }
})
// #endregion

// #region 障碍物
// 获取障碍物所在父元素
const obstacle = document.querySelector(".obstacle")
// 障碍物数组
const obstacleArr = ["s-cactus1", "s-cactus2", "s-cactus3", "s-cactus4", "s-cactus5", "s-cactus6"]
// 存储障碍物
let obstacleStroage = []
// 保存云朵位置
let obstaclePosArr = []

// 创建障碍物
setInterval(() => {
    // 创建障碍物节点
    let obstacleItem = document.createElement("div")
    // 随机数：选择障碍物
    let selObstacle = Math.floor(Math.random()* 6 % 6)
    // 设置障碍物
    obstacleItem.setAttribute("class", obstacleArr[selObstacle])
    // 将障碍物添加到背景中
    obstacle.appendChild(obstacleItem)
    // 添加障碍物到列表中
    obstacleStroage.push(obstacleItem)
    // 监测云朵位置
    let obstaclePos = parseInt(getComputedStyle(obstacleItem, null)["marginLeft"])
    // 添加云朵位置
    obstaclePosArr.push(obstaclePos)
}, 3400);

// 障碍物移动
setInterval(() => {
    for(let i = 0; i < obstacleStroage.length; i++){
        obstaclePosArr[i] -= speed
        obstacleStroage[i].style.marginLeft = obstaclePosArr[i] + "px"
        if(obstaclePosArr[i] < -35){
            obstacle.removeChild(obstacleStroage[i])
            obstacleStroage.splice(i, 1)
            obstaclePosArr.splice(i, 1)
        }
    }
}, 0);

// #endregion
