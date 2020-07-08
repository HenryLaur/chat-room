import { Channel, addChannel } from "./ChannelSlice";
import { server } from "../axios/axios";
import { store } from "../../store/store";
export const saveChannelServer = (channel: Channel) => {
  server
    .post("/channel/create", channel)
    .then((response) => {
      console.log(response.data);
      store.dispatch(addChannel({ channel, users: response.data.length }));
    })
    .catch((error) => {
      console.log(error);
    });
};
