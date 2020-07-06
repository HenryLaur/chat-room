import { User } from "../components/user/UserSlice";
import { Message } from "../components/messages/MessageSlice";
import { Channel } from "../components/channels/ChannelSlice";

let socket: WebSocket | null = null;

export type WebSocketMessage = WebSocketChannelType | WebSocketMessageType;

export interface WebSocketChannelType {
  type: "JOIN" | "LEAVE";
  content: ChannelAction;
}
export interface WebSocketMessageType {
  type: "MESSAGE";
  content: Message;
}
export interface ChannelAction {
  user: User;
  channel: Channel | null;
}
export const connectWebsocket = (channelUuid: string) => {
  if (socket) {
    socket.close();
  }
  console.log(`CREATING NEW WS TO ws://localhost:8080/ws/${channelUuid}`);
  socket = new WebSocket(
    `ws://${document.location.hostname}:8080/ws/${channelUuid}`
  );
  return socket;
};

export const getSocket = (channelUuid: string | null | undefined) => {
  if (!channelUuid) {
    return;
  }
  if (socket && socketChannelUuid() === channelUuid) {
    return socket;
  } else {
    return connectWebsocket(channelUuid);
  }
};

export const switchSocketConnectionChannel = (
  user: User,
  currentChannel: Channel,
  nextChannel: Channel
) => {
  if (socket) {
    sendWebsocketMessage({
      type: "LEAVE",
      content: {
        user,
        channel: currentChannel,
      },
    });
    socket.close();
  }
  socket = new WebSocket(
    `ws://${document.location.hostname}:8080/ws/${nextChannel.uuid}`
  );
  console.trace();
  const interval = setInterval(() => {
    if (socket && socket.readyState === socket.OPEN) {
      console.log("SENDING JOIN");
      sendWebsocketMessage({
        type: "JOIN",
        content: {
          user,
          channel: nextChannel,
        },
      });
      clearInterval(interval);
    }
  }, 10);
};

export const sendWebsocketMessage = (message: WebSocketMessage) => {
  if (socket && socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.log(socket);
  }
};

const socketChannelUuid = () => {
  if (socket) {
    return socket.url.split("/").slice(-1)[0];
  }
};
