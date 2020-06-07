import { createSlice } from "@reduxjs/toolkit";
import { Message } from "./message/Message";

const initialState: initialState = {
  messages: [],
  user: ["Jake", "David", "Arron", "Paul", "Garolt"][
    Math.floor(Math.random() * Math.floor(5))
  ],
  webSocket: null,
};

export interface initialState {
  messages: Message[];
  user: string;
  webSocket: WebSocket | null;
}
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action) {
      const message = action.payload;
      state.messages.push(message);
    },
    connectWebSocket(state, action) {
      state.webSocket = action.payload;
    },
  },
});

export const { addMessage, connectWebSocket } = messageSlice.actions;

export default messageSlice.reducer;
