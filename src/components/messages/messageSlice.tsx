import { createSlice } from "@reduxjs/toolkit";

const initialState: initialState = {
  messages: [],
  user: ["Jake", "David", "Arron", "Paul", "Garolt"][
    Math.floor(Math.random() * Math.floor(5))
  ],
};

export interface initialState {
  messages: string[];
  user: string;
}
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action) {
      const message = action.payload;
      state.messages.push(message);
    },
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
