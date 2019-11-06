import React from "react";

import { useStyles } from "./styles";

const MyTwoBoxes = props => {
  const classes = useStyles();

  return (
    <div className={classes.boxes}>
      <div className={classes.leftBox}>{props.leftBox}</div>
      <div className={classes.rightBox}>{props.rightBox}</div>
    </div>
  );
};

export default MyTwoBoxes;
