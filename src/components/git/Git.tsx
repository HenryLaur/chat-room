import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  git: {
    position: "absolute",
    right: "10px",
    bottom: "10px",
    textDecoration: "none",
    color: "black",
  },
});
export const Git = () => {
  const classes = useStyles();
  return (
    <a className={classes.git} href="https://github.com/HenryLaur/chat-room">
      <GitHubIcon />
    </a>
  );
};
