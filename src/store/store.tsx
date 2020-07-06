import { configureStore, combineReducers } from "@reduxjs/toolkit";
import messageReducer from "../components/messages/MessageSlice";
import channelReducer from "../components/channels/ChannelSlice";
import userReducer from "../components/user/UserSlice";
import thunk from "redux-thunk";

export const reducer = combineReducers({
  message: messageReducer,
  channel: channelReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof reducer>;

export default store;
