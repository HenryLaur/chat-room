import { initialState as messageState } from "../components/messages/MessageSlice";
import { initialState as channelState } from "../components/channels/ChannelSlice";

export interface RootState {
  message: messageState;
  channel: channelState;
}
