let socket: WebSocket | null = null;

export const connectWebsocket = (channelUuid: string) => {
  if (socket) {
    socket.close();
  }
  console.log(`CREATING NEW WS TO ws://localhost:8080/ws/${channelUuid}`);
  socket = new WebSocket(`ws://localhost:8080/ws/${channelUuid}`);
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

export const sendWebsocketMessage = (message: string) => {
  if (socket && socket.readyState === socket.OPEN) {
    socket.send(message);
  } else {
    console.log(socket);
  }
};

const socketChannelUuid = () => {
  if (socket) {
    return socket.url.split("/").slice(-1)[0];
  }
};
