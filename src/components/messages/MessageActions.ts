import { server } from "../axios/axios";
import { store } from "../../store/store";
import { addMessageCollection } from "./MessageSlice";
import { Channel } from "../channels/ChannelSlice";
export const getAllMessagesFromChannel = (channel: Channel) => {
  server
    .get(`/messages/${channel.uuid}`)
    .then((response) => {
      console.log(response.data);
      store.dispatch(addMessageCollection(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
