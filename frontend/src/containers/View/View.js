import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import GalleryIcon from "@material-ui/icons/Redeem";
import CropFreeIcon from "@material-ui/icons/CropFree";

import DetectRTC from "detectrtc";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";

import { addOnLoadAnimation, resolveContent } from "utils/animations";
import { MOBILE_WIDTH } from "configs/CSSvariables";

import { useStyles } from "./styles";

const getSteps = () => {
  return [
    "Get a unique Link with E-Gift from a congratulator",
    "Open this Link and view E-Gift"
  ];
};

const View = () => {
  const classes = useStyles();
  const steps = getSteps();

  addOnLoadAnimation(resolveContent);

  const [mode, setMode] = React.useState("");

  return mode === "" ? (
    <>
      <MyContainer>
        <Header topic="View" />
        <Box id="content" mb={9}>
          {DetectRTC.isWebRTCSupported !== true ? (
            <MyBox title="Warning" type="warning">
              <Typography>
                Unfortunately, your browser or device does not support E-Gifts's
                AR technology, try changing them. In any case, you can receive
                and view E-Gift in VR
              </Typography>
            </MyBox>
          ) : null}
          <MyBox title="How to view E-Gift?">
            <Stepper
              orientation={
                window.innerWidth < MOBILE_WIDTH ? "vertical" : "horizontal"
              }
            >
              {steps.map((label, index) => (
                <Step className={classes.step} key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </MyBox>
          <MyBox title="Don't you want to wait for the holiday?">
            <Typography>You can always get E-Gift in the Gallery</Typography>
            <div className={classes.fab}>
              <Fab
                variant="extended"
                size="small"
                color="primary"
                component={Link}
                to="/home"
              >
                <GalleryIcon className={classes.icon} />
                Gallery
              </Fab>
            </div>
          </MyBox>
        </Box>
      </MyContainer>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        className={classes.marker}
        onClick={() => {
          setMode("marker");
        }}
      >
        <CropFreeIcon className={classes.icon} />
        Marker
      </Fab>
    </>
  ) : null;
  //
  //       <Typography>To see a gift you need to buy it</Typography>
  //       <Typography component={Link} to="/gallery">
  //         You can buy them in Gallery
  //       </Typography>

  // ) : (
  //   <div>
  //     Main
  //     <VRViewer modelURL="http://localhost:5000/ok/pony_cartoon/scene.gltf" />
  //     {DetectRTC.isWebRTCSupported === true ? (
  //       <Fab
  //         variant="extended"
  //         size="medium"
  //         color="primary"
  //         onClick={() => {
  //           setMode("AR");
  //         }}
  //       >
  //         View AR
  //       </Fab>
  //     ) : null}
  //   </div>
  // );
};

export default View;
