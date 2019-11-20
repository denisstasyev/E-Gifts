import React from "react";
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

import axios from "axios";

import DetectRTC from "detectrtc";

import { NotFound } from "containers/NotFound";
import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";
import { MyTwoBoxes } from "components/MyTwoBoxes";
import { ViewerVR } from "components/ViewerVR";
import { ViewerAR } from "components/ViewerAR";
import { Marker } from "components/Marker";
import { ButtonMobile } from "components/ButtonMobile";
import { ButtonFixed } from "components/ButtonFixed";

import * as config from "configs/backendAPI";

import { checkIsMobile } from "utils";

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

  const [isValidGift, setIsValidGift] = React.useState(true);
  const [modelURL, setModelURL] = React.useState("");
  const [scaleX, setScaleX] = React.useState(0);
  const [scaleY, setScaleY] = React.useState(0);
  const [scaleZ, setScaleZ] = React.useState(0);
  const [light, setLight] = React.useState(0);
  const [text, setText] = React.useState("");

  const link = props.location.pathname.substring(
    props.location.pathname.lastIndexOf("/") + 1,
    props.location.pathname.length
  );

  React.useEffect(() => {
    axios
      .get(`${config.BACKEND_SERVER}/get_model_by_ref?guid=${link}`)
      .then(response => {
        if (response.data[config.RESULT]) {
          setModelURL(response.data[config.VIEW_MODEL_URL]);
          setScaleX(response.data[config.VIEW_SCALE_X]);
          setScaleY(response.data[config.VIEW_SCALE_Y]);
          setScaleZ(response.data[config.VIEW_SCALE_Z]);
          setLight(response.data[config.VIEW_LIGHT]);
          setText(response.data[config.VIEW_TEXT]);
        } else {
          setIsValidGift(false);
        }
      })
      .catch(() => {
        console.log("Cannot buy gift: network problem");
        setIsValidGift(false); //TODO: dispatch(loadFail("Network problem, try again later"));
      });
    // eslint-disable-next-line
  }, []);

  const [mode, setMode] = React.useState("welcome");

  const isMobile = checkIsMobile();

  if (!isValidGift) {
    return <NotFound />;
  } else {
    return mode === "welcome" ? (
      <MyContainer>
        <Header topic="Congratulations" />
        <Box id="content" mb={2}>
          {text !== "" ? (
            <MyBox title="Congratulator left you a message">
              <Typography className={classes.text}>{text}</Typography>
            </MyBox>
          ) : null}
          <div onClick={() => setMode("main")}>
            <MyBox title="Click to open your E-Gift" type="success" />
          </div>
        </Box>
      </MyContainer>
    ) : mode === "main" ? (
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
                    <ViewerVR
                      modelURL={`${config.BACKEND_SERVER}/${modelURL}`}
                      scaleX={scaleX}
                      scaleY={scaleY}
                      scaleZ={scaleZ}
                      light={light}
                    />
                  </div>
                  <Typography>
                    Drag to rotate, pinch or scroll to zoom
                  </Typography>
                </>
              }
              rightBoxType={
                DetectRTC.isWebRTCSupported === true ? "" : "warning"
              }
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
            setMode("main");
          }}
        >
          <CloseIcon />
        </ButtonFixed>
      </>
    ) : mode === "AR" ? (
      <>
        <ViewerAR
          // modelURL="http://localhost:5000/pony_cartoon/scene.gltf"
          modelURL={`${config.BACKEND_SERVER}/${modelURL}`}
          scaleX={scaleX}
          scaleY={scaleY}
          scaleZ={scaleZ}
          light={light}
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
  }
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
