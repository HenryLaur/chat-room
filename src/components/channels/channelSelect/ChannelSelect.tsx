import React, { useState } from "react";
import { TextField, Box, makeStyles } from "@material-ui/core";
import { v5 as uuidv5 } from "uuid";
import { Channel } from "../ChannelSlice";
import { saveChannelServer } from "../ChannelActions";
import { NAMESPACE } from "../../../constants/Constants";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  pointer: {
    cursor: "pointer",
  },
});

export const ChannelSelect = () => {
  const [channelName, setChannelName] = useState("");
  const classes = useStyles();

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
        onChange={(event) => {
          setChannelName(event.target.value);
        }}
        InputProps={{
          endAdornment: (
            <div onClick={() => saveChannel()} className={classes.pointer}>
              <SearchIcon />
            </div>
          ),
        }}
      />
    </Box>
  );
};
