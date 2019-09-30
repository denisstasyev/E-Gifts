import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import HomeIcon from "@material-ui/icons/Home";
import GalleryIcon from "@material-ui/icons/Redeem";
import CameraIcon from "@material-ui/icons/CameraAlt";
import AccountIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: "0"
  }
});

export default withRouter(props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.location.pathname);

  React.useEffect(() => {
    setValue(props.location.pathname);
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        value="/home"
        icon={<HomeIcon />}
        component={NavLink}
        to="/home"
      />
      <BottomNavigationAction
        label="Gallery"
        value="/gallery"
        icon={<GalleryIcon />}
        component={NavLink}
        to="/gallery"
      />
      <BottomNavigationAction
        label="Camera"
        value="/camera"
        icon={<CameraIcon />}
        component={NavLink}
        to="/camera"
      />
      <BottomNavigationAction
        label="Account"
        value="/account"
        icon={<AccountIcon />}
        component={NavLink}
        to="/account"
      />
    </BottomNavigation>
  );
});
