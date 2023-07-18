import { config } from "../utils/config-armir";
import { IApi } from "../utils/types";
import { http } from "./http";

export const Suggested = ({
	xRapidAPIKey,
	xRapidAPIHost,
	maxResults,
	url,
}: IApi.Video.Suggested.Request) =>
	http.get<IApi.Video.Suggested.Response>(`/${url}`, {
		params: { maxResults },
		headers: { [config.Key]: xRapidAPIKey, [config.Host]: xRapidAPIHost },
	});
