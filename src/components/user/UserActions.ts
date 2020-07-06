import { server } from "../axios/axios";
import { store } from "../../store/store";
import { Channel } from "../channels/ChannelSlice";
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
