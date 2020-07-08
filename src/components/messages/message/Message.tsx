import React from "react";
import { Message as IMessage } from "../MessageSlice";
import {
  Card,
  CardMedia,
  Typography,
  makeStyles,
  Grid,
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
});

export const Message: React.FC<IMessage> = ({ messageBody, user }) => {
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
          <Grid item xs={4}>
            <Typography gutterBottom variant="body2" color="textSecondary">
              {user && user.name}
            </Typography>
            <Typography variant="body2">{messageBody}</Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
