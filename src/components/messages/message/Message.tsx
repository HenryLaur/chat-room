import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export interface Message {
  messageBody: string;
}

export const Message: React.FC<Message> = ({ messageBody }) => {
  const user = useSelector((state: RootState) => state.message.user);
  return <div>{`${user}: ${messageBody}`}</div>;
};
