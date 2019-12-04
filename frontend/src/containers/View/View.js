import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import GalleryIcon from "@material-ui/icons/Redeem";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";

import { addOnLoadAnimation, resolveContent } from "utils/animations";

import { useStyles } from "./styles";

const getSteps = () => {
  return [
    "Get a unique Link with E-Gift from a congratulator",
    "Open this Link and view E-Gift"
  ];
};

const View = props => {
  const classes = useStyles();
  const steps = getSteps();

  addOnLoadAnimation(resolveContent);

  return (
    <MyContainer>
      <Header topic="View" />
      <Box id="content" pb={2}>
        <MyBox title="How to view E-Gift?">
          <Stepper orientation={props.isMobile ? "vertical" : "horizontal"}>
            {steps.map((label, index) => (
              <Step
                className={props.isMobile ? classes.step : null}
                key={index}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </MyBox>
        <MyBox title="Supported devices">
          <Typography>
            Our AR technology based on ARKit by Apple and ARCore by Google,
            that's why only devices with iOS 12 or Android 9 or later are
            supported.
          </Typography>
          <Typography>
            Don't worry if the recipient doesn't have such a device. He will be
            able to view E-Gift in VR
          </Typography>
        </MyBox>
        <MyBox title="Don't you want to wait for the holiday?">
          <Typography>You can always get E-Gift in the Gallery</Typography>
          <div className={classes.fab}>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              component={Link}
              to="/gallery"
            >
              <GalleryIcon className={classes.icon} />
              Gallery
            </Fab>
          </div>
        </MyBox>
      </Box>
    </MyContainer>
  );
};

const mapStateToProps = state => ({
  isMobile: state.settingsReducer.isMobile
});

export default connect(
  mapStateToProps,
  null
)(View);
