let socket: WebSocket | null = null;

export const connectWebsocket = () => {
  socket = new WebSocket("ws://localhost:8080/name");
  return socket;
};

export const getSocket = () => {
  if (socket) {
    return socket;
  } else {
    return connectWebsocket();
  }
};

export const sendWebsocketMessage = (message: string) => {
  if (socket && socket.readyState === socket.OPEN) {
    socket.send(message);
  } else {
    console.log(socket);
  }
};
