import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import HomeIcon from "@material-ui/icons/Home";
import GalleryIcon from "@material-ui/icons/Redeem";
import ProfileIcon from "@material-ui/icons/AccountCircle";

import { useStyles } from "./styles";

const Navigation = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(
    props.location.pathname.split("/")[1]
  );

  React.useEffect(() => {
    setValue(props.location.pathname.split("/")[1]);
  }, [props.location.pathname]);

  return props.show ? (
    !props.isPartlyMobile ? null : (
      <BottomNavigation
        className={classes.root}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon />}
          component={Link}
          to="/home"
        />
        <BottomNavigationAction
          label="Gallery"
          value="gallery"
          icon={<GalleryIcon />}
          component={Link}
          to="/gallery"
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<ProfileIcon />}
          component={Link}
          to="/profile"
        />
      </BottomNavigation>
    )
  ) : null;
};

const mapStateToProps = state => ({
  show: state.navigationReducer.show,
  isPartlyMobile: state.settingsReducer.isPartlyMobile
});

export default connect(
  mapStateToProps,
  null
)(withRouter(Navigation));
