/** express */
const express = require("express")
const app = express()
// 端口
const port = 3000
/** path */
const path = require("path")
/**文件 */
const fs = require("fs/promises")
/** post请求体 */
const bodyParser = require("body-parser")

// 默认路径
app.use(express.static(path.resolve(__dirname, "../src")))
// 请求体
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

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
    fs.writeFile(`${__dirname}/../achievements.json`, req.body["achisData"])
    .then((value) => {
        res.send("Update Achievements Success!")
    })
    .catch((err) => {
        throw new Error(err)
    })
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