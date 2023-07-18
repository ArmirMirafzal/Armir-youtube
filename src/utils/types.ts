export namespace IEntity {
	export interface ID {
		kind: string;
		videoId: string;
		channelId: string;
	}

	export interface Tthumbnails {
		height: number;
		url: string;
		width: number;
	}

	export interface Items {
		id: IEntity.ID;
		kind: string;
		snippet: {
			channelId: string;
			channelTitle: string;
			description: string;
			liveBroadcastContent: string;
			publishTime: string;
			publishedAt: string;
			thumbnails: {
				default: IEntity.Tthumbnails;
				high: IEntity.Tthumbnails;
				medium: IEntity.Tthumbnails;
			};
			title: string;
		};
	}
}

export namespace IApi {
	export namespace Video {
		export namespace Suggested {
			export interface Request extends Params {}

			export interface Params {
				maxResults: string;
				xRapidAPIKey: string;
				xRapidAPIHost: string;
				url: string;
			}

			export interface Response {
				items: IEntity.Items[];
			}
		}
	}
}
