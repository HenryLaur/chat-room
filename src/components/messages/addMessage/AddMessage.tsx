import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../messageSlice";

export const AddMessage = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const addRandomMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    dispatch(addMessage(message));
  };

  return (
    <form onSubmit={addRandomMessage}>
      <label>
        Message:
        <input
          type="text"
          name="message"
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};
