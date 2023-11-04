import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Navbar, Sidebar, Videos } from "components";

import { Api, Types } from "../../modules/dashboard";
import { config } from "../../utils/config-armir";

const Feed = () => {
	const [selectedCategory, setSelectedCategory] = useState("New");
	const [videos, setVideos] = useState<Types.IEntity.VideoItems[]>([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const { data } = await Api.Suggested({
					maxResults: 50,
					xRapidAPIKey: config.EnvKey,
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
		<>
			<Navbar />
			<Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
				<Box
					sx={{
						height: { sx: "auto", md: "92vh" },
						borderRight: "1px solid #3d3d3d",
						px: { sx: 0, md: 2 },
					}}
				>
					<Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
				</Box>

				<Box p={2} sx={{ overflowY: "auto", height: "80vh", flex: 2 }}>
					<Typography fontFamily="" variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
						{selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
					</Typography>

					<Videos videos={videos} />
				</Box>
			</Stack>
		</>
	);
};

export default Feed;
