import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialState = {
  user: "",
  channelUsers: [],
  error: false,
};

export interface initialState {
  user: string | null;
  channelUsers: string[];
  error: boolean;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    setChannelUsers(state, action: PayloadAction<string[]>) {
      state.channelUsers = action.payload;
    },
    addChannelUsers(state, action: PayloadAction<string>) {
      state.channelUsers.push(action.payload);
    },
    removeChannelUser(state, action: PayloadAction<string>) {
      const userIndexToRemove = state.channelUsers.findIndex(
        (channelUser) => channelUser === action.payload
      );
      if (userIndexToRemove !== -1) {
        state.channelUsers.splice(userIndexToRemove, 1);
      }
    },
    setNeedSetUserNameError(state) {
      state.error = true;
    },
    clearNeedSetUserNameError(state) {
      state.error = false;
    },
  },
});

export const {
  setUser,
  setChannelUsers,
  addChannelUsers,
  removeChannelUser,
  setNeedSetUserNameError,
  clearNeedSetUserNameError,
} = userSlice.actions;

export default userSlice.reducer;
