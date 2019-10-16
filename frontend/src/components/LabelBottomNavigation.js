import React from "react";
import { Link, withRouter } from "react-router-dom";
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
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}
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
