import http from "services/http";

import { config } from "../../utils/config-armir";

import { Types } from ".";

export const GetInVideos = ({ xRapidAPIKey, xRapidAPIHost, part, url, id }: Types.IApi.VideoDetail.GetInVideos.Request) =>
  http.get<Types.IApi.VideoDetail.GetInVideos.Response>(`/${url}`, {
    params: { part, id },
    headers: { [config.Key]: xRapidAPIKey, [config.Host]: xRapidAPIHost },
  });

export const GetChannel = ({ xRapidAPIKey, xRapidAPIHost, part, url, id }: Types.IApi.Channel.GetChannel.Request) =>
  http.get<Types.IApi.Channel.GetChannel.Response>(`/${url}`, {
    params: { part, id },
    headers: { [config.Key]: xRapidAPIKey, [config.Host]: xRapidAPIHost },
  });

export const Suggested = ({ xRapidAPIKey, xRapidAPIHost, maxResults, url }: Types.IApi.Video.Suggested.Request) =>
  http.get<Types.IApi.Video.Suggested.Response>(`/${url}`, {
    params: { maxResults },
    headers: { [config.Key]: xRapidAPIKey, [config.Host]: xRapidAPIHost },
  });
