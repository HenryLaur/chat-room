import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  OtherUserspeechBubble: {
    position: "relative",
    borderRadius: ".4em",
    display: "inline-block",
    padding: "5px",
    margin: "3px",
    overflowWrap: "anywhere",
    background: "#03a9f4",
  },
  CurrentUserSpeechBubble: {
    position: "relative",
    borderRadius: ".4em",
    display: "inline-block",
    padding: "5px",
    margin: "3px",
    overflowWrap: "anywhere",
    background: "#2fc15f",
  },
  currentUserAlign: {
    textAlign: "right",
  },
});

export interface Message {
  user: string;
  messageBody: string;
}

export const Message: React.FC<Message> = ({ messageBody, user }) => {
  const classes = useStyles();
  const currentUser = useSelector((state: RootState) => state.message.user);

  return (
    <div
      className={currentUser === user ? classes.currentUserAlign : undefined}
    >
      <div
        className={
          currentUser === user
            ? classes.CurrentUserSpeechBubble
            : classes.OtherUserspeechBubble
        }
      >
        {`${user}: ${messageBody}`}
      </div>
    </div>
  );
};
