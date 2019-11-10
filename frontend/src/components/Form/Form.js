import React from "react";

import { useStyles } from "./styles";

const Form = props => {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate>
      {props.children}
    </form>
  );
};

export default Form;
