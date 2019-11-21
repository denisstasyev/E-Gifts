import React from "react";

import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

const MyBoxCard = props => {
  const classes = useStyles();

  return (
    <div className={classes.main} onClick={props.onClick}>
      <div className={classes.card} p={2}>
        <Typography>{props.text}</Typography>
      </div>
    </div>
  );
};

export default MyBoxCard;
