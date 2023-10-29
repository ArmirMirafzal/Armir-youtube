import React from "react";
import { Loader } from "@mantine/core";
import { Box, Stack } from "@mui/material";

import { Types } from "../modules/dashboard";

import { ChanelCard, VideoCard } from ".";

interface VideosProps {
  videos: Types.IEntity.VideoItems[];
  direction?: any;
  loading?: boolean;
}

const Videos = ({ videos, direction, loading }: VideosProps) => {
  // console.log("videos =====>>>>>> ", videos);

  if (!videos?.length && !loading) return <Loader className="lazy-loader1" color="red" size="xl" variant="dots" />;

  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos?.map((item, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} BoxMD="290px" BoxXS="250px" imgSM="320px" />}
          {item.id.channelId && <ChanelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
