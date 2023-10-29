import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Videos } from "components";

import { Api, Types } from "../modules/dashboard";
import { config } from "../utils/config-armir";

const SearchFeed = () => {
  const [videos, setVideos] = useState<Types.IEntity.VideoItems[]>([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await Api.Suggested({
          url: `search?part=snippet&q=${searchTerm}`,
          xRapidAPIKey: config.EnvKey,
          xRapidAPIHost: "youtube-v31.p.rapidapi.com",
          maxResults: 50,
        });
        // eslint-disable-next-line prefer-destructuring
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
