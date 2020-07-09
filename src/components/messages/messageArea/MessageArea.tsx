import React from "react";
import { Message } from "../message/Message";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
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
    width: "100%",
    marginBottom: "10px",
    marginTop: "10px",
  },
  height: {
    height: "90vh",
  },
  smallerHeight: {
    height: "80vh",
  },
});

export const MessageArea: React.FC<MessageArea> = ({ messages }) => {
  const classes = useStyles();
  const theme = useTheme();
  const smBreakPoint = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className={smBreakPoint ? classes.smallerHeight : classes.height}>
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
    </div>
  );
};
