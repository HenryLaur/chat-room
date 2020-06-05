import { configureStore, combineReducers } from "@reduxjs/toolkit";
import messageReducer from "../components/messages/messageSlice";

export const reducer = combineReducers({
  message: messageReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;

export default store;
