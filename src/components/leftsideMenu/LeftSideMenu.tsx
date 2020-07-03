import React from "react";
import { makeStyles } from "@material-ui/core";
import { ChannelSelect } from "../channels/ChannelSelect";

const useStyles = makeStyles({
  root: {
    margin: "10px",
  },
});

export const LeftSideMenu = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ChannelSelect />
    </div>
  );
};
