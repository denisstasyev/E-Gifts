import React from "react";

import { useStyles } from "./styles";

const MyForm = props => {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      {props.children}
    </form>
  );
};

export default MyForm;
