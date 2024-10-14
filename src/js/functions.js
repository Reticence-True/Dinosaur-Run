/**
 * 将 Json对象转为 Js对象
 * @param {string} key 作为结果 Object 的键
 * @param {object} jsonObj json格式的 Object
 * @returns key和 jsonObj 组成的 Object
 */
function jsonObj2Obj(key, jsonObj) {
    return eval(`{${key}: ${jsonObj}}`)
}

export var util = {
    jsonObj2Obj
}