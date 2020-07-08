import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getSocket,
  sendWebsocketMessage,
  WebSocketMessage,
} from "../../../websocket/Websocket";
import { RootState } from "../../../store/store";
import { TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

export const AddMessage = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  const selectedChannel = useSelector(
    (state: RootState) => state.channel.selectedChannel
  );

  const sendMessage = () => {
    if (user && selectedChannel) {
      const socket = getSocket(selectedChannel.uuid);
      console.log(message);
      console.log(socket);
      const data: WebSocketMessage = {
        type: "MESSAGE",
        content: {
          message: { user, messageBody: message },
        },
      };
      sendWebsocketMessage(data);
    }
  };

  return (
    <TextField
      size="small"
      id="outlined-basic"
      label="Message"
      variant="outlined"
      fullWidth
      onChange={(event) => setMessage(event.target.value)}
      InputProps={{
        endAdornment: (
          <div onClick={() => sendMessage()}>
            <SendIcon />
          </div>
        ),
      }}
    />
  );
};
