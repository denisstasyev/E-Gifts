import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import HomeIcon from "@material-ui/icons/Home";
import GalleryIcon from "@material-ui/icons/Redeem";
import ProfileIcon from "@material-ui/icons/AccountCircle";

import LogoIcon from "static/logos/transparent.svg";

import { LightToggleIcon } from "components/LightToggleIcon";

import { useStyles } from "./styles";

const Header = props => {
  const classes = useStyles();

  const value = props.location.pathname.split("/")[1];

  return (
    <Toolbar className={classes.root}>
      <Link to="/home">
        <img
          className={classes.logoIcon}
          src={LogoIcon}
          alt="E-Gifts logo"
          width="40px"
        />
      </Link>
      <div className={classes.topic}>
        <Typography variant="h4">{props.topic}</Typography>
        <Typography variant="body2">
          {props.topic === "E-Gifts" || props.isSmallMobile
            ? "Brings gifts to AR & VR!"
            : "E-Gifts - Brings gifts to AR & VR!"}
        </Typography>
      </div>
      {!props.isPartlyMobile ? (
        <>
          <div className={classes.navigation}>
            <Button
              className={value === "home" ? classes.selectedLink : classes.link}
              component={Link}
              to="/home"
            >
              <HomeIcon className={classes.icon} />
              Home
            </Button>
            <Button
              className={
                value === "gallery" ? classes.selectedLink : classes.link
              }
              component={Link}
              to="/gallery"
            >
              <GalleryIcon className={classes.icon} />
              Gallery
            </Button>
            <Button
              className={
                value === "profile" ? classes.selectedLink : classes.link
              }
              component={Link}
              to="/profile"
            >
              <ProfileIcon className={classes.icon} />
              Profile
            </Button>
          </div>
          <LightToggleIcon />
        </>
      ) : (
        <div className={classes.navigation}>
          <LightToggleIcon />
        </div>
      )}
    </Toolbar>
  );
};

const mapStateToProps = state => ({
  isPartlyMobile: state.settingsReducer.isPartlyMobile,
  isSmallMobile: state.settingsReducer.isSmallMobile
});

export default connect(
  mapStateToProps,
  null
)(withRouter(Header));
