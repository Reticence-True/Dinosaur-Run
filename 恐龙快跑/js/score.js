const scoreObj = document.querySelectorAll(".score") // 积分对象
let score = 0; // 积分
const numPos = [-1291, -1313, -1332, -1352, -1372, -1392, -1412, -1432, -1452, -1472]; // 积分背景偏移量数组
const scoreLength = scoreObj.length; // 积分对象长度


function scoreCount(scoreBouns) { // 计分板计数
    const scoreInterval = setInterval(() => {
        scoreAdd(scoreBouns)
    }, 45)
    return scoreInterval
}

function scoreAdd(scoreBouns) {
    let tScore = score
    let bitScore = 0; // 分数位
    // 拆分各个分数并记录
    for (let i = 0; i < scoreLength; i++) {
        bitScore = tScore % 10
        tScore = parseInt(tScore / 10)
        scoreObj[i].style.backgroundPosition = `${numPos[bitScore]}px 0` // 分数渲染
    }
    score += 1 * scoreBouns // 乘以 积分倍率
}

export var sre = {
    scoreCount // 计分板计数
}
