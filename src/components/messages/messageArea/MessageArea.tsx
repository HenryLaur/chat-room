import React from "react";
import { Message } from "../message/Message";

interface MessageArea {
  messages: string[];
}

export const MessageArea: React.FC<MessageArea> = ({ messages }) => {
  return (
    <div>
      {messages.map((message, key) => {
        return <div key={key}> {<Message messageBody={message} />} </div>;
      })}
    </div>
  );
};
