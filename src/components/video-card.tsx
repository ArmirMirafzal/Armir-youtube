import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";

import { IEntity } from "utils/types";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

interface VideoCardProps {
	video: IEntity.VideoItems;
}

const VideoCard = ({
	video: {
		id: { videoId },
		snippet,
	},
}: VideoCardProps) => {
	return (
		<Card sx={{ width: { md: "290px", xs: "250px" }, boxShadow: "none", borderRadius: 0 }}>
			<Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
				<CardMedia image={snippet.thumbnails.high.url || demoThumbnailUrl} sx={{ width: { xs: "320px", sm: "320px" }, height: 180 }} />
			</Link>
			<CardContent sx={{ backgroundColor: "#1e1e1e", height: "106px" }}>
				<Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
					<Typography variant="subtitle1" fontWeight="bold" color="#fff">
						{snippet.title.slice(0, 50) || demoVideoTitle.slice(0, 50)}
					</Typography>
				</Link>
				<Link to={snippet.channelId ? `/channel/${snippet.channelId}` : `/video/cV2gBU6hKfY`}>
					<Typography variant="subtitle2" fontWeight="bold" color="gray">
						{snippet.channelTitle || demoChannelTitle}
						<CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px", mt: "5px" }} />
					</Typography>
				</Link>
			</CardContent>
		</Card>
	);
};

export default VideoCard;
