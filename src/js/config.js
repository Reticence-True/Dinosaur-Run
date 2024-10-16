/** 配置文件 */
// 异步获取成就信息
function getAchievements() {
    return new Promise((resolve, reject) => {
        $.get("/achievements", (data, status) => {
            if (status === "success") {
                resolve(data)
            }
        })
    })
}

// 异步更新成就信息
function updateAchievements(achisData) {
    return new Promise((resolve, reject) => {
        $.post("/set-achievements", {achisData: JSON.stringify(achisData)}, (data, status) => {
            if (status === "success") {
                resolve(data)
            }
        })
    })
}

// 异步获取其他配置信息
function getConfigVariables() {
    return new Promise((resolve, reject) => {
        $.get("/config", (data, status) => {
            if (status === "success") {
                resolve(data)
            }
        })
    })
}

export const config = {
    getAchievements,
    updateAchievements,
    getConfigVariables,
}