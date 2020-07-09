import React from "react";
import { Message } from "../message/Message";
import { makeStyles } from "@material-ui/core";
import { Message as IMessage } from "../MessageSlice";

interface MessageArea {
  messages: IMessage[];
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
    overflowY: "auto",
    height: "90vh",
    width: "100%",
    marginBottom: "10px",
    marginTop: "10px",
  },
});

export const MessageArea: React.FC<MessageArea> = ({ messages }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {messages.map((message, key) => {
        return (
          <Message
            dateTime={new Date(message.dateTime)}
            messageBody={message.messageBody}
            user={message.user}
          />
        );
      })}
    </div>
  );
};
