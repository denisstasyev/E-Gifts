import React from "react";

import Box from "@material-ui/core/Box";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";

import { addOnLoadAnimation, resolveContent } from "utils/animations";

import { useStyles } from "./styles";

const ViewerBeta = props => {
  const classes = useStyles();

  addOnLoadAnimation(resolveContent);

  return (
    <MyContainer>
      <Header topic="Beta Viewer" />
      <Box id="content" mb={2}>
        <MyBox title="Viewer">
          <div className={classes.container}>
            <model-viewer //! .glb models much better than .gltf
              // className={classes.viewer}
              styles="width: 100%;"
              auto-rotate
              camera-controls
              autoplay
              shadow-intensity="1"
              // background-color="#70BCD1"
              // camera-orbit="-20deg 75deg 2m"
              alt="A 3D model of an astronaut."
              src={require("static/models/Bee.glb")}
              ios-src={require("static/models/bee2.usdz")}
              magic-leap
              ar
            >
              <button slot="ar-button" className={classes.button}>
                <span role="img" aria-label="">
                  👋
                </span>{" "}
                Activate AR
              </button>
            </model-viewer>
            {/* <a href={require("static/models/bee.usdz")}>Hello</a> */}
          </div>
        </MyBox>
      </Box>
    </MyContainer>
  );
};

export default ViewerBeta;
