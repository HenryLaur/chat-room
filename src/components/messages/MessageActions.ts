import { server } from "../axios/axios";
import { store } from "../../store/store";
import { setMessageCollection } from "./MessageSlice";
import { Channel } from "../channels/ChannelSlice";
export const getAllMessagesFromChannel = (channel: Channel) => {
  server
    .get(`/messages/${channel.uuid}`)
    .then((response) => {
      store.dispatch(setMessageCollection(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
