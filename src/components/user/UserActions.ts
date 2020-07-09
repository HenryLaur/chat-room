import { server } from "../axios/axios";
import { store } from "../../store/store";
import {
  Channel,
  ChannelAndUsers,
  updateUsersInChannel,
} from "../channels/ChannelSlice";
import { setChannelUsers } from "./UserSlice";
export const getUsersInChannel = (channel: Channel) => {
  server
    .get(`/user/${channel.uuid}`)
    .then((response) => {
      console.log(response.data);
      store.dispatch(setChannelUsers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getUsersInChannels = (channels: ChannelAndUsers[]) => {
  const channelUuids: string[] = [];
  channels.forEach((channel) => {
    channelUuids.push(channel.channel.uuid);
  });
  server
    .post(`/user/channels`, channelUuids)
    .then((response) => {
      store.dispatch(updateUsersInChannel(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
