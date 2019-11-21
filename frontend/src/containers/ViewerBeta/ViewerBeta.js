import React from "react";

import { useTheme } from "@material-ui/styles";
import Box from "@material-ui/core/Box";

import "@google/model-viewer";

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
            shadow-intensity="1"
            background-color={theme.palette.background.paper}
            // camera-orbit="-20deg 75deg 2m"
            alt="A 3D model of an astronaut."
            src={require("static/models/Bee.glb")}
            ios-src={require("static/models/bee2.usdz")}
            magic-leap
            ar
          >
            <button slot="ar-button" className={classes.button}>
              <span role="img" aria-label="Touch to">
                👋
              </span>{" "}
              Activate AR
            </button>
          </ModelViewerComponent>
        </MyBox>
      </Box>
    </MyContainer>
  );
};

export default ViewerBeta;
