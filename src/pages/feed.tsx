import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Sidebar, Videos } from "components";
import { Video } from "../services";
import { IEntity } from "../utils/types";

const Feed = () => {
	const [selectedCategory, setSelectedCategory] = useState("New");
	const [videos, setVideos] = useState<IEntity.VideoItems[]>([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await Video.Suggested({
					maxResults: 10,
					xRapidAPIKey: "e032783f43mshe8aff82b469d74bp151807jsnaa8b1ebd1b19",
					xRapidAPIHost: "youtube-v31.p.rapidapi.com",
					url: `search?part=snippet&q=${selectedCategory}`,
				});
				const items = data.items;
				setVideos(items);
			} catch (error) {
				console.error(error);
			}
		};

		getData();
	}, [selectedCategory]);

	return (
		<Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
			<Box
				sx={{
					height: { sx: "auto", md: "92vh" },
					borderRight: "1px solid #3d3d3d",
					px: { sx: 0, md: 2 },
				}}
			>
				<Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

				<Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff" }}>
					Copyright © 2022 JSM Media
				</Typography>
			</Box>

			<Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
				<Typography fontFamily="" variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
					{selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
				</Typography>

				<Videos videos={videos} />
			</Box>
		</Stack>
	);
};

export default Feed;
