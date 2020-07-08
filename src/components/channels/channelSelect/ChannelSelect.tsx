import React, { useState } from "react";
import { TextField, Box } from "@material-ui/core";
import { v5 as uuidv5 } from "uuid";
import { Channel } from "../ChannelSlice";
import { saveChannelServer } from "../ChannelActions";
import { NAMESPACE } from "../../../constants/Constants";
import SearchIcon from "@material-ui/icons/Search";

export const ChannelSelect = () => {
  const [channelName, setChannelName] = useState("");
  const saveChannel = () => {
    const channel: Channel = {
      uuid: uuidv5(channelName, NAMESPACE),
      name: channelName,
    };
    saveChannelServer(channel);
  };

  return (
    <Box ml={3} mr={3}>
      <TextField
        size="small"
        id="outlined-basic"
        label="Channel Name"
        variant="outlined"
        fullWidth
        onChange={(event) => setChannelName(event.target.value)}
        InputProps={{
          endAdornment: (
            <div onClick={() => saveChannel()}>
              <SearchIcon />
            </div>
          ),
        }}
      />
    </Box>
  );
};
