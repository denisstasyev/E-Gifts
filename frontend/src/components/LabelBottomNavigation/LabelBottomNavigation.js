import React from "react";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import HomeIcon from "@material-ui/icons/Home";
import GalleryIcon from "@material-ui/icons/Redeem";
import CameraIcon from "@material-ui/icons/CameraAlt";
import AccountIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "absolute",
    bottom: "0",
    backgroundColor: theme.palette.background.default
    // height: "56px"
  }
}));

const LabelBottomNavigation = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(
    props.location.pathname.split("/")[1]
  );

  React.useEffect(() => {
    setValue(props.location.pathname.split("/")[1]);
  }, [props.location.pathname]);

  return (
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
        label="View"
        value="view"
        icon={<CameraIcon />}
        component={Link}
        to="/view"
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<AccountIcon />}
        component={Link}
        to="/profile"
      />
    </BottomNavigation>
  );
};

export default withRouter(LabelBottomNavigation);