import React, { useState } from "react";
import { ChannelSelect } from "../channels/channelSelect/ChannelSelect";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Channel } from "../channels/channel/Channel";
import { User } from "../user/user/User";
import { Drawer, Divider, List, ListItem, Box } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export const LeftSideMenuContent = () => {
  const channels = useSelector((state: RootState) => state.channel.channels);

  return (
    <List>
      <User />
      <ChannelSelect />
      <Box pt={2}>
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
  const channelUsers = useSelector(
    (state: RootState) => state.user.channelUsers
  );
  console.log(channelUsers);
  return (
    <div>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => {
          console.log(drawerOpen);
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
