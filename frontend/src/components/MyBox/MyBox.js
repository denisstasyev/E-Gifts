import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

const MyBox = props => {
  const classes = useStyles();

  return (
    <Box className={classes.box} mt={2} p={2}>
      {props.title !== undefined ? (
        <Typography className={classes.title} variant="h5">
          {props.title}
        </Typography>
      ) : null}
      {props.children}
    </Box>
  );
};

export default MyBox;
