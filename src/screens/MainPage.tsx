import React from "react";
import { Container } from "@material-ui/core";
import { MessageArea } from "../components/messages/messageArea/MessageArea";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AddMessage } from "../components/messages/addMessage/AddMessage";

export const MainPage = () => {
  const messages = useSelector((state: RootState) => state.message.messages);
  console.log(messages);
  return (
    <Container>
      <MessageArea messages={messages} />
      <AddMessage />
    </Container>
  );
};
