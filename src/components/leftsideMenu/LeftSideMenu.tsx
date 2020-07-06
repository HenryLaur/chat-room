import React from "react";
import { makeStyles } from "@material-ui/core";
import { ChannelSelect } from "../channels/channelSelect/ChannelSelect";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Channel } from "../channels/channel/Channel";
import { User } from "../user/user/User";

const useStyles = makeStyles({
  root: {
    margin: "10px",
    overflow: "auto",
    maxHeight: "100%",
  },
  user: {
    marginBottom: "30px",
  },
});

export const LeftSideMenu = () => {
  const classes = useStyles();
  const channels = useSelector((state: RootState) => state.channel.channels);

  return (
    <div className={classes.root}>
      <div className={classes.user}>
        <User />
      </div>
      <ChannelSelect />
      {channels.map((channel, key) => {
        return <Channel uuid={channel.uuid} name={channel.name} key={key} />;
      })}
    </div>
  );
};
