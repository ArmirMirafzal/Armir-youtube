import React from "react";
import { Link } from "react-router-dom";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";

import { Types } from "../modules/dashboard";
import { demoProfilePicture } from "../utils/constants";

interface ChanelCardProps {
  channelDetail: Types.IEntity.VideoItems;
}

const ChanelCard = ({ channelDetail }: ChanelCardProps) => (
  // console.log("channelDetail =>>>>>>>>>>>>>>>> ", channelDetail);
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
    <Link to={`/channel/${channelDetail?.id.channelId}`}>
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", color: "#fff" }}>
        <CardMedia image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture} sx={{ borderRadius: "50%", height: "180px", width: "180px", mb: 2, border: "1px solid #e3e3e3" }} />
        <Typography variant="h6">
          {channelDetail?.snippet.title}
          <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px", mt: "5px" }} />
        </Typography>
      </CardContent>
    </Link>
  </Box>
);

export default ChanelCard;
