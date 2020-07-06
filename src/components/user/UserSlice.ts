import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialState = {
  user: null,
  channelUsers: [],
};

export interface initialState {
  user: User | null;
  channelUsers: User[];
}

export interface User {
  name: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setChannelUsers(state, action: PayloadAction<User[]>) {
      state.channelUsers = action.payload;
    },
    addChannelUsers(state, action: PayloadAction<User>) {
      state.channelUsers.push(action.payload);
    },
    removeChannelUser(state, action: PayloadAction<User>) {
      const userIndexToRemove = state.channelUsers.findIndex(
        (channelUser) => channelUser.name === action.payload.name
      );
      if (userIndexToRemove !== -1) {
        state.channelUsers.splice(userIndexToRemove, 1);
      }
    },
  },
});

export const {
  setUser,
  setChannelUsers,
  addChannelUsers,
  removeChannelUser,
} = userSlice.actions;

export default userSlice.reducer;
