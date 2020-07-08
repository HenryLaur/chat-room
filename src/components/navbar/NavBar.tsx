import React from "react";
import { AppBar, Toolbar, IconButton, makeStyles } from "@material-ui/core";
import { ChannelUsers } from "../user/channelUsers/ChannelUsers";
import { LeftSideMenu } from "../leftsideMenu/LeftSideMenu";

const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "#757575",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar className={classes.toolbar}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <LeftSideMenu />
          </IconButton>

          <IconButton edge="end" color="inherit" aria-label="menu">
            <ChannelUsers />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};
