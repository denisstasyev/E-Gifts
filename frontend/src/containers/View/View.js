import React from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import DetectRTC from "detectrtc";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";

import ARViewer from "components/ARViewer";
import VRViewer from "components/VRViewer";

import { useStyles } from "./styles";

const View = props => {
  const classes = useStyles();

  // eslint-disable-next-line
  const [link, setLink] = React.useState(
    props.location.pathname !== "/view" && props.location.pathname !== "/view/"
      ? props.location.pathname.substring(
          props.location.pathname.lastIndexOf("/") + 1,
          props.location.pathname.length
        )
      : ""
  );

  const [mode, setMode] = React.useState("");

  return link === "" ? (
    <MyContainer>
      <Header topic="View" />
      <Box id="content">
        <MyBox>
          <Typography className={classes.title} variant="h5">
            What is it?
          </Typography>
          <Typography>
            E-Gifts are electronic gifts that you can give to a friend
          </Typography>
        </MyBox>
      </Box>
    </MyContainer>
  ) : //     <Box my={2}>
  //       <Typography>To see a gift you need to buy it</Typography>
  //       <Typography component={Link} to="/gallery">
  //         You can buy them in Gallery
  //       </Typography>
  //     </Box>
  //   </Container>
  //   <Toolbar />
  // </React.Fragment>
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
      <VRViewer modelURL="http://localhost:5000/ok/pony_cartoon/scene.gltf" />
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
