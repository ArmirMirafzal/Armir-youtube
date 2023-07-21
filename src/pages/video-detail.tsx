import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { VideoDetailApi } from "services";
import { Video } from "services";
import { IEntity } from "utils/types";
import Videos from "./../components/videos";
import { demoProfilePicture } from "utils/constants";

const VideoDetail = () => {
	const [videoDetailState, setVideoDetail] = useState<IEntity.VideoDetailGet>();
	const [videos, setVideos] = useState<IEntity.VideoItems[]>([]);
	const { id } = useParams();

	useEffect(() => {
		const getData = async () => {
			try {
				const { data: videoDetail } = await VideoDetailApi.GetInVideos({
					xRapidAPIKey: "e032783f43mshe8aff82b469d74bp151807jsnaa8b1ebd1b19",
					xRapidAPIHost: "youtube-v31.p.rapidapi.com",
					url: `videos?part=snippet,statistics&id=${id}`,
					part: "snippet,statistics",
					id: `${id}`,
				});
				const videoDetailItems = videoDetail.items;
				console.log("videoDetailItems   =>>>> ", videoDetail.items);
				setVideoDetail(videoDetailItems[0]);

				const { data: videos } = await Video.Suggested({
					url: `search?part=snippet&relatedToVideoId=${id}&type=video`,
					xRapidAPIKey: "e032783f43mshe8aff82b469d74bp151807jsnaa8b1ebd1b19",
					xRapidAPIHost: "youtube-v31.p.rapidapi.com",
					maxResults: 50,
				});
				const videosItems = videos.items;
				// console.log("videos in channel   =>>>> ", items);
				setVideos(videosItems);
			} catch (error) {
				console.error("error => ❌", error);
			}
		};

		getData();
	}, [id]);

	console.log("videoDetailState statistics =>>>>>", videoDetailState?.statistics);

	return (
		<Box minHeight="95vh">
			<Stack direction={{ xs: "column", md: "row" }}>
				<Box flex={1} sx={{ paddingBottom: "100px" }}>
					<Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
						<ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
						<Typography sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} color="#fff" variant="h5" fontWeight="bold" p={2}>
							{videoDetailState?.snippet.title}
							<Stack direction="row" gap="20px" alignItems="center">
								<Typography variant="body1" sx={{ opacity: 0.7 }}>
									{parseInt(videoDetailState?.statistics?.viewCount).toLocaleString()} views
								</Typography>
								<Typography variant="body1" sx={{ opacity: 0.7 }}>
									{parseInt(videoDetailState?.statistics?.likeCount).toLocaleString()} likes
								</Typography>
							</Stack>
						</Typography>
						<Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
							<Link to={`/channel/${videoDetailState?.snippet.channelId}`}>
								<Typography sx={{ display: "flex", alignItems: "center", columnGap: "10px" }} variant="h6" color="#fff">
									<CardMedia
										image={videoDetailState?.snippet?.thumbnails?.high?.url || demoProfilePicture}
										sx={{ borderRadius: "50%", height: "20px", width: "20px", border: "1px solid #e3e3e3" }}
									/>
									{videoDetailState?.snippet.channelTitle}
									<CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
								</Typography>
							</Link>
							{/* <Stack direction="row" gap="20px" alignItems="center">
								<Typography variant="body1" sx={{ opacity: 0.7 }}>
									{parseInt(videoDetailState?.statistics?.viewCount).toLocaleString()} views
								</Typography>
								<Typography variant="body1" sx={{ opacity: 0.7 }}>
									{parseInt(videoDetailState?.statistics?.likeCount).toLocaleString()} likes
								</Typography>
							</Stack> */}
						</Stack>
					</Box>
				</Box>
				<Box sx={{ overflow: "auto" }} px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
					<Videos videos={videos} direction="column" />
				</Box>
			</Stack>
		</Box>
	);
};

export default VideoDetail;
