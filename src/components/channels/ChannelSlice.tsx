import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialState = {
  selectedChannel: null,
  channels: [],
};

export interface initialState {
  selectedChannel: Channel | null;
  channels: Channel[];
}

export interface Channel {
  uuid: string;
  name: string;
}

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setSelectedChannel(state, action: PayloadAction<Channel>) {
      state.selectedChannel = action.payload;
    },
    unselectChannel(state) {
      state.selectedChannel = null;
    },
    addChannel(state, action: PayloadAction<Channel>) {
      state.channels.push(action.payload);
    },
  },
});

export const {
  setSelectedChannel,
  unselectChannel,
  addChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
