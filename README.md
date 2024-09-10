# QQ 机器人 Node SDK: qbot-sdk ✨

基于 [官方 SDK](https://github.com/tencent-connect/bot-node-sdk) ，由于官方长期未更新，缺少很多新的东西，所以增加了群消息接收与发送功能，由此拓展封装了一下。

# 使用方法

## 安装

```shell
npm i qbot-sdk
```

## 引用

> 可参见代码仓库目录[example](/example)中样例

```js
const {
  createOpenAPI,
  createWebsocket,
  AvailableIntentsEventsEnum,
} = require("qq-bot-sdk"); // commonjs引用方法

import {
  createOpenAPI,
  createWebsocket,
  AvailableIntentsEventsEnum,
} from "qq-bot-sdk"; // es引用方法

const testConfigWs = {
  appID: "APPID",
  token: "TOKEN",
  intents: [AvailableIntentsEventsEnum.GUILD_MESSAGES], // 设置监听类型
};

const client = createOpenAPI(testConfigWs); // 创建client实例（用于发送消息）
const ws = createWebsocket(testConfigWs); // 创建ws实例（用于接收消息）
```

## 新增 群&私聊 场景下，事件及方法

群聊场景下请使用 `client.groupApi`，私聊场景下请使用 `client.c2cApi`，后方内容基本相同

```js
/** 单聊消息 */
ws.on(AvailableIntentsEventsEnum.C2C_MESSAGES, async (data) => {
  console.log("[C2C_MESSAGES] 事件接收 :", data);
});
/** 单聊操作 */
ws.on(AvailableIntentsEventsEnum.C2C_ACTION, (data) => {
  console.log("[C2C_ACTION] 事件接收 :", data);
});
/** 群聊操作 */
ws.on(AvailableIntentsEventsEnum.GROUP_ACTION, (data) => {
  console.log("[GROUP_ACTION] 事件接收 :", data);
});
/** 群聊消息 */
ws.on(AvailableIntentsEventsEnum.GROUP_MESSAGES, async (data) => {
  console.log("[GROUP_MESSAGES] 事件接收 :", data);
});
```

其他方法和事件请查看[官方文档](https://bot.q.qq.com/wiki/develop/nodesdk/)，与官方文档保持一致。

# 注意

本 SDK 带来的所有影响与官方无关。
