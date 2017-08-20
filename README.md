## wxapp-client-server

### 介绍

前端为微信小程序，后端为NodeJS，数据库采用mongoose，实现获取登录用户基本信息(用户名，头像)，与用户进行聊天的交互活动。

### client

* 在使用微信web开发者工具中，在左边菜单选择“项目”--勾选“开发环境不校验域名、TLS版本以及HTTPS证书”

### server

* 启动mongodb, 示例中数据库路径: `wxapp-client-server/server/database/db`。[MongoDB下载](https://www.mongodb.com/?_ga=2.241050563.1180703629.1503237606-1948362964.1502779194)
* 微信appId,appSecret配置, 配置文件：`wxapp-client-server/server/database/db`
* 启动redis服务：redis-server 
* 进入`server`文件夹
* 启动nodejs: npm run dev
