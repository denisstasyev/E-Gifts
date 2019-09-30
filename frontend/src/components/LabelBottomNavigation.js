import React from "react";
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
    bottom: 0
    // backgroundColor: "#00ffcd"
  }
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="Gallery"
        value="gallery"
        icon={<GalleryIcon />}
      />
      <BottomNavigationAction
        label="Camera"
        value="camera"
        icon={<CameraIcon />}
      />
      <BottomNavigationAction
        label="Account"
        value="account"
        icon={<AccountIcon />}
      />
    </BottomNavigation>
  );
}
