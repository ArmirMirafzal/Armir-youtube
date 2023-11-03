import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "@mantine/core";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, CardMedia, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { demoProfilePicture } from "utils/constants";

import { Navbar } from "components";

import Videos from "../../components/videos";
import { Api, Types } from "../../modules/dashboard";
import { config } from "../../utils/config-armir";

const VideoDetail = () => {
	const [videoDetailState, setVideoDetail] = useState<Types.IEntity.VideoDetailGet>();
	const [videos, setVideos] = useState<Types.IEntity.VideoItems[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();

	useEffect(() => {
		const getData = async () => {
			try {
				const { data: videoDetail } = await Api.GetInVideos({
					xRapidAPIKey: config.EnvKey,
					xRapidAPIHost: "youtube-v31.p.rapidapi.com",
					url: `videos?part=snippet,statistics&id=${id}`,
					part: "snippet,statistics",
					id: `${id}`,
				});
				const videoDetailItems = videoDetail.items;

				console.log("videoDetailItems   =>>>> ", videoDetail.items);
				setVideoDetail(videoDetailItems[0]);
				setIsLoading(false);

				const { data: videos } = await Api.Suggested({
					url: `search?part=snippet&relatedToVideoId=${id}&type=video`,
					xRapidAPIKey: config.EnvKey,
					xRapidAPIHost: "youtube-v31.p.rapidapi.com",
					maxResults: 50,
				});
				const videosItems = videos.items;

				// console.log("videos in channel   =>>>> ", items);
				setVideos(videosItems);
				setIsLoading(false);
			} catch (error) {
				console.error("error => ❌", error);
			}
		};

		getData();
	}, [id]);

	// console.log("videoDetailState statistics =>>>>>", videoDetailState?.statistics);

	if (!videoDetailState?.snippet && isLoading) return <Loader className="lazy-loader" color="red" size="xl" variant="dots" />;

	return (
		<>
			<Navbar />
			<Box minHeight="90vh" sx={{ pl: { md: "40px" }, pr: { md: "40px" } }}>
				<Stack direction={{ xs: "column", md: "row" }}>
					<Box flex={1} sx={{ paddingBottom: { md: "70px" } }}>
						<Box sx={{ width: "90%", position: "sticky", top: "86px" }}>
							<ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
							<Typography
								sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
								color="#fff"
								variant="h5"
								fontWeight="bold"
								p={2}
							>
								{videoDetailState?.snippet.title}
								<Stack direction="row" gap="20px" alignItems="center">
									<Typography variant="body1" sx={{ opacity: 0.7 }}>
										{parseInt(videoDetailState?.statistics?.viewCount, 10).toLocaleString()} views
									</Typography>
									<Typography variant="body1" sx={{ opacity: 0.7 }}>
										{parseInt(videoDetailState?.statistics?.likeCount, 10).toLocaleString()} likes
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
							</Stack>
						</Box>
					</Box>

					<Box sx={{ overflow: "auto" }} px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
						<Videos videos={videos} direction="column" loading={!isLoading} />
					</Box>
				</Stack>
			</Box>
		</>
	);
};

export default VideoDetail;
