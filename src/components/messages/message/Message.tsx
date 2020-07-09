import React from "react";
import { Message as IMessage } from "../MessageSlice";
import {
  Card,
  CardMedia,
  Typography,
  makeStyles,
  Grid,
  Box,
} from "@material-ui/core";
const useStyles = makeStyles({
  userAlign: {
    textAlign: "right",
  },
  img: {
    margin: "5px",
    marginRight: "20px",
    borderRadius: "50%",
    width: "45px",
  },
  title: {
    display: "inline-block",
  },
  messageBody: {
    whiteSpace: "pre-wrap",
  },
});

export const Message: React.FC<IMessage> = ({
  messageBody,
  user,
  dateTime,
}) => {
  const classes = useStyles();
  return (
    <div>
      <Card>
        <Grid container>
          <Grid item>
            <CardMedia
              className={classes.img}
              component="img"
              alt="Contemplative Reptile"
              height="45"
              image="/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />
          </Grid>
          <Grid item xs={10}>
            <Grid item xs={1} className={classes.title}>
              <Typography gutterBottom variant="body2" color="textSecondary">
                {user}
              </Typography>
            </Grid>
            <Grid item xs={1} className={classes.title}>
              <Box ml={1}>
                <Typography gutterBottom variant="body2" color="textSecondary">
                  {`${dateTime.getDate()}/${
                    dateTime.getMonth() + 1
                  }/${dateTime.getFullYear()}`}
                </Typography>
              </Box>
            </Grid>

            <Typography
              variant="body2"
              className={classes.messageBody}
              component="pre"
            >
              {messageBody}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
