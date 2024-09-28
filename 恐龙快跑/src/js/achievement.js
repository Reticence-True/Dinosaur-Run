// achievement.js
import { GLOBAL } from './global.js';

const achievement = document.querySelector(".achievement-context") // 主成就
const vice = document.querySelector(".vice-context") // 附加信息
const achievementContainer = document.querySelector(".achievement-container")
let achisList = [] // 成就信息
let activeAchisList = [] // 达成的成就列表

// 异步获取成就
function asyncGetAchievements() {
    return new Promise((resolve, reject) => {
        $.get("/achievements", (data, status) => {
            if (status === "success") {
                resolve(data)
            }
        })
    })
}

// 获取成就信息
async function getAchievements() {
    try {
        achisList = JSON.parse(await asyncGetAchievements())
    } catch (e) {
        throw new Error(e)
    }
    return
}

// 成就显示
function showAchievement(achi, vi) {
    achievementContainer.style.display = "block"
    achievement.innerHTML = achi
    vice.innerHTML = vi
}

// 成就隐藏
function hideAchievement() {
    toggleAnimate() // 改变动画
    setTimeout(() => {
        achievementContainer.style.display = "none";
        toggleAnimate()
    }, 500); // 成就异步隐藏
}

// 切换动画
function toggleAnimate() {
    achievementContainer.classList.toggle("animate__fadeInDown")
    achievementContainer.classList.toggle("animate__fadeOutDown")
}

// #region 成就检查函数
function achievementCheck() {
    var showTime = 0; // 成就显示时间
    var achievementDisplaying = 0 // 正在显示的成就数量

    // 成就：月球漫步
    var move2TheMoonObj = move2TheMoon();

    if (move2TheMoonObj && !move2TheMoon.achieving) {
        move2TheMoon.achieving = true
        activeAchisList.push(move2TheMoonObj)
    }
    // 成就：飞入太空
    var flyInSpaceObj = flyInSpace();
    if (flyInSpaceObj && !flyInSpace.achieving) {
        flyInSpace.achieving = true
        activeAchisList.push(flyInSpaceObj)
    }
    // 成就：今日多云
    var cloudsDayObj = cloudsDay();
    if (cloudsDayObj && !cloudsDay.achieving) {
        cloudsDay.achieving = true
        activeAchisList.push(cloudsDayObj)
    }
    // 成就：要下雨了？
    var RainingRainingObj = RainingRaining();
    if (RainingRainingObj && !RainingRainingObj.achieving) {
        RainingRainingObj.achieving = true
        activeAchisList.push(RainingRainingObj)
    }

    // 循环展示
    if (achievementDisplaying >= 0) { // 当没有成就显示时，才重置新成就
        activeAchisList.forEach(e => {
            setTimeout(() => { // 成就显示
                achievementDisplaying-- // p操作
                showAchievement(e.achievementName, e.viceName)
            }, showTime);

            showTime += 3000

            setTimeout(() => { // 延迟显示3s后隐藏
                hideAchievement()
                achievementDisplaying++ // v操作
            }, showTime);

            showTime += 1000

        })
        activeAchisList.length = 0 // 数组清空
        showTime = 0; // 成就显示时间清空
    }
}
// #endregion

// 成就列表
/**
 * 成就：月球漫步
 * @param {number} gravity 重力加速度
 * @param {boolean} isJump 是否跳跃
 * @return {Object}
 */
function move2TheMoon() {
    if (GLOBAL.g === 1.63 && GLOBAL.isJump === true) {
        return achisList.filter(e => e.achievementName === "月球漫步")[0]
    }
    return null
}

/**
 * 成就：飞入太空
 * @param {number} maxHeight 恐龙最大跳跃高度
 * @param {boolean} isJump 是否跳跃
 * @return {Object}
 */
function flyInSpace() {
    if (GLOBAL.maxJumpHeight >= 1500 && GLOBAL.isJump) {
        return achisList.filter(e => e.achievementName === "飞入太空")[0]
    }
    return null
}
/**
 * 成就：今日多云
 * @param {number} maxClouds 场上最大云朵量
 * @param {number} minCloudsDistance 云朵之间距离偏移量
 * @return {Object}
 */
function cloudsDay() {
    if (GLOBAL.maxCloudNum >= 8 && GLOBAL.maxCloudNum <= 10 && GLOBAL.cloudsDistance >= 50 && GLOBAL.cloudsDistance <= 80) {
        return achisList.filter(e => e.achievementName === "今日多云")[0]
    }
    return null
}
/**
 * 成就：要下雨了？
 * @param {number} maxClouds 场上最大云朵量
 * @param {number} minCloudsDistance 云朵之间距离偏移量
 * @return {Object}
 */
function RainingRaining() {
    if (GLOBAL.maxCloudNum >= 13 && GLOBAL.cloudsDistance <= 45) {
        return achisList.filter(e => e.achievementName === "要下雨了？")[0]
    }
    return null
}

export var achi = {
    getAchievements,
    achievementCheck
}