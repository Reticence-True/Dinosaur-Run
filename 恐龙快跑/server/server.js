/** express */
const express = require("express")
const app = express()
// 端口
const port = 3000
/** path */
const path = require("path")
/**文件 */
const fs = require("fs/promises")

app.use(express.static(path.resolve(__dirname, "../src")))

// 读取成就文件
app.get("/achievements", (req, res) => {
    fs.readFile(`${__dirname}/../achievements.json`, 'utf-8')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            throw new Error(err)
        })
})

// 设置成就文件
app.post("/set-achievements", (req, res) => {
    
})

// 参数配置文件
app.get("/config", (req, res) => {
    fs.readFile(`${__dirname}/../config.json`, 'utf-8')
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        throw new Error(err)
    })
})

app.listen(port, () => {
    console.log(`${port}端口已被监听`);
})