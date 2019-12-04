import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import HomeIcon from "@material-ui/icons/Home";
import GalleryIcon from "@material-ui/icons/Redeem";
import ProfileIcon from "@material-ui/icons/AccountCircle";

import { useStyles } from "./styles";

const Header = props => {
  const classes = useStyles();

  const value = props.location.pathname.split("/")[1];

  return (
    <Container maxWidth="lg">
      <Toolbar className={classes.root}>
        {!props.isPartlyMobile && (
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
        )}
      </Toolbar>
    </Container>
  );
};

const mapStateToProps = state => ({
  isPartlyMobile: state.settingsReducer.isPartlyMobile
});

export default connect(
  mapStateToProps,
  null
)(withRouter(Header));
