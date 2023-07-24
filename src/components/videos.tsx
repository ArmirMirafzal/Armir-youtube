import React from "react";
import { Stack, Box } from "@mui/material";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";


import { ChanelCard, VideoCard } from "./";
import { IEntity } from "utils/types";

interface VideosProps {
	videos: IEntity.VideoItems[];
	direction?: any;
	loading?: boolean;
}

const Videos = ({ videos, direction, loading }: VideosProps) => {
	// console.log("videos =====>>>>>> ", videos);

	if (!videos?.length && !loading) return <Loader className="lazy-loader1" color="red" size="xl" variant="dots" />;

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
