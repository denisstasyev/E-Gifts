import React from "react";
// import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import CropFreeIcon from "@material-ui/icons/CropFree";

import DetectRTC from "detectrtc";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyTwoBoxes } from "components/MyTwoBoxes";
import { MyBox } from "components/MyBox";
import { VRViewer } from "components/VRViewer";
import ARViewer from "components/ARViewer";
import { Marker } from "components/Marker";
import { ButtonMobile } from "components/ButtonMobile";
import { ButtonFixed } from "components/ButtonFixed";

import { checkIsMobile } from "utils";

import { useStyles } from "./styles";

const View = props => {
  const classes = useStyles();

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
            // type="big"
            leftBoxTitle="Your E-Gift in VR"
            leftBox={
              <>
                <VRViewer modelURL="http://localhost:5000/pony_cartoon/scene.gltf" />
                <Typography>
                  You can rotate it text text text text text text text text text
                  text text //TODO: fix blue highlight
                </Typography>
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
                  <Typography className={classes.text}>
                    To get full experience you need to view this E-Gift in AR
                  </Typography>
                  <div> Steps</div>
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
                // props.toggleLabelBottomNavigation();
                // setShowMarker(true);
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
            // props.toggleLabelBottomNavigation();
            // setShowMarker(true);
          }}
        >
          <CropFreeIcon />
        </ButtonFixed>
      )}
    </>
  ) : //       <Typography>To see a gift you need to buy it</Typography>
  //       <Typography component={Link} to="/gallery">
  //         You can buy them in Gallery
  //       </Typography>
  mode === "AR" ? (
    <React.Fragment>
      <ARViewer modelURL="http://localhost:5000/pony_cartoon/scene.gltf" />
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.filter}
        onClick={() => {
          setMode("");
          window.location.reload();
        }}
      >
        Close
      </Fab>
    </React.Fragment>
  ) : mode === "marker" ? (
    <div>Marker</div>
  ) : (
    <div>
      Main
      <VRViewer modelURL="http://localhost:5000/pony_cartoon/scene.gltf" />
      {DetectRTC.isWebRTCSupported === true ? (
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          onClick={() => {
            setMode("AR");
          }}
        >
          View AR
        </Fab>
      ) : null}
    </div>
  );
};

export default View;
