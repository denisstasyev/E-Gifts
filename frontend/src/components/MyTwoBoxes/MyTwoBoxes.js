import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

const MyTwoBoxes = props => {
  const classes = useStyles();

  return (
    <div className={classes.boxes}>
      <div className={classes.leftBox}>
        <Box className={classes.content} p={2} mt={2}>
          {props.leftBoxTitle !== undefined ? (
            <Typography className={classes.title} variant="h5">
              {props.leftBoxTitle}
            </Typography>
          ) : null}
          {props.leftBox}
        </Box>
      </div>
      <div className={classes.rightBox}>
        <Box className={classes.content} p={2} mt={2}>
          {props.rightBoxTitle !== undefined ? (
            <Typography className={classes.title} variant="h5">
              {props.rightBoxTitle}
            </Typography>
          ) : null}
          {props.rightBox}
        </Box>
      </div>
    </div>
  );
};

export default MyTwoBoxes;
