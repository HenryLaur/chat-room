import { Channel, addChannel } from "./ChannelSlice";
import { server } from "../axios/axios";
import { store } from "../../store/store";
export const saveChannelServer = (channel: Channel) => {
  server
    .post("/channel/create", channel)
    .then((response) => {
      store.dispatch(addChannel(channel));
    })
    .catch((error) => {
      console.log(error);
    });
};
