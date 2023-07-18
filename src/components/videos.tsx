import { Stack, Box } from "@mui/material";
import { IEntity } from "utils/types";
import { VideoCard, ChanelCard } from "./";

interface VideosProps {
	videos: IEntity.Items[];
}

const Videos = ({ videos }: VideosProps) => {
	console.log("videos =====>>>>>> ", videos);

	return (
		<Stack direction="row" flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
			{videos.map((item, idx) => (
				<Box key={idx}>
					{item.id.videoId && <VideoCard video={item} />}
					{item.id.channelId && <ChanelCard channelDetail={item} />}
				</Box>
			))}
		</Stack>
	);
};

export default Videos;
