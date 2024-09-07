/*
 * @Author: kasuie
 * @Date: 2024-08-29 20:24:47
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-29 20:26:01
 * @Description:
 */
import {
  Config,
  OpenAPIRequest,
  C2CAPI,
  GMessageToCreate,
  GMessageRec,
  GFileRec,
  GFileToCreate,
} from "@src/types";
import { RestyResponse } from "@src/client/resty-client";
import { getURL } from "../v1/resource";

export default class C2C implements C2CAPI {
  public request: OpenAPIRequest;
  public config: Config;
  constructor(request: OpenAPIRequest, config: Config) {
    this.request = request;
    this.config = config;
  }

  // 发送消息
  public postMessage(
    userId: string,
    message: GMessageToCreate
  ): Promise<RestyResponse<GMessageRec>> {
    const options = {
      method: "POST" as const,
      url: getURL("c2cMessagesURI"),
      rest: {
        userId,
      },
      data: message,
    };
    return this.request<GMessageRec>(options);
  }

  // 发送文件
  public postFile(
    userId: string,
    fileinfo: GFileToCreate
  ): Promise<RestyResponse<GFileRec>> {
    const options = {
      method: "POST" as const,
      url: getURL("c2cFileURI"),
      rest: {
        userId,
      },
      data: fileinfo,
    };
    return this.request<GFileRec>(options);
  }

  // 撤回消息
  public deleteMessage(
    userId: string,
    messageID: string
  ): Promise<RestyResponse<any>> {
    const params = Object.create(null);
    const options = {
      method: "DELETE" as const,
      url: getURL("c2cMessageURI"),
      rest: {
        userId,
        messageID,
      },
      params,
    };
    return this.request(options);
  }
}
