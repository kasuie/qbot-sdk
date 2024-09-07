/*
 * @Author: kasuie
 * @Date: 2024-08-22 20:08:10
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-29 20:25:30
 * @Description:
 */
const apiMap = {
  guildURI: "/guilds/:guildID",
  guildMembersURI: "/guilds/:guildID/members",
  guildMemberURI: "/guilds/:guildID/members/:userID",
  channelsURI: "/guilds/:guildID/channels",
  channelURI: "/channels/:channelID",
  guildAnnouncesURI: "/guilds/:guildID/announces",
  guildAnnounceURI: "/guilds/:guildID/announces/:messageID",
  channelAnnouncesURI: "/channels/:channelID/announces",
  channelAnnounceURI: "/channels/:channelID/announces/:messageID",
  messagesURI: "/channels/:channelID/messages",
  messageURI: "/channels/:channelID/messages/:messageID",
  userMeURI: "/users/@me",
  userMeGuildsURI: "/users/@me/guilds",
  muteURI: "/guilds/:guildID/mute",
  muteMemberURI: "/guilds/:guildID/members/:userID/mute",
  muteMembersURI: "/guilds/:guildID/mute",
  gatewayURI: "/gateway",
  gatewayBotURI: "/gateway/bot",
  audioControlURI: "/channels/:channelID/audio",
  rolesURI: "/guilds/:guildID/roles",
  roleURI: "/guilds/:guildID/roles/:roleID",
  memberRoleURI: "/guilds/:guildID/members/:userID/roles/:roleID",
  userMeDMURI: "/users/@me/dms",
  dmsURI: "/dms/:guildID/messages",
  channelPermissionsURI: "/channels/:channelID/members/:userID/permissions",
  channelRolePermissionsURI: "/channels/:channelID/roles/:roleID/permissions",
  schedulesURI: "/channels/:channelID/schedules",
  scheduleURI: "/channels/:channelID/schedules/:scheduleID",
  guildPermissionURI: "/guilds/:guildID/api_permission",
  guildPermissionDemandURI: "/guilds/:guildID/api_permission/demand",
  wsInfo: "/gateway/bot",
  reactionURI:
    "/channels/:channelID/messages/:messageID/reactions/:emojiType/:emojiID",
  pinsMessageIdURI: "/channels/:channelID/pins/:messageID",
  pinsMessageURI: "/channels/:channelID/pins",
  interactionURI: "/interactions/:interactionID",
  guildVoiceMembersURI: "/channels/:channelID/voice/members", // 语音子频道在线成员车查询
  botMic: "/channels/:channelID/mic", // 机器人上麦|下麦
  groupMessagesURI: "/v2/groups/:groupId/messages", // 发送群消息
  groupMessageURI: "/v2/groups/:groupId/messages/:messageID", // 群消息撤回
  groupFileURI: "/v2/groups/:groupId/files", // 上传图片
  c2cMessagesURI: "/v2/users/:userId/messages", // 发送私聊消息
  c2cMessageURI: "/v2/users/:userId/messages/:messageID", // 私聊消息撤回
  c2cFileURI: "/v2/users/:userId/files", // 上传图片
};
export const getURL = (endpoint: keyof typeof apiMap) => apiMap[endpoint];
