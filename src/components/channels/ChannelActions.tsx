import { Channel } from "./ChannelSlice";
import { server } from "../axios/axios";

export const saveChannelServer = (channel: Channel) => {
  server
    .post("/channel/create", channel)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
