import React from "react";
import { Link } from "react-router-dom";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import LogoIcon from "static/logos/transparent.svg";

import { useStyles } from "./styles";

const Header = props => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root} /*id="back-to-top-anchor"*/>
      <Link to="/home">
        <img
          className={classes.logoIcon}
          src={LogoIcon}
          alt="E-Gifts logo"
          width="40px"
        />
      </Link>
      <div>
        <Typography variant="h4">{props.topic}</Typography>
        <Typography variant="body2">
          {props.topic === "E-Gifts"
            ? "Brings gifts to AR/VR!"
            : "E-Gifts - Brings gifts to AR/VR!"}
        </Typography>
      </div>
    </Toolbar>
  );
};

export default Header;
