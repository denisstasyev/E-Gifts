import React from "react";

import { useStyles } from "./styles";

const MyBox2 = props => {
  const classes = useStyles();

  return <div className={classes.defaultBox}>{props.children}</div>;
};

export default MyBox2;
