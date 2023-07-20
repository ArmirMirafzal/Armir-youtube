import { config } from "../utils/config-armir";
import { IApi } from "../utils/types";
import { http } from "./http";

export const GetInVideos = ({ xRapidAPIKey, xRapidAPIHost, part, url, id }: IApi.VideoDetail.GetInVideos.Request) =>
	http.get<IApi.VideoDetail.GetInVideos.Response>(`/${url}`, {
		params: { part, id },
		headers: { [config.Key]: xRapidAPIKey, [config.Host]: xRapidAPIHost },
	});
