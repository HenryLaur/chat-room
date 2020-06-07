import React from "react";
import { Container } from "@material-ui/core";
import { MessageArea } from "../components/messages/messageArea/MessageArea";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { AddMessage } from "../components/messages/addMessage/AddMessage";
import { getSocket } from "../components/messages/websocket/MessagesWebsocket";
import { addMessage } from "../components/messages/messageSlice";

export const MainPage = () => {
  const messages = useSelector((state: RootState) => state.message.messages);
  const socket = getSocket();
  const dispatch = useDispatch();

  socket.onmessage = function (event) {
    console.log(event);
    dispatch(addMessage(JSON.parse(event.data)));
  };
  return (
    <Container>
      <MessageArea messages={messages} />
      <AddMessage />
    </Container>
  );
};
