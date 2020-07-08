import React, { useState } from "react";
import {
  makeStyles,
  Drawer,
  List,
  ListItem,
  Card,
  CardMedia,
  Grid,
  Typography,
  Badge,
  Divider,
} from "@material-ui/core";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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
  drawer: {
    width: "200px",
    maxWidth: "200px",
  },
  list: {
    display: "list-item",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
    height: "100%",
  },
  title: {
    marginTop: "8px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "center",
  },
});

export const ChannelUserList = () => {
  const channelUsers = useSelector(
    (state: RootState) => state.user.channelUsers
  );
  const classes = useStyles();

  return (
    <List>
      <div className={classes.title}>
        <Typography variant="body1">Users in current Channel: </Typography>
      </div>
      <Divider />
      {channelUsers.map((user, index) => (
        <ListItem key={index} className={classes.list}>
          <Card elevation={0}>
            <Grid container>
              <Grid item xs={4}>
                <CardMedia
                  className={classes.img}
                  component="img"
                  alt="Contemplative Reptile"
                  height="45"
                  image="/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
              </Grid>
              <Grid item xs={8}>
                <div className={classes.userName}>
                  <Typography variant="h6" color="textSecondary">
                    {user}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export const ChannelUsers = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const channelUsers = useSelector(
    (state: RootState) => state.user.channelUsers
  );
  console.log(channelUsers);
  return (
    <div>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => {
          console.log(drawerOpen);
          setDrawerOpen(false);
        }}
      >
        <div
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
          className={classes.drawer}
        >
          <ChannelUserList />
        </div>
      </Drawer>
      <div onClick={() => setDrawerOpen(true)}>
        <Badge badgeContent={channelUsers.length} color="error">
          <AccountCircleIcon />
        </Badge>
      </div>
    </div>
  );
};
