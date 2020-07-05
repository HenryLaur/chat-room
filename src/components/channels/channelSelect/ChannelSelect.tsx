import React, { useState } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { v5 as uuidv5 } from "uuid";
import { Channel } from "../ChannelSlice";
import { saveChannelServer } from "../ChannelActions";
import { NAMESPACE } from "../../../constants/Constants";

export const ChannelSelect = () => {
  const [channelName, setChannelName] = useState("");
  const saveChannel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const channel: Channel = {
      uuid: uuidv5(channelName, NAMESPACE),
      name: channelName,
    };
    saveChannelServer(channel);
  };

  return (
    <form onSubmit={saveChannel}>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            size="small"
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            fullWidth
            onChange={(event) => setChannelName(event.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
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
