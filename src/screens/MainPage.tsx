import React from "react";
import {
  Grid,
  Box,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { MessageArea } from "../components/messages/messageArea/MessageArea";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AddMessage } from "../components/messages/addMessage/AddMessage";
import { getSocket, WebSocketMessage } from "../websocket/Websocket";
import { addMessage } from "../components/messages/MessageSlice";
import { LeftSideMenu } from "../components/leftsideMenu/LeftSideMenu";
import { ChannelUsers } from "../components/user/channelUsers/ChannelUsers";
import {
  addChannelUsers,
  removeChannelUser,
} from "../components/user/UserSlice";

const useStyles = makeStyles({
  userAlign: {
    textAlign: "right",
  },
  img: {
    margin: "5px",
    marginRight: "20px",
    borderRadius: "50%",
    width: "45px",
  },
  textArea: {},
});

export const MainPage = () => {
  const messages = useSelector((state: RootState) => state.message.messages);
  const user = useSelector((state: RootState) => state.user.user);
  const theme = useTheme();
  const smBreakPoint = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
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
    <Box pr={2}>
      <Grid container>
        <ChannelUsers />

        <Grid item xs={12} sm={3}>
          <div>
            {!smBreakPoint && <LeftSideMenu />}
            {console.log(smBreakPoint)}
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box className={classes.textArea}>
            <MessageArea messages={messages} />
            <AddMessage />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
