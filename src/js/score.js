import { GLOBAL } from "./global.js";

const scoreObj = document.querySelectorAll(".score") // 积分对象
let score = 0; // 积分
let numPos = [-1291, -1313, -1332, -1352, -1372, -1392, -1412, -1432, -1452, -1472]; // 积分背景偏移量数组
let scoreLength = scoreObj.length; // 积分对象长度
let animationId = undefined; // 动画请求ID

/**
 * 积分统计函数
 * @param {number} scoreBouns 积分倍率
 * @returns 
 */
function scoreCount(scoreBouns) {
    // 游戏既不暂停，也不结束
    if (GLOBAL.gameStop) {
        cancelAnimationFrame(animationId)
        animationId = undefined
        return
    }
    // 积分添加函数
    scoreAdd(scoreBouns)
    animationId = requestAnimationFrame(() => { scoreCount(scoreBouns) })
}

/**
 * 积分累计函数
 * @param {number} scoreBouns 积分倍率
 */
function scoreAdd(scoreBouns) {
    let tScore = score
    let bitScore = 0; // 分数位
    // 拆分各个分数并记录
    for (let i = 0; i < scoreLength; i++) {
        bitScore = tScore % 10
        tScore = parseInt(tScore / 10)
        if (scoreObj[i])
            scoreObj[i].style.backgroundPosition = `${numPos[bitScore]}px 0`; // 分数渲染
        else
            break
    }
    score += 1 * scoreBouns // 乘以 积分倍率
}

/**
 * 资源回收函数
 */
function recycle(){
    score = undefined
    numPos = null
    scoreLength = undefined
    animationId = undefined
}

export var sre = {
    scoreCount, // 计分板计数
    recycle
}
