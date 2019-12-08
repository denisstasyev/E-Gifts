import React from "react";
import { connect } from "react-redux";

import BrightnessLow from "@material-ui/icons/Brightness3";
import BrightnessHigh from "@material-ui/icons/WbSunny";

import { SETTINGS_SET_COLOR_THEME } from "store/actionTypes";

import { useStyles } from "./styles";

const LightToggleIcon = props => {
  const classes = useStyles();

  const handleClick = () => {
    localStorage.setItem(
      "colorTheme",
      props.colorTheme === "light" ? "dark" : "light"
    );
    props.setColorTheme(props.colorTheme === "light" ? "dark" : "light");
  };

  return props.colorTheme === "light" ? (
    <BrightnessLow className={classes.lightIcon} onClick={handleClick} />
  ) : (
    <BrightnessHigh className={classes.lightIcon} onClick={handleClick} />
  );
};

const mapStateToProps = state => ({
  isPartlyMobile: state.settingsReducer.isPartlyMobile,
  colorTheme: state.settingsReducer.colorTheme
});

const mapDispatchToProps = dispatch => ({
  setColorTheme: colorTheme =>
    dispatch({ type: SETTINGS_SET_COLOR_THEME, colorTheme })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LightToggleIcon);
