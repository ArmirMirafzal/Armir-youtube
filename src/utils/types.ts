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

	export interface VideoItems{
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

	export interface ChannelItems {
		brandingSettings: {
			channel: {
				description: string;
				keywords: string;
				title: string;
				unsubscribedTrailer: string;
			};
			image: {
				bannerExternalUrl: string;
			};
		};
		contentDetails: {
			relatedPlaylists: {
				likes: string;
				uploads: string;
			};
		};
		id: string;
		kind: string;
		snippet: {
			customUrl: string;
			description: string;
			localized: {
				description: string;
				title: string;
			};
			publishedAt: string;
			thumbnails: {
				default: IEntity.Tthumbnails;
				high: IEntity.Tthumbnails;
				medium: IEntity.Tthumbnails;
			};
			title: string;
		};
		statistics: {
			hiddenSubscriberCount: boolean;
			subscriberCount: string;
			videoCount: string;
			viewCount: string;
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
				items: IEntity.VideoItems[];
			}
		}
	}

	export namespace Channel {
		export namespace GetChannel {
			export interface Request extends Params {}

			export interface Params {
				xRapidAPIKey: string;
				xRapidAPIHost: string;
				part: string;
				url: string;
				id: string;
			}

			export interface Response {
				items: IEntity.ChannelItems[];
			}
		}
	}
}
