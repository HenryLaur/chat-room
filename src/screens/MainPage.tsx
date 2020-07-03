import React from "react";
import { Container, Grid, Box } from "@material-ui/core";
import { MessageArea } from "../components/messages/messageArea/MessageArea";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AddMessage } from "../components/messages/addMessage/AddMessage";
import { getSocket } from "../websocket/Websocket";
import { addMessage } from "../components/messages/MessageSlice";
import { ChannelSelect } from "../components/channels/ChannelSelect";
import { LeftSideMenu } from "../components/leftsideMenu/LeftSideMenu";

export const MainPage = () => {
  const messages = useSelector((state: RootState) => state.message.messages);
  const selectChannel = useSelector(
    (state: RootState) => state.channel.selectedChannel
  );

  const socket = getSocket(selectChannel?.uuid);
  const dispatch = useDispatch();
  if (socket) {
    socket.onmessage = function (event) {
      console.log(event);
      dispatch(addMessage(JSON.parse(event.data)));
    };
  }

  return (
    <Grid container>
      <Grid item xs={3}>
        <LeftSideMenu />
      </Grid>
      <Grid item xs={9}>
        <Box mr={2}>
          <MessageArea messages={messages} />
          <AddMessage />
        </Box>
      </Grid>
    </Grid>
  );
};
