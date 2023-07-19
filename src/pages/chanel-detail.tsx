import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { IEntity } from "utils/types";
import { Channel, Video } from "services";
import ChanelCard from "./../components/chanel-card";

const ChanelDetail = () => {
	const [channelDetail, setChannelDetail] = useState<IEntity.ChannelItems>();
	const [videosInChannel, setVideosInChannel] = useState<IEntity.VideoItems[]>([]);
	const { id } = useParams();

	// console.log("ID  =>>> ", id);

	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await Channel.GetChannel({
					url: `channels?part=snippet&id=${id}`,
					xRapidAPIKey: "e032783f43mshe8aff82b469d74bp151807jsnaa8b1ebd1b19",
					xRapidAPIHost: "youtube-v31.p.rapidapi.com",
					part: "snippet,statistics",
					id: "UCBVjMGOIkavEAhyqpxJ73Dw",
				});
				const items = data.items;
				setChannelDetail(items[0]);
			} catch (error) {
				console.error("channel error => ❌", error);
			}
			try {
				const { data } = await Video.Suggested({
					url: `search?channelId=${id}&part=snippet%2Cid&order=date`,
					xRapidAPIKey: "e032783f43mshe8aff82b469d74bp151807jsnaa8b1ebd1b19",
					xRapidAPIHost: "youtube-v31.p.rapidapi.com",
					maxResults: "50",
				});
				const items = data.items;
				setVideosInChannel(items);
			} catch (error) {
				console.error("videos in channel error => ❌", error);
			}
		};

		getData();
	}, [id]);

	// console.log("channel =>>>>>>>>>>", channelDetail);

	return (
		<Box minHeight="95vh">
			<Box>
				<div
					style={{
						height: "300px",
						background: "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
						zIndex: 10,
					}}
				/>
				{/* <ChanelCard videosinChannel={channelDetail} /> */}
			</Box>
		</Box>
	);
};

export default ChanelDetail;
