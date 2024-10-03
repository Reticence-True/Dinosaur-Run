/** 碰撞 */

/**
 * 包围盒检测算法
 * @param {HTMLElement} source 源元素
 * @param {HTMLElement} target 目的元素
 * @returns 是否产生碰撞
 */
function boundingBox(source, target) {
    // 记录原点左上、右下点坐标
    const sourcePos = source.getBoundingClientRect(),
        sLx = sourcePos.left,
        sLy = sourcePos.top,
        sRx = sourcePos.left + sourcePos.width,
        sRy = sourcePos.top + sourcePos.height
        ;
    // 记录目标左上、右下点坐标
    const targetPos = target.getBoundingClientRect(),
        tLx = targetPos.left,
        tLy = targetPos.top,
        tRx = targetPos.left + targetPos.width,
        tRy = targetPos.top + targetPos.height
        ;

    return !(
        (sLx > tRx) ||
        (sRx < tLx) ||
        (sLy > tRy) ||
        (sRy < tLy)
    )
}

export const colli = {
    boundingBox
}