import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: initialState = {
  selectedChannel: null,
  channels: [],
};

export interface initialState {
  selectedChannel: Channel | null;
  channels: ChannelAndUsers[];
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
      state.channels.push(action.payload);
    },
    updateUsersInChannel(state, action) {
      state.channels.forEach((channel) => {
        console.log(action.payload[channel.channel.uuid]);
        if (action.payload[channel.channel.uuid]) {
          channel.users = action.payload[channel.channel.uuid].length;
        }
      });
    },
  },
});

export const {
  setSelectedChannel,
  unselectChannel,
  addChannel,
  updateUsersInChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
