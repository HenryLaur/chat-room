import React from "react";
import { TextField, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../UserSlice";
import { RootState } from "../../../store/store";

export const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const saveUser = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(setUser(e.target.value));
  };

  return (
    <Box mr={3} ml={3} mb={3}>
      <TextField
        defaultValue={user}
        size="small"
        id="outlined-basic"
        label="Username"
        variant="outlined"
        fullWidth
        onChange={(event) => saveUser(event)}
      />
    </Box>
  );
};
