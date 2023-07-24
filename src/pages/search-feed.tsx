import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { Videos } from "components";
import { Video } from "services";
import { IEntity } from "utils/types";
import { config } from "../utils/config-armir";

const SearchFeed = () => {
	const [videos, setVideos] = useState<IEntity.VideoItems[]>([]);
	const { searchTerm } = useParams();

	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await Video.Suggested({
					url: `search?part=snippet&q=${searchTerm}`,
					xRapidAPIKey: config.EnvKey,
					xRapidAPIHost: "youtube-v31.p.rapidapi.com",
					maxResults: 50,
				});
				const items = data.items;
				setVideos(items);
			} catch (error) {
				console.error(error);
			}
		};

		getData();
	}, [searchTerm]);

	return (
		<Box p={2} minHeight="95vh">
			<Typography variant="h4" fontWeight={900} color="white" mb={3} ml={{ sm: "100px" }}>
				Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
			</Typography>
			<Box display="flex">
				<Box sx={{ mr: { sm: "100px" } }} />
				<Videos videos={videos} />
			</Box>
		</Box>
	);
};

export default SearchFeed;
