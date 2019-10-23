import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Header from "components/Header";

const useStyles = makeStyles(theme => ({
  ascene: {
    width: "100%",
    height: "30%"
  }
}));

const View = props => {
  const classes = useStyles();

  const [link, setLink] = React.useState(
    props.location.pathname !== "/view" && props.location.pathname !== "/view/"
      ? props.location.pathname.substring(
          props.location.pathname.lastIndexOf("/") + 1,
          props.location.pathname.length
        )
      : ""
  );

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
          {link === "" ? (
            <React.Fragment>
              <Typography>To see a gift you need to buy it</Typography>
              <Typography component={Link} to="/gallery">
                You can buy them in Gallery
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div
                class="intrinsic-box"
                onClick={() => {
                  setLink("");
                }}
              >
                <a-scene className={classes.ascene} embedded>
                  <a-sphere
                    position="0 1.25 -5"
                    radius="1.25"
                    color="#EF2D5E"
                  ></a-sphere>
                  <a-box
                    position="-1 0.5 -3"
                    rotation="0 45 0"
                    width="1"
                    height="1"
                    depth="1"
                    color="#4CC3D9"
                  ></a-box>
                  <a-cylinder
                    position="1 0.75 -3"
                    radius="0.5"
                    height="1.5"
                    color="#FFC65D"
                  ></a-cylinder>
                  <a-plane
                    position="0 0 -4"
                    rotation="-90 0 0"
                    width="4"
                    height="4"
                    color="#7BC8A4"
                  ></a-plane>
                  <a-sky color="#ECECEC"></a-sky>
                </a-scene>
              </div>
            </React.Fragment>
          )}
        </Box>
      </Container>
      <Toolbar />
    </React.Fragment>
  );
};

export default View;
