import React, { useState } from "react";
import {
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Card,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

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
  hoverButton: {
    position: "absolute",
    top: "50px",
    right: "16px",
    borderRadius: "15%",
    height: "50px",
    width: "50px",
    backgroundColor: "gray",
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
});

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
          <List>
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
                          {user && user.name}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <div
        className={classes.hoverButton}
        onClick={() => setDrawerOpen(true)}
      ></div>
    </div>
  );
};
