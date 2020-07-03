import { createSlice } from "@reduxjs/toolkit";

const initialState: initialState = {
  selectedChannel: null,
};

export interface initialState {
  selectedChannel: Channel | null;
}

export interface Channel {
  uuid: string;
  name: string;
}
export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setSelectedChannel(state, action) {
      state.selectedChannel = action.payload;
    },
    unselectChannel(state) {
      state.selectedChannel = null;
    },
  },
});

export const { setSelectedChannel, unselectChannel } = channelSlice.actions;

export default channelSlice.reducer;
