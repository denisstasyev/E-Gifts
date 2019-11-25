import React from "react";

import { useTheme } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";

import CameraIcon from "@material-ui/icons/CameraAlt";

import "@google/model-viewer";

import Confetti from "react-confetti";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";

import { addOnLoadAnimation, resolveContent } from "utils/animations";

import { useStyles } from "./styles";

const ModelViewerComponent = "model-viewer";

const ViewerBeta = () => {
  const classes = useStyles();
  const theme = useTheme();

  addOnLoadAnimation(resolveContent);

  return (
    <>
      <Confetti numberOfPieces={400} recycle={false} />
      <MyContainer>
        <Header topic="E-Gift for you" />
        <Box id="content" mb={2}>
          <MyBox title="Viewer">
            <ModelViewerComponent //! .glb models much better than .gltf
              style={{
                width: "100%",
                height: "100%",
                minHeight: "400px",
                outline: "none"
              }}
              auto-rotate
              camera-controls
              autoplay
              shadow-intensity={1}
              background-color={theme.palette.background.paper}
              // camera-orbit="-20deg 75deg 2m"
              alt="A 3D model of an astronaut."
              src={require("static/models/Bee.glb")}
              ios-src={require("static/models/bee2.usdz")}
              magic-leap
              ar
            >
              {/* <button  className={classes.button}> */}
              <Fab
                slot="ar-button"
                className={classes.button}
                variant="extended"
                size="small"
                color="primary"
              >
                <CameraIcon className={classes.icon} />
                Activate AR
              </Fab>

              {/* </button> */}
            </ModelViewerComponent>
          </MyBox>
        </Box>
      </MyContainer>
    </>
  );
};

export default ViewerBeta;
