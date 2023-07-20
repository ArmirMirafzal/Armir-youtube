import React from "react";
import { Stack, Box } from "@mui/material";

import { ChanelCard, VideoCard } from "./";
import { IEntity } from "utils/types";

interface VideosProps {
	videos: IEntity.VideoItems[];
	direction?: any;
}

const Videos = ({ videos, direction }: VideosProps) => {
	console.log("videos =====>>>>>> ", videos);

	return (
		<Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
			{videos.map((item, idx) => (
				<Box key={idx}>
					{item.id.videoId && <VideoCard video={item} BoxMD="290px" BoxXS="250px" imgSM="320px" />}
					{item.id.channelId && <ChanelCard channelDetail={item} />}
				</Box>
			))}
		</Stack>
	);
};

export default Videos;
