import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

const MyAvatar = props => {
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar}>{props.children}</Avatar>
      <Typography variant="h5">{props.title}</Typography>
    </>
  );
};

export default MyAvatar;
