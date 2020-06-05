import { initialState as messageState } from "../components/messages/messageSlice";

export interface RootState {
  message: messageState;
}
