/*
 * @Author: kasuie
 * @Date: 2024-08-23 09:13:18
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-29 20:28:51
 * @Description:
 */
/* eslint-disable prefer-promise-reject-errors */
import { register } from "@src/openapi/openapi";
import resty, { RequestOptions, RestyResponse } from "@src/client/resty-client";
import PinsMessage from "./pins-message";
import Reaction from "./reaction";
import Guild from "./guild";
import Channel from "./channel";
import Me from "./me";
import Message from "./message";
import Member from "./member";
import Role from "./role";
import DirectMessage from "./direct-message";
import ChannelPermissions from "./channel-permissions";
import Audio from "./audio";
import Mute from "./mute";
import Announce from "./announce";
import Schedule from "./schedule";
import GuildPermissions from "./guild-permissions";
import Interaction from "./interaction";
import Group from "../v2/group";
import C2C from "../v2/c2c";
import { addUserAgent, addAuthorization, buildUrl } from "@src/utils/utils";
import {
  GuildAPI,
  ChannelAPI,
  MeAPI,
  MessageAPI,
  Config,
  IOpenAPI,
  MemberAPI,
  RoleAPI,
  DirectMessageAPI,
  ChannelPermissionsAPI,
  AudioAPI,
  MuteAPI,
  ScheduleAPI,
  AnnounceAPI,
  GuildPermissionsAPI,
  ReactionAPI,
  PinsMessageAPI,
  InteractionAPI,
  GroupAPI,
  C2CAPI,
} from "@src/types";
export const apiVersion = "v1";
export class OpenAPI implements IOpenAPI {
  static newClient(config: Config) {
    return new OpenAPI(config);
  }

  config: Config = {
    appID: "",
    token: "",
  };
  public guildApi!: GuildAPI;
  public channelApi!: ChannelAPI;
  public meApi!: MeAPI;
  public messageApi!: MessageAPI;
  public memberApi!: MemberAPI;
  public roleApi!: RoleAPI;
  public muteApi!: MuteAPI;
  public announceApi!: AnnounceAPI;
  public scheduleApi!: ScheduleAPI;
  public directMessageApi!: DirectMessageAPI;
  public channelPermissionsApi!: ChannelPermissionsAPI;
  public audioApi!: AudioAPI;
  public reactionApi!: ReactionAPI;
  public interactionApi!: InteractionAPI;
  public pinsMessageApi!: PinsMessageAPI;
  public guildPermissionsApi!: GuildPermissionsAPI;
  public groupApi!: GroupAPI;
  public c2cApi!: C2CAPI;

  constructor(config: Config) {
    this.config = config;
    this.register(this);
  }

  public register(client: IOpenAPI) {
    // 注册聚合client
    client.guildApi = new Guild(this.request, this.config); // 频道
    client.channelApi = new Channel(this.request, this.config); // 子频道
    client.meApi = new Me(this.request, this.config); // 当前用户
    client.messageApi = new Message(this.request, this.config); // 消息
    client.memberApi = new Member(this.request, this.config); // 频道身份组成员
    client.roleApi = new Role(this.request, this.config); // 频道身份组
    client.muteApi = new Mute(this.request, this.config); // 频道禁言
    client.announceApi = new Announce(this.request, this.config); // 频道公告
    client.scheduleApi = new Schedule(this.request, this.config); // 日程
    client.directMessageApi = new DirectMessage(this.request, this.config); // 私信频道
    client.channelPermissionsApi = new ChannelPermissions(
      this.request,
      this.config
    ); // 子频道的权限
    client.audioApi = new Audio(this.request, this.config); // 音频
    client.guildPermissionsApi = new GuildPermissions(
      this.request,
      this.config
    ); // 频道权限
    client.reactionApi = new Reaction(this.request, this.config); // 表情表态
    client.interactionApi = new Interaction(this.request, this.config); // 更新交互数据
    client.pinsMessageApi = new PinsMessage(this.request, this.config); // 精华消息
    client.groupApi = new Group(this.request, this.config); // 群聊
    client.c2cApi = new C2C(this.request, this.config); // 私聊
  }
  // 基础rest请求
  public request<T extends Record<any, any> = any>(
    options: RequestOptions
  ): Promise<RestyResponse<T>> {
    const { appID, token } = this.config;

    options.headers = { ...options.headers };

    // 添加 UA
    addUserAgent(options.headers);
    // 添加鉴权信息
    addAuthorization(options.headers, appID, token);
    // 组装完整Url
    const botUrl = buildUrl(options.url, this.config.sandbox);

    // 简化错误信息，后续可考虑通过中间件形式暴露给用户自行处理
    resty.useRes(
      (result) => result,
      (error) => {
        let traceid = error?.response?.headers?.["x-tps-trace-id"];
        if (error?.response?.data) {
          return Promise.reject({
            ...error.response.data,
            traceid,
          });
        }
        if (error?.response) {
          return Promise.reject({
            ...error.response,
            traceid,
          });
        }
        return Promise.reject(error);
      }
    );

    const client = resty.create(options);
    return client.request<T>(botUrl!, options);
  }
}

export function v1Setup() {
  register(apiVersion, OpenAPI);
}
