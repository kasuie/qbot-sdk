/*
 * @Author: kasuie
 * @Date: 2024-08-29 20:11:46
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-29 20:26:50
 * @Description:
 */
/*
 * @Author: kasuie
 * @Date: 2024-08-29 20:11:46
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-29 20:24:20
 * @Description:
 */
import {
  Config,
  OpenAPIRequest,
  GroupAPI,
  GMessageToCreate,
  GMessageRec,
  GFileRec,
  GFileToCreate,
} from "@src/types";
import { RestyResponse } from "@src/client/resty-client";
import { getURL } from "../v1/resource";

export default class Group implements GroupAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 发送消息
  public postMessage(
    groupId: string,
    message: GMessageToCreate
  ): Promise<RestyResponse<GMessageRec>> {
    const options = {
      method: "POST" as const,
      url: getURL("groupMessagesURI"),
      rest: {
        groupId,
      },
      data: message,
    };
    return this.request<GMessageRec>(options);
  }

  // 发送文件
  public postFile(
    groupId: string,
    fileinfo: GFileToCreate
  ): Promise<RestyResponse<GFileRec>> {
    const options = {
      method: "POST" as const,
      url: getURL("groupFileURI"),
      rest: {
        groupId,
      },
      data: fileinfo,
    };
    return this.request<GFileRec>(options);
  }

  // 撤回消息
  public deleteMessage(
    groupId: string,
    messageID: string
  ): Promise<RestyResponse<any>> {
    const params = Object.create(null);
    const options = {
      method: "DELETE" as const,
      url: getURL("groupMessageURI"),
      rest: {
        groupId,
        messageID,
      },
      params,
    };
    return this.request(options);
  }
}
