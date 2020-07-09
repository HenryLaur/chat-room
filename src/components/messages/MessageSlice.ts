import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialState = {
  messages: [],
};

export interface initialState {
  messages: Message[];
}

export interface Message {
  user: string;
  messageBody: string;
  dateTime: Date;
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
    setMessageCollection(state, action: PayloadAction<Message[]>) {
      state.messages = [];
      action.payload.forEach((message) => {
        if (message.messageBody !== null && message.user !== null) {
          state.messages.push(message);
        }
      });
    },
  },
});

export const {
  addMessage,
  clearMessages,
  setMessageCollection,
} = messageSlice.actions;

export default messageSlice.reducer;
