/*
 * @Author: kasuie
 * @Date: 2024-09-07 15:52:41
 * @LastEditors: kasuie
 * @LastEditTime: 2024-09-07 18:29:29
 * @Description:
 */
const {
  createOpenAPI,
  createWebsocket,
  AvailableIntentsEventsEnum,
} = require("qbot-sdk");
// import {
//   createOpenAPI,
//   createWebsocket,
//   AvailableIntentsEventsEnum,
// } from "qbot-sdk";

const testConfigWs = {
  appID: "",
  token: "",
  intents: [],
  sandbox: true,
};

const client = createOpenAPI(testConfigWs);

const ws = createWebsocket(testConfigWs);

ws.on("READY", (wsdata) => {
  console.log("[READY] 事件接收 :", wsdata);
});

ws.on("ERROR", (data) => {
  console.log("[ERROR] 事件接收 :", data);
});

ws.on(AvailableIntentsEventsEnum.GUILDS, (data) => {
  console.log("[GUILDS] 事件接收 :", data);
});
/** 频道成员 */
ws.on(AvailableIntentsEventsEnum.GUILD_MEMBERS, (data) => {
  console.log("[GUILD_MEMBERS] 事件接收 :", data);
});
/** 消息事件(私域 ) */
ws.on(AvailableIntentsEventsEnum.GUILD_MESSAGES, (data) => {
  console.log("[GUILD_MESSAGES] 事件接收 :", data);
});
/** 消息表情表态 */
ws.on(AvailableIntentsEventsEnum.GUILD_MESSAGE_REACTIONS, (data) => {
  console.log("[GUILD_MESSAGE_REACTIONS] 事件接收 :", data);
});
/** 频道私信消息 */
ws.on(AvailableIntentsEventsEnum.DIRECT_MESSAGE, (data) => {
  console.log("[DIRECT_MESSAGE] 事件接收 :", data);
});
/** 互动事件 */
ws.on(AvailableIntentsEventsEnum.INTERACTION, (data) => {
  console.log("[INTERACTION] 事件接收 :", data);
});
/** 消息审核 */
ws.on(AvailableIntentsEventsEnum.MESSAGE_AUDIT, (data) => {
  console.log("[MESSAGE_AUDIT] 事件接收 :", data);
});
/** 论坛事件(私域) */
ws.on(AvailableIntentsEventsEnum.FORUMS_EVENT, (data) => {
  console.log("[FORUMS_EVENT] 事件接收 :", data);
});
/** 上下麦，音频事件 */
ws.on(AvailableIntentsEventsEnum.AUDIO_ACTION, (data) => {
  console.log("[AUDIO_ACTION] 事件接收 :", data);
});
/** 频道消息(公域) */
ws.on(AvailableIntentsEventsEnum.PUBLIC_GUILD_MESSAGES, async (data) => {
  console.log("[PUBLIC_GUILD_MESSAGES] 事件接收 :", data);
});
/** 单聊消息 */
ws.on(AvailableIntentsEventsEnum.C2C_MESSAGES, async (data) => {
  console.log("[C2C_MESSAGES] 事件接收 :", data);
  /** 发送私聊消息方法 */
  await client.c2cApi.postMessage(data.msg.author.id, {
    content: "发送私聊消息",
    msg_id: data.msg.id,
  });
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
  /** 发送群消息方法 */
  await client.groupApi.postMessage(data.msg.author.id, {
    content: "发送群消息",
    msg_id: data.msg.id,
  });
});
