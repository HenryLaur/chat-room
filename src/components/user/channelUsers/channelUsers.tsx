import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
const useStyles = makeStyles({
  userAlign: {
    textAlign: "right",
  },
  img: {
    margin: "5px",
    marginRight: "20px",
    borderRadius: "50%",
    width: "45px",
  },
});

export const ChannelUsers = () => {
  const classes = useStyles();
  const channelUsers = useSelector(
    (state: RootState) => state.user.channelUsers
  );

  return (
    <div>
      {channelUsers.map((channelUser) => {
        return channelUser.name;
      })}
      1
    </div>
  );
};
