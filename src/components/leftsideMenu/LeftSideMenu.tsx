import React, { useState } from "react";
import { ChannelSelect } from "../channels/channelSelect/ChannelSelect";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Channel } from "../channels/channel/Channel";
import { User } from "../user/user/User";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  Box,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  root: {
    margin: "10px",
    overflow: "auto",
    maxHeight: "100%",
  },
  user: {
    marginBottom: "30px",
  },
  drawer: {
    width: "250px",
    maxWidth: "250px",
  },
  channels: {
    maxHeight: "80vh",
    overflowY: "auto",
  },
});

export const LeftSideMenuContent = () => {
  const channels = useSelector((state: RootState) => state.channel.channels);
  const classes = useStyles();

  return (
    <List>
      <User />
      <ChannelSelect />
      <Box pt={2} className={classes.channels}>
        <Divider />
        {channels.map((channel, key) => {
          return (
            <ListItem key={key}>
              <Channel
                uuid={channel.channel.uuid}
                name={channel.channel.name}
                users={channel.users}
              />
            </ListItem>
          );
        })}
      </Box>
    </List>
  );
};

export const LeftSideMenu = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <div role="presentation" className={classes.drawer}>
          <LeftSideMenuContent />
        </div>
      </Drawer>
      <div onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </div>
    </div>
  );
};
