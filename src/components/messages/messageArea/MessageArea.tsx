import React from "react";
import { Message } from "../message/Message";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { Message as IMessage } from "../MessageSlice";

interface MessageArea {
  messages: IMessage[];
}

interface height {
  height: string;
}

const useStyles = makeStyles({
  root: (props: height) => ({
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-start",
    overflowY: "auto",
    width: "100%",
    marginBottom: "10px",
    marginTop: "10px",
    height: props.height,
  }),
  height: {
    height: "90vh",
  },
  smallerHeight: {
    height: "80vh",
  },
});

export const MessageArea: React.FC<MessageArea> = ({ messages }) => {
  const theme = useTheme();
  const smBreakPoint = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles({ height: smBreakPoint ? "80vh" : "90vh" });

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
