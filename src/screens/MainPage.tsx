import React from "react";
import { Grid, Box } from "@material-ui/core";
import { MessageArea } from "../components/messages/messageArea/MessageArea";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AddMessage } from "../components/messages/addMessage/AddMessage";
import { getSocket, WebSocketMessage } from "../websocket/Websocket";
import { addMessage } from "../components/messages/MessageSlice";
import { LeftSideMenu } from "../components/leftsideMenu/LeftSideMenu";
import { ChannelUsers } from "../components/user/channelUsers/channelUsers";
import {
  addChannelUsers,
  removeChannelUser,
} from "../components/user/UserSlice";

export const MainPage = () => {
  const messages = useSelector((state: RootState) => state.message.messages);
  const user = useSelector((state: RootState) => state.user.user);

  const selectChannel = useSelector(
    (state: RootState) => state.channel.selectedChannel
  );
  const dispatch = useDispatch();

  if (selectChannel && user) {
    const socket = getSocket(selectChannel.uuid);
    if (socket) {
      socket.onmessage = (event) => {
        socketMessageHandling(JSON.parse(event.data));
      };
    }
  }
  const socketMessageHandling = (message: WebSocketMessage) => {
    console.log(message);
    if (
      message.type === "JOIN" &&
      message.content.channel?.uuid === selectChannel?.uuid
    ) {
      dispatch(addChannelUsers(message.content.user));
    } else if (
      message.type === "LEAVE" &&
      message.content.channel?.uuid === selectChannel?.uuid
    ) {
      dispatch(removeChannelUser(message.content.user));
    } else if (message.type === "MESSAGE") {
      dispatch(addMessage(message.content));
    }
  };

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
      <ChannelUsers />
    </Grid>
  );
};
