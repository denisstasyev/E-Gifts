import React from "react";

import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

const Alert = props => {
  const classes = useStyles();

  return (
    <Typography className={classes.alert} align="center">
      {props.text}
    </Typography>
  );
};

export default Alert;
