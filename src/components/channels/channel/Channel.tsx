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
import { Channel as IChannel, setSelectedChannel } from "../ChannelSlice";
import { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../../messages/MessageSlice";
import { getAllMessagesFromChannel } from "../../messages/MessageActions";

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
    marginLeft: "8px",
    marginTop: "4px",
  },
});

export const Channel: React.FC<IChannel> = ({ uuid, name }) => {
  const classes = useStyles();
  const selectedChannel = useSelector(
    (state: RootState) => state.channel.selectedChannel
  );
  const dispatch = useDispatch();

  const makeChannelSelected = (channel: IChannel) => {
    dispatch(clearMessages());
    getAllMessagesFromChannel(channel);
  };

  const changeChannel = () => {
    if (selectedChannel && uuid === selectedChannel?.uuid) {
      return;
    }
    const channel: IChannel = { uuid, name };
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
        <Grid item xs={4}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="60"
            image="/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
        </Grid>
        <Grid item xs={4} className={classes.channelInfo}>
          <Typography gutterBottom variant="body1" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Online: 68
          </Typography>
        </Grid>
        <CardActions>
          <Button size="large" color="primary" onClick={changeChannel}>
            Join
          </Button>
        </CardActions>
      </Grid>
    </Card>
  );
};
