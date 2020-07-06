import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/UserSlice";

const initialState: initialState = {
  messages: [],
};

export interface initialState {
  messages: Message[];
}

export interface Message {
  user: User;
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
    setMessageCollection(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
  },
});

export const {
  addMessage,
  clearMessages,
  setMessageCollection,
} = messageSlice.actions;

export default messageSlice.reducer;
