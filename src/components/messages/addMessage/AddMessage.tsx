import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  getSocket,
  sendWebsocketMessage,
  WebSocketMessage,
} from "../../../websocket/Websocket";
import { RootState } from "../../../store/store";
import { TextField, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles({
  pointer: {
    cursor: "pointer",
  },
});

export const AddMessage = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state: RootState) => state.user.user);
  const selectedChannel = useSelector(
    (state: RootState) => state.channel.selectedChannel
  );
  const classes = useStyles();

  const sendMessage = () => {
    if (user && selectedChannel) {
      const data: WebSocketMessage = {
        type: "MESSAGE",
        content: {
          message: { user, messageBody: message, dateTime: new Date() },
        },
      };
      sendWebsocketMessage(data);
      setMessage("");
    }
  };

  return (
    <TextField
      size="small"
      id="outlined-basic"
      label="Message"
      variant="outlined"
      fullWidth
      multiline
      rows={1}
      rowsMax={4}
      value={message}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          sendMessage();
        } else {
          setMessage(message + e.key);
        }
      }}
      InputProps={{
        endAdornment: (
          <div onClick={() => sendMessage()} className={classes.pointer}>
            <SendIcon />
          </div>
        ),
      }}
    />
  );
};
