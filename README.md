## Game

无聊写的小游戏

## 企划

### 恐龙快跑 v0.1.0

原生HTML + NodeJS + WebSocket + Express

1. 完善基本功能：积分板(2024-9-27完成)，碰撞，游戏结束、暂停和开始
2. 增加配置文件：json格式保存（部分参数可修改）
3. 成就系统（修改配置文件）：

    > - 重力加速度改为 1.63 m/s²，并按跳跃键，获得成就——月球漫步：我不叫喂，叫我 “嫦娥”
    > - 将恐龙跳跃高度调整至 1500m 以上，再按跳跃，获得成就——飞入太空：啊？这就上天了？
    > - 将 “场上最大云朵量” 改为 8-10 朵，“云朵之间距离偏移量” 改为 50-80，获得成就——今日多云：啊~我的衣服又晾不干了
    > - 将 “场上最大云朵量” 改为 13 朵及以上，“云朵之间距离偏移量” 改为 45 以下，获得成就——要下雨了？：伞伞，我的伞伞~（可云状）
    > - （暂定）将速度调为5以上，获得成就——飞一般的感觉：我滴妈呀~这也太~刺~激~了~
    
4. 配置文件说明：

    > - scoreBouns 积分倍率
    > - maxJumpHeight 最大跳跃高度，默认为 180
    > - g 重力加速度，默认为 9.8
    > - maxCloudNum 场上同时出现的最大云朵数，默认 5
    > - cloudsDistance 云朵之间距离偏移量，默认 350
    
