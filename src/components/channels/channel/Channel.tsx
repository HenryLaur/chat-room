import React from "react";
import {
  Button,
  Card,
  CardMedia,
  Typography,
  CardActions,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { setSelectedChannel } from "../ChannelSlice";
import { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { getAllMessagesFromChannel } from "../../messages/MessageActions";
import { switchSocketConnectionChannel } from "../../../websocket/Websocket";
import { getUsersInChannel } from "../../user/UserActions";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "8px",
  },
  rootSelected: {
    width: "100%",
    marginTop: "8px",
    backgroundColor: "#70ff6e",
  },
  channelInfo: {
    paddingLeft: "8px",
    paddingTop: "4px",
  },
  join: {
    justifyContent: "center",
  },
});
interface IChannel {
  uuid: string;
  name: string;
  users?: number;
}
export const Channel: React.FC<IChannel> = ({ uuid, name, users }) => {
  const classes = useStyles();
  const selectedChannel = useSelector(
    (state: RootState) => state.channel.selectedChannel
  );
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const makeChannelSelected = (channel: IChannel) => {
    getAllMessagesFromChannel(channel);
    getUsersInChannel(channel);
  };

  const changeChannel = () => {
    if (selectedChannel && uuid === selectedChannel.uuid) {
      return;
    }
    const channel: IChannel = { uuid, name };

    if (user) {
      switchSocketConnectionChannel(user, selectedChannel!, channel);
    }
    dispatch(setSelectedChannel(channel));
    makeChannelSelected(channel);
  };

  return (
    <Card
      className={
        uuid === selectedChannel?.uuid ? classes.rootSelected : classes.root
      }
    >
      <Grid container>
        <Grid item xs={6} md={4}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="60"
            image="/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
        </Grid>
        <Grid item xs={6} md={4} className={classes.channelInfo}>
          <Typography gutterBottom variant="body1" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Online: {users}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardActions className={classes.join}>
            <Button size="large" color="primary" onClick={changeChannel}>
              Join
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
