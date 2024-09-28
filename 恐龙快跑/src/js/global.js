/** 全局变量 */
let GLOBALObj = {
    // #region 配置文件可修改参数
    // 设置小恐龙最大跳跃高度 (单位：px)
    scoreBouns: 0.5, // 积分倍率
    maxJumpHeight: 180, // 默认为 180
    g: 1.63, // 重力加速度 // 默认为 9.8
    isJump: false,
    // 场上同时出现的最大云朵数
    maxCloudNum: 10, // 默认 5
    // 云朵之间距离偏移量
    cloudsDistance: 60, // 默认 350
    // #endregion

    // 物体移动像素
    speed: 3,
    // 监测是否跳跃
    isJump: false,
    // 物体生成时间
    summomInterval: 0,
    preSummonInterval: 0,
    // 游戏停止标志
    gameStop: false,
}

// 代理
const GLOBAL = new Proxy(GLOBALObj, {
    get(obj, prop){
        return obj[prop]
    },
    set(obj, prop, nVal){
        obj[prop] = nVal
        return true
    }
})

export { GLOBAL };