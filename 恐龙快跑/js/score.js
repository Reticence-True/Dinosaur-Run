const scoreObj = document.querySelectorAll(".score") // 积分对象
let score = 0; // 积分
const numPos = [-1291, -1313, -1332, -1352, -1372, -1392, -1412, -1432, -1452, -1472]; // 积分背景偏移量数组


function scoreCount(scoreObj, score) { // 计分板计数
    scoreObj[0].style.backgroundPosition = `${numPos[score]}px 0`
}

export var sre = {
    scoreCount // 计分板计数
}
