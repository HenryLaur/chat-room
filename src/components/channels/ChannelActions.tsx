import { Channel, setSelectedChannel, addChannel } from "./ChannelSlice";
import { server } from "../axios/axios";
import { store } from "../../store/store";
export const saveChannelServer = (channel: Channel) => {
  server
    .post("/channel/create", channel)
    .then(function (response) {
      store.dispatch(setSelectedChannel(channel));
      store.dispatch(addChannel(channel));
    })
    .catch(function (error) {
      console.log(error);
    });
};
