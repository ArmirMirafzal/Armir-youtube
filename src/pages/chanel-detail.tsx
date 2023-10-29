import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "@mantine/core";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { demoProfilePicture } from "utils/constants";

import { Videos } from "components";

import { Api, Types } from "../modules/dashboard";
import { config } from "../utils/config-armir";

const ChanelDetail = () => {
  const [channelDetail, setChannelDetail] = useState<Types.IEntity.ChannelItems>();
  const [videosInChannel, setVideosInChannel] = useState<Types.IEntity.VideoItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  console.log("ID  =>>> ", id);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: channel } = await Api.GetChannel({
          xRapidAPIKey: config.EnvKey,
          xRapidAPIHost: "youtube-v31.p.rapidapi.com",
          url: `channels?part=snippet&id=${id}`,
          part: "snippet,statistics",
          id: `${id}`,
        });
        const channelItems = channel.items;

        // console.log("channel   =>>>> ", items);
        setChannelDetail(channelItems[0]);
        setIsLoading(false);

        const { data: videos } = await Api.Suggested({
          url: `search?channelId=${id}&part=snippet%2Cid&order=date`,
          xRapidAPIKey: config.EnvKey,
          xRapidAPIHost: "youtube-v31.p.rapidapi.com",
          maxResults: 50,
        });
        const videosItems = videos.items;
		
        // console.log("videos in channel   =>>>> ", items);
        setVideosInChannel(videosItems);
        setIsLoading(false);
      } catch (error) {
        console.error("error => ❌", error);
      }
    };

    getData();
  }, [id]);

  if (!channelDetail && isLoading) return <Loader className="lazy-loader" color="red" size="xl" variant="dots" />;

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
          <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", color: "#fff" }}>
            <CardMedia image={channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture} sx={{ borderRadius: "50%", height: "180px", width: "180px", mb: 2, border: "1px solid #e3e3e3" }} />
            <Typography variant="h6">
              {channelDetail?.snippet.title}
              <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px", mt: "5px" }} />
            </Typography>
            {channelDetail?.statistics?.subscriberCount && <Typography sx={{ fontSize: "15px", fontWeight: 500, color: "gray" }}>{parseInt(channelDetail?.statistics?.subscriberCount, 10).toLocaleString("en-US")} Subscribers</Typography>}
          </CardContent>
        </Box>
      </Box>

      <Box p={2} display="flex">
        <Box sx={{ mr: { md: "110px", sm: "140px", xs: "60px" } }} />
        <Videos videos={videosInChannel} loading={!isLoading} />
      </Box>
    </Box>
  );
};

export default ChanelDetail;
