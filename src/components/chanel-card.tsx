import React from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

import { IEntity } from "utils/types";

interface ChanelCardProps<T> {
	videosinChannel: T;
}

const ChanelCard = <T extends IEntity.VideoItems>({ videosinChannel }: ChanelCardProps<T>) => {
	console.log("videosinChannel =>>>>>>>>>>>>>>>> ", videosinChannel);
	// console.log("channelDetail =>>>>>>>>>>>>>>>> ", channelDetail);

	return (
		<Box
			sx={{
				boxShadow: "none",
				borderRadius: "20px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: { xs: "356px", md: "290px" },
				height: "326px",
				margin: "auto",
			}}
		>
			<Link to={`/channel/${videosinChannel?.id.channelId}`}>
				<CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", color: "#fff" }}>
					<CardMedia
						image={videosinChannel?.snippet?.thumbnails?.high?.url || demoProfilePicture}
						sx={{ borderRadius: "50%", height: "180px", width: "180px", mb: 2, border: "1px solid #e3e3e3" }}
					/>
					<Typography variant="h6">
						{videosinChannel?.snippet.title}
						<CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px", mt: "5px" }} />
					</Typography>
					{/* {channelDetail?.statistics?.subscriberCount && (
						<Typography sx={{ fontSize: "15px", fontWeight: 500, color: "gray" }}>
							{parseInt(channelDetail?.statistics?.subscriberCount).toLocaleString("en-US")} Subscribers
						</Typography>
					)} */}
				</CardContent>
			</Link>
		</Box>
	);
};

export default ChanelCard;
