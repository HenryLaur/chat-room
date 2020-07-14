import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialState = {
  selectedChannel: null,
  channels: [],
  error: false,
};

export interface initialState {
  selectedChannel: Channel | null;
  channels: ChannelAndUsers[];
  error: boolean;
}

export interface ChannelAndUsers {
  channel: Channel;
  users: number;
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
    addChannel(state, action: PayloadAction<ChannelAndUsers>) {
      const findIndex = state.channels.findIndex(
        (channel) => channel.channel.uuid === action.payload.channel.uuid
      );

      if (findIndex === -1) {
        state.channels.push(action.payload);
      }
    },
    updateUsersInChannel(state, action) {
      state.channels.forEach((channel) => {
        if (action.payload[channel.channel.uuid]) {
          channel.users = action.payload[channel.channel.uuid].length;
        }
      });
    },
    setNeedActiveChannelError(state) {
      state.error = true;
    },
    clearNeedActiveChannelError(state) {
      state.error = false;
    },
  },
});

export const {
  setSelectedChannel,
  unselectChannel,
  addChannel,
  updateUsersInChannel,
  setNeedActiveChannelError,
  clearNeedActiveChannelError,
} = channelSlice.actions;

export default channelSlice.reducer;
