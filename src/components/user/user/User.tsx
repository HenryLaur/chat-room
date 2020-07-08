import React, { useState } from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../UserSlice";
import { RootState } from "../../../store/store";

export const User = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const saveUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setUser({ name: username }));
  };

  return (
    <form onSubmit={saveUser}>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            defaultValue={user?.name}
            size="small"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            onChange={(event) => setUsername(event.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            fullWidth
            size="medium"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
