// #region 碰撞函数
/* 监听碰撞 */
function listenSpriteCollision() {
    if (obstacleStroage[0] && boundingBox(dinosaur, obstacleStroage[0])) {
        console.log("碰撞");
        gameover();
    } else {
        requestAnimationFrame(listenSpriteCollision);
    }
}
// listenSpriteCollision()

// /* 包围盒检测算法 */
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
// #endregion

// #region canvas的像素级碰撞算法
// function pixelCollision(source, target) {
//     const sourceRect = source.getBoundingClientRect();
//     const targetRect = target.getBoundingClientRect();

//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     canvas.width = Math.max(sourceRect.width, targetRect.width);
//     canvas.height = Math.max(sourceRect.height, targetRect.height);

//     ctx.drawImage(source, 0, 0, sourceRect.width, sourceRect.height);
//     const sourceData = ctx.getImageData(0, 0, sourceRect.width, sourceRect.height).data;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     ctx.drawImage(target, 0, 0, targetRect.width, targetRect.height);
//     const targetData = ctx.getImageData(0, 0, targetRect.width, targetRect.height).data;

//     for (let i = 0; i < sourceData.length; i += 4) {
//         if (sourceData[i + 3] > 0 && targetData[i + 3] > 0) {
//             return true;
//         }
//     }
//     return false;
// }
// // #endregion

// // #region div转canvas
// function divToCanvas(element) {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     canvas.width = element.clientWidth;
//     canvas.height = element.clientHeight;

//     ctx.drawImage(element, 0, 0, canvas.width, canvas.height);

//     return canvas;
// }
// #endregion


export var util = {
    listenSpriteCollision // 碰撞检测函数
}