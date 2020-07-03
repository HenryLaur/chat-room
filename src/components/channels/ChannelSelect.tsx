import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { v5 as uuidv5 } from "uuid";
import { Channel, setSelectedChannel } from "./ChannelSlice";
import { useDispatch } from "react-redux";
import { saveChannelServer } from "./ChannelActions";

export const ChannelSelect = () => {
  const [channelName, setChannelName] = useState("");
  const dispatch = useDispatch();
  const namespace = "f906c3a9-cc06-47bf-9a76-52a33ea366fd";
  const saveChannel = () => {
    const channel: Channel = {
      uuid: uuidv5(channelName, namespace),
      name: channelName,
    };
    saveChannelServer(channel);
    dispatch(setSelectedChannel(channel));
  };

  return (
    <TextField
      size="small"
      id="outlined-basic"
      label="Outlined"
      variant="outlined"
      fullWidth
      onChange={(event) => setChannelName(event.target.value)}
      onDoubleClick={saveChannel}
    />
  );
};
