import { configureStore, combineReducers } from "@reduxjs/toolkit";
import messageReducer from "../components/messages/MessageSlice";
import channelReducer from "../components/channels/ChannelSlice";

export const reducer = combineReducers({
  message: messageReducer,
  channel: channelReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;

export default store;
