import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  logoIcon: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(-2)
  }
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <Toolbar className={classes.root} id="back-to-top-anchor">
      <img
        className={classes.logoIcon}
        src={require("static/logos/transparent.svg")}
        alt="E-Gifts logo"
        width="40px"
      />
      <Typography variant="h5">{props.topic}</Typography>
    </Toolbar>
  );
}
