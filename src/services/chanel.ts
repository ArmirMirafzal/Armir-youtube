import { config } from "../utils/config-armir";
import { IApi } from "../utils/types";
import { http } from "./http";

export const GetChannel = ({ xRapidAPIKey, xRapidAPIHost, part, url, id }: IApi.Channel.GetChannel.Request) =>
	http.get<IApi.Channel.GetChannel.Response>(`/${url}`, {
		params: { part, id },
		headers: { [config.Key]: xRapidAPIKey, [config.Host]: xRapidAPIHost },
	});



 