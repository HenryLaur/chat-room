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
import { Channel as ChannelType, setSelectedChannel } from "./ChannelSlice";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";

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

export const Channel: React.FC<ChannelType> = ({ uuid, name }) => {
  const classes = useStyles();
  const selectedChannel = useSelector(
    (state: RootState) => state.channel.selectedChannel
  );
  const dispatch = useDispatch();

  const changeChannel = () => {
    if (uuid === selectedChannel?.uuid) {
      return;
    }
    dispatch(setSelectedChannel({ uuid, name }));
  };
  console.log(uuid, selectedChannel?.uuid);
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
