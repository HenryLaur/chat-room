import React, { useEffect } from "react";
import {
  Grid,
  Box,
  useTheme,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import { MessageArea } from "../components/messages/messageArea/MessageArea";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AddMessage } from "../components/messages/addMessage/AddMessage";
import { getSocket, WebSocketMessage } from "../websocket/Websocket";
import { addMessage } from "../components/messages/MessageSlice";
import { LeftSideMenuContent } from "../components/leftsideMenu/LeftSideMenu";
import { ChannelUserList } from "../components/user/channelUsers/ChannelUsers";
import {
  addChannelUsers,
  removeChannelUser,
} from "../components/user/UserSlice";
import { NavBar } from "../components/navbar/NavBar";
import { getUsersInChannels } from "../components/user/UserActions";

const useStyles = makeStyles({
  border: {
    borderLeft: "#a5a5a5 solid 1px",
    borderRight: "#a5a5a5 solid 1px",
  },
});

export const MainPage = () => {
  const messages = useSelector((state: RootState) => state.message.messages);
  const user = useSelector((state: RootState) => state.user.user);
  const theme = useTheme();
  const smBreakPoint = useMediaQuery(theme.breakpoints.down("sm"));
  const selectChannel = useSelector(
    (state: RootState) => state.channel.selectedChannel
  );
  const channels = useSelector((state: RootState) => state.channel.channels);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      getUsersInChannels(channels);
    }, 3000);
    return () => clearInterval(interval);
  }, [channels]);

  if (selectChannel && user) {
    const socket = getSocket(selectChannel.uuid);
    if (socket) {
      socket.onmessage = (event) => {
        socketMessageHandling(JSON.parse(event.data));
      };
    }
  }
  const socketMessageHandling = (message: WebSocketMessage) => {
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
      dispatch(addMessage(message.content.message));
    }
  };

  return (
    <Box>
      <Grid container>
        {smBreakPoint && <NavBar />}
        <Grid item xs={12} lg={2} md={3}>
          <div>{!smBreakPoint && <LeftSideMenuContent />}</div>
        </Grid>
        <Grid item xs={12} lg={8} md={6}>
          <Box pr={1} pl={1} className={!smBreakPoint ? classes.border : ""}>
            <MessageArea messages={messages} />
            <AddMessage />
          </Box>
        </Grid>
        <Grid item xs={12} lg={2} md={3}>
          {!smBreakPoint && <ChannelUserList />}
        </Grid>
      </Grid>
    </Box>
  );
};
