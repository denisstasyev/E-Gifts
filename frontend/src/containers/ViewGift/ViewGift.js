import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import CameraIcon from "@material-ui/icons/CameraAlt";
import CropFreeIcon from "@material-ui/icons/CropFree";
import CloseIcon from "@material-ui/icons/Close";

import DetectRTC from "detectrtc";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyTwoBoxes } from "components/MyTwoBoxes";
// import { MyBox } from "components/MyBox";
import { VRViewer } from "components/VRViewer";
import { ARViewer } from "components/ARViewer";
import { Marker } from "components/Marker";
import { ButtonMobile } from "components/ButtonMobile";
import { ButtonFixed } from "components/ButtonFixed";

import { checkIsMobile } from "utils";
import { addOnLoadAnimation, resolveContent } from "utils/animations";

import { LABELBOTTOMNAVIGATION_TOGGLE } from "store/actionTypes";

import { useStyles } from "./styles";

const getSteps = () => {
  return [
    "To get full experience you need to view this E-Gift in AR",
    "To view E-Gift, open the Marker on another device (the button in the lower left corner of the View page) or print it"
  ];
};

const View = props => {
  const classes = useStyles();
  const steps = getSteps();

  addOnLoadAnimation(resolveContent);

  // const link = props.location.pathname.substring(
  //   props.location.pathname.lastIndexOf("/") + 1,
  //   props.location.pathname.length
  // );

  const [mode, setMode] = React.useState("");

  const isMobile = checkIsMobile();

  return mode === "" ? (
    <>
      <MyContainer>
        <Header topic="Congratulations" />
        <Box id="content" mb={2}>
          <MyTwoBoxes
            type="big"
            leftBoxTitle="Your E-Gift in VR"
            leftBox={
              <>
                <div id="vr" className={classes.vr}>
                  <VRViewer
                    modelURL="http://localhost:5000/pony_cartoon/scene.gltf"
                    scaleX={0.005}
                    scaleY={0.005}
                    scaleZ={0.005}
                  />
                </div>
                <Typography>Drag to rotate, pinch or scroll to zoom</Typography>
                <Typography className={classes.title}>
                  Congratulator left you a message
                </Typography>
                <Typography className={classes.text}>text</Typography>
              </>
            }
            rightBoxType={DetectRTC.isWebRTCSupported === true ? "" : "warning"}
            rightBoxTitle={
              DetectRTC.isWebRTCSupported === true
                ? "How to view in AR?"
                : "Warning"
            }
            rightBox={
              DetectRTC.isWebRTCSupported === true ? (
                <>
                  <Stepper orientation="vertical">
                    {steps.map((label, index) => (
                      <Step className={classes.step} key={index}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <Fab
                    className={classes.fab}
                    variant="extended"
                    size="small"
                    color="primary"
                    onClick={() => {
                      props.toggleLabelBottomNavigation();
                      setMode("AR");
                    }}
                  >
                    <CameraIcon className={classes.icon} />
                    View in AR
                  </Fab>
                </>
              ) : (
                <Typography className={classes.text}>
                  Unfortunately, your browser or device does not support
                  E-Gifts's AR technology, try changing them to get full
                  experience with AR
                </Typography>
              )
            }
          />
          {isMobile ? (
            <ButtonMobile
              type="onClick"
              text="Marker"
              onClick={() => {
                props.toggleLabelBottomNavigation();
                setMode("marker");
              }}
            >
              <CropFreeIcon />
            </ButtonMobile>
          ) : null}
        </Box>
      </MyContainer>
      {isMobile ? null : (
        <ButtonFixed
          type="onClick"
          text="Marker"
          onClick={() => {
            props.toggleLabelBottomNavigation();
            setMode("marker");
          }}
        >
          <CropFreeIcon />
        </ButtonFixed>
      )}
    </>
  ) : mode === "marker" ? (
    <>
      <Marker />
      <ButtonFixed
        type="onClick"
        text="Close"
        onClick={() => {
          props.toggleLabelBottomNavigation();
          setMode("");
        }}
      >
        <CloseIcon />
      </ButtonFixed>
    </>
  ) : mode === "AR" ? (
    <>
      <ARViewer
        modelURL="http://localhost:5000/pony_cartoon/scene.gltf"
        scaleX={0.005}
        scaleY={0.005}
        scaleZ={0.005}
      />
      <ButtonFixed
        type="onClick"
        text="Close"
        onClick={() => window.location.reload()}
      >
        <CloseIcon />
      </ButtonFixed>
    </>
  ) : null;
};

const mapDispatchToProps = dispatch => ({
  toggleLabelBottomNavigation: () =>
    dispatch({
      type: LABELBOTTOMNAVIGATION_TOGGLE
    })
});

export default connect(
  null,
  mapDispatchToProps
)(View);
