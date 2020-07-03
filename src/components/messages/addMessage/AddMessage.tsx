import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getSocket, sendWebsocketMessage } from "../../../websocket/Websocket";
import { RootState } from "../../../store/store";
import { TextField, Grid, Button } from "@material-ui/core";

export const AddMessage = () => {
  const [message, setMessage] = useState("");
  const user = useSelector((state: RootState) => state.message.user);
  const selectedChannel = useSelector(
    (state: RootState) => state.channel.selectedChannel
  );

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const socket = getSocket(selectedChannel?.uuid);
    console.log(message);
    console.log(socket);
    const data = {
      user,
      messageBody: message,
    };
    sendWebsocketMessage(JSON.stringify(data));
  };

  return (
    <form onSubmit={sendMessage}>
      <Grid container>
        <Grid item xs={11}>
          <TextField
            size="small"
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
            onChange={(event) => setMessage(event.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="outlined"
            fullWidth
            size="medium"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
