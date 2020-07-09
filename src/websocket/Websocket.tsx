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
  content: NestedMessage;
}

export interface NestedMessage {
  message: Message;
}
export interface ChannelAction {
  user: string;
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
  user: string,
  currentChannel: Channel,
  nextChannel: Channel
) => {
  if (socket) {
    sendChannelTypeMessage("LEAVE", user, currentChannel);
    socket.close();
  }
  socket = new WebSocket(
    `ws://${document.location.hostname}:8080/ws/${nextChannel.uuid}`
  );
  const interval = setInterval(() => {
    if (socket && socket.readyState === socket.OPEN) {
      sendChannelTypeMessage("JOIN", user, nextChannel);
      clearInterval(interval);
    }
  }, 10);
};

const sendChannelTypeMessage = (
  type: "LEAVE" | "JOIN",
  user: string,
  currentChannel: Channel
) => {
  sendWebsocketMessage({
    type,
    content: {
      user,
      channel: currentChannel,
    },
  });
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
