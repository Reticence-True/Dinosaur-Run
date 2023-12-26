// achievement.js
const achievement = document.querySelector(".achievement-context") // 主成就
const vice = document.querySelector(".vice-context") // 附加信息
const achievementContainer = document.querySelector(".achievement-container")

// 成就显示
function showAchievement(achi, vi) {
    achievementContainer.style.display = "block"
    achievement.innerHTML = achi
    vice.innerHTML = vi
}
// 成就隐藏
function hideAchievement(){
    achievementContainer.style.display = "none"

}

// 成就列表
/**
 * 成就：月球漫步
 * @param {number} gravity 重力加速度
 * @param {boolean} isJump 是否跳跃
 * @return {Object}
 */
function move2TheMoon(gravity, isJump) {

    console.log(gravity, isJump);

    if (gravity === 1.63 && isJump === true) {
        return {
            achi: "月球漫步",
            vice: "我不叫喂，叫我 “嫦娥”"
        }
    }
    return null
}
/**
 * 成就：飞入太空
 * @param {number} maxHeight 恐龙最大跳跃高度
 * @param {boolean} isJump 是否跳跃
 * @return {Object}
 */
function flyInSpace(maxHeight, isJump) {
    if (maxHeight === 1500 && isJump) {
        return {
            achi: "飞入太空",
            vice: "啊？这就上天了？"
        }
    }
    return null
}
/**
 * 成就：今日多云
 * @param {number} maxClouds 场上最大云朵量
 * @param {number} minCloudsDistance 云朵之间距离偏移量
 * @return {Object}
 */
function cloudsDay(gravity, isJump) {
    if (maxClouds >= 8 && maxClouds <= 10 && minCloudsDistance >= 80 && minCloudsDistance <= 100) {
        return {
            achi: "今日多云",
            vice: "啊~我的衣服又晾不干了"
        }
    }
    return null
}
/**
 * 成就：要下雨了？
 * @param {number} maxClouds 场上最大云朵量
 * @param {number} minCloudsDistance 云朵之间距离偏移量
 * @return {Object}
 */
function RainingRaining(gravity, isJump) {
    if (maxClouds >= 13 && mminCloudsDistance <= 50) {
        return {
            achi: "要下雨了？",
            vice: "伞伞，我的伞伞~（可云状）"
        }
    }
    return null
}

export var achi = {
    showAchievement,
    hideAchievement,
    move2TheMoon,
    flyInSpace,
    cloudsDay,
    RainingRaining
}