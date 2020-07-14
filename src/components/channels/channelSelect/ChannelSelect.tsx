import React, { useState } from "react";
import { TextField, Box, makeStyles } from "@material-ui/core";
import { v5 as uuidv5 } from "uuid";
import { Channel, clearNeedActiveChannelError } from "../ChannelSlice";
import { saveChannelServer } from "../ChannelActions";
import { NAMESPACE } from "../../../constants/Constants";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { setNeedSetUserNameError } from "../../user/UserSlice";

const useStyles = makeStyles({
  pointer: {
    cursor: "pointer",
  },
});

export const ChannelSelect = () => {
  const [channelName, setChannelName] = useState("");
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.user.user);
  const error = useSelector((state: RootState) => state.channel.error);

  const dispatch = useDispatch();

  const saveChannel = () => {
    dispatch(clearNeedActiveChannelError());
    if (user) {
      const channel: Channel = {
        uuid: uuidv5(channelName, NAMESPACE),
        name: channelName,
      };
      saveChannelServer(channel);
      setChannelName("");
    } else {
      dispatch(setNeedSetUserNameError());
    }
  };

  return (
    <Box ml={3} mr={3}>
      <TextField
        error={error}
        size="small"
        id="ChannelSearch"
        label="Channel Name"
        variant="outlined"
        fullWidth
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            saveChannel();
          }
        }}
        InputProps={{
          endAdornment: (
            <div onClick={() => saveChannel()} className={classes.pointer}>
              <SearchIcon />
            </div>
          ),
        }}
      />
    </Box>
  );
};
