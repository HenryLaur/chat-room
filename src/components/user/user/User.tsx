import React from "react";
import { TextField, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearNeedSetUserNameError } from "../UserSlice";
import { RootState } from "../../../store/store";

export const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const error = useSelector((state: RootState) => state.user.error);

  const saveUser = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(clearNeedSetUserNameError());
    dispatch(setUser(e.target.value));
  };

  return (
    <Box mr={3} ml={3} mb={3}>
      <TextField
        error={Boolean(error)}
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
