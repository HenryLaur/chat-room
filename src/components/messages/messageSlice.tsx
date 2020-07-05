import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialState = {
  messages: [],
  user: ["Jake", "David", "Arron", "Paul", "Garolt"][
    Math.floor(Math.random() * Math.floor(5))
  ],
};

export interface initialState {
  messages: Message[];
  user: string;
}

export interface Message {
  user: string;
  messageBody: string;
}

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.unshift(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
    addMessageCollection(state, action: PayloadAction<Message[]>) {
      console.log(action.payload);
      action.payload.forEach((message) => {
        state.messages.push(message);
      });
      console.log(state.messages.length);
    },
  },
});

export const {
  addMessage,
  clearMessages,
  addMessageCollection,
} = messageSlice.actions;

export default messageSlice.reducer;
