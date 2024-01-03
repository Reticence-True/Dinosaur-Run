// achievement.js
const achievement = document.querySelector(".achievement-context") // 主成就
const vice = document.querySelector(".vice-context") // 附加信息
const achievementContainer = document.querySelector(".achievement-container")
const achisList = []; // 获得成就队列

// 设置小恐龙最大跳跃高度 (单位：px)
let scoreBouns; // 积分倍率
let maxJumpHeight; // 默认为 180
let g; // 重力加速度 // 默认为 9.8
let isJump;
// 场上同时出现的最大云朵数
let maxCloudNum; // 默认 5
// 云朵最大垂直偏移量
let cloudMaxOffset;
// 云朵之间距离偏移量
let cloudsDistance; // 默认 400
// #endregions

/* 数据传递 */
function getData(tMaxJumpHeight, tG, tMaxCloudNum, tCloudMaxOffset, tCloudsDistance) {
    maxJumpHeight = tMaxJumpHeight
    g = tG
    maxCloudNum = tMaxCloudNum
    cloudMaxOffset = tCloudMaxOffset
    cloudsDistance = tCloudsDistance
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
    var achievementDsiplaying = 0 // 正在显示的成就数量

    setInterval(() => { // 每 500ms 检查一次成就
        // 成就：月球漫步
        var move2TheMoon = achi.move2TheMoon(g, isJump);
        console.log("move2TheMoon", move2TheMoon);
        if (move2TheMoon) {
            achisList.push(move2TheMoon)
            isJump = false
        }
        // 成就：飞入太空
        var flyInSpace = achi.flyInSpace(maxJumpHeight, isJump);
        if (move2TheMoon) {
            achisList.push(flyInSpace)
            isJump = false
        }
        // 成就：今日多云
        var cloudsDay = achi.cloudsDay(g, isJump);
        if (cloudsDay) {
            achisList.push(cloudsDay)
        }
        // 成就：要下雨了？
        var RainingRaining = achi.RainingRaining(g, isJump);
        if (RainingRaining) {
            achisList.push(RainingRaining)
        }

        if (achievementDsiplaying >= 0) { // 当没有成就显示时，才重置新成就
            achisList.forEach(e => {
                setTimeout(() => { // 成就显示
                    achievementDsiplaying-- // p操作
                    achi.showAchievement(e.achi, e.vice)
                }, showTime);

                showTime += 3000

                setTimeout(() => { // 延迟显示3s后隐藏
                    achi.hideAchievement()
                    achievementDsiplaying++ // v操作
                }, showTime);

                showTime += 1000

            })
            achisList.length = 0 // 数组清空
            showTime = 0; // 成就显示时间清空
        }
    }, 500);
}
// #endregion

// 成就列表
/**
 * 成就：月球漫步
 * @param {number} gravity 重力加速度
 * @param {boolean} isJump 是否跳跃
 * @return {Object}
 */
function move2TheMoon(gravity, isJump) {
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
function cloudsDay(maxClouds, minCloudsDistance) {
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
function RainingRaining(maxClouds, minCloudsDistance) {
    if (maxClouds >= 13 && mminCloudsDistance <= 50) {
        return {
            achi: "要下雨了？",
            vice: "伞伞，我的伞伞~（可云状）"
        }
    }
    return null
}

export var achi = {
    getData,
    showAchievement,
    hideAchievement,
    achievementCheck,
    move2TheMoon,
    flyInSpace,
    cloudsDay,
    RainingRaining
}