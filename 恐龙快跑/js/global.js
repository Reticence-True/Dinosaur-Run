/** 全局变量 */
let GLOBALObj = {
    // #region 配置文件可修改参数
    // 设置小恐龙最大跳跃高度 (单位：px)
    scoreBouns: 1, // 积分倍率
    maxJumpHeight: 180, // 默认为 180
    g: 9.8, // 重力加速度 // 默认为 9.8
    isJump: false,
    // 场上同时出现的最大云朵数
    maxCloudNum: 5, // 默认 5
    // 云朵之间距离偏移量
    cloudsDistance: 150, // 默认 150
    // #endregion

    speed: 3, // 物体移动像素
    // 物体生成时间
    summomInterval: 0,
    preSummonInterval: 0
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