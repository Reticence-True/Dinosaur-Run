// achievement.js
import { GLOBAL } from './global.js';
import { config } from './config.js';
import { util } from './functions.js';

const achievement = document.querySelector(".achievement-context") // 主成就
const vice = document.querySelector(".vice-context") // 附加信息
const achievementContainer = document.querySelector(".achievement-container")
let achisListObject = {} // 成就信息

// 监听成就数组
class AchievementsList extends Array {
    constructor(...args) {
        super(...args)
        this.isShowing = false // 正在显示成就
    }

    push(...args) {
        super.push(...args)

        // 如果成就没在展示，则显示数组第一个数据
        if (!this.isShowing) {
            this.activeAchievement(this.at(0))
        }
    }

    /**
     * 激活显示成就
     * @param {object} achiInfo 激活的成就信息
     */
    activeAchievement(achiInfo) {
        this.isShowing = true

        // 成就显示
        setTimeout(() => {
            showAchievement(achiInfo.achievementName, achiInfo.viceName)
        }, 0);

        setTimeout(() => { // 延迟显示3s后隐藏
            hideAchievement()
            this.removeAchievement()
        }, 3000);
    }

    /**
     * 移除显示完毕的成就
     */
    removeAchievement() {
        setTimeout(() => { // 延迟0.5s后删除
            this.isShowing = false
            this.shift()

            // 检测成就列表是否为空
            if (this.length) {
                // 继续激活成就显示
                this.activeAchievement(this.at(0))
            }
        }, 500);
    }
}

// 活跃成就数组
let activeAchisList = new AchievementsList()

// 获取成就信息
async function setAchievements() {
    try {
        const tempAchiData = JSON.parse(await config.getAchievements())
        // 转换成就信息
        tempAchiData.reduce((obj, jsonObj) => {
            obj[jsonObj["achievementName"]] = jsonObj
            return obj
        }, achisListObject)
    } catch (e) {
        throw new Error(e)
    }
}

// 写回成就信息
async function writeBackAchievements() {
    try {
        await config.updateAchievements(Object.values(achisListObject))
    } catch(err) {
        throw new Error(e)
    }
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
    // 成就：月球漫步
    var move2TheMoonObj = move2TheMoon();
    if (move2TheMoonObj && !move2TheMoonObj.achieving) {
        move2TheMoonObj.achieving = true
        activeAchisList.push(move2TheMoonObj)
    }
    // 成就：飞入太空
    var flyInSpaceObj = flyInSpace();
    if (flyInSpaceObj && !flyInSpaceObj.achieving) {
        flyInSpaceObj.achieving = true
        activeAchisList.push(flyInSpaceObj)
    }
    // 成就：今日多云
    var cloudsDayObj = cloudsDay();
    if (cloudsDayObj && !cloudsDayObj.achieving) {
        cloudsDayObj.achieving = true
        activeAchisList.push(cloudsDayObj)
    }
    // 成就：要下雨了？
    var rainingRainingObj = rainingRaining();
    if (rainingRainingObj && !rainingRainingObj.achieving) {
        rainingRainingObj.achieving = true
        activeAchisList.push(rainingRainingObj)
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
        return achisListObject["月球漫步"]
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
        return achisListObject["飞入太空"]
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
        return achisListObject["今日多云"]
    }
    return null
}
/**
 * 成就：要下雨了？
 * @param {number} maxClouds 场上最大云朵量
 * @param {number} minCloudsDistance 云朵之间距离偏移量
 * @return {Object}
 */
function rainingRaining() {
    if (GLOBAL.maxCloudNum >= 13 && GLOBAL.cloudsDistance <= 45) {
        return achisListObject["要下雨了？"]
    }
    return null
}

export var achi = {
    setAchievements,
    achievementCheck,
    writeBackAchievements
}