import React from "react";
import { Link } from "react-router-dom";

import Fab from "@material-ui/core/Fab";

import { useStyles } from "./styles";

const ButtonMobile = props => {
  const classes = useStyles();

  return props.type === "link" ? (
    <Fab
      variant="extended"
      size="medium"
      color="primary"
      className={classes.mobileButton}
      component={Link}
      to={props.to}
    >
      {props.children}
      <span className={classes.text}>{props.text}</span>
    </Fab>
  ) : props.type === "onClick" ? (
    <Fab
      variant="extended"
      size="medium"
      color="primary"
      className={classes.mobileButton}
      onClick={props.onClick}
    >
      {props.children}
      <span className={classes.text}>{props.text}</span>
    </Fab>
  ) : null;
};

export default ButtonMobile;
