import React from "react";

import Box from "@material-ui/core/Box";

import { useStyles } from "./styles";

const MyBox = props => {
  const classes = useStyles();

  return (
    <Box className={classes.box} mt={2} p={2}>
      {props.children}
    </Box>
  );
};

export default MyBox;
