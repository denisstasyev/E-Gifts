import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Header from "components/Header";

const View = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic="View" />

        {/* <Scene artoolkit={{ sourceType: "webcam", trackingMethod: "best" }}>
          <a-anchor hit-testing-enabled="true">
            <a-box
              position="0 0 0.5"
              material="opacity: 0.7; color: yellow;"
            ></a-box>
          </a-anchor>
          <a-camera-static preset="hiro" />
        </Scene> */}

        <Box my={2}>
          {[...new Array(120)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </Box>
      </Container>
      <Toolbar />
    </React.Fragment>
  );
};

export default View;
