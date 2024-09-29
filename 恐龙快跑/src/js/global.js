import { config } from './config.js';

/** 全局变量 */
// 全局默认参数
let GLOBALObj = {
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

let GLOBAL = {}

// 全局默认参数
const constGLOBAL = new Proxy(GLOBALObj, {
    get(obj, prop) {
        return obj[prop]
    }
})

/**
 * 设置配置文件参数
 */
async function setConfigVariables() {
    try {
        const varGLOABL = new Proxy(JSON.parse(await config.getConfigVariables()), {
            get(obj, prop) {
                return obj[prop]
            },
            set(obj, prop, nVal) {
                // 检查
                if (typeof nVal === 'number' && nVal >= 0) {
                    obj[prop] = nVal
                } else {
                    obj[prop] = 0
                }
            }
        })

        // 合并参数
        GLOBAL = Object.assign({}, constGLOBAL, varGLOABL)

        return null

    } catch (e) {
        throw new Error(e)
    }
}

export { GLOBAL, setConfigVariables };