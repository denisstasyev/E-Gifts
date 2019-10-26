import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Header from "components/Header";

import Fab from "@material-ui/core/Fab";

import ARViewer from "components/ARViewer";
import image from "static/gifts/template.jpg";

const useStyles = makeStyles(theme => ({
  // ascene: {
  //   width: "100%",
  //   height: "30%"
  // },
  filter: {
    position: "fixed",
    bottom: theme.spacing(9),
    left: theme.spacing(2)
  },
  arviewer: {
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "hidden" ////////////////////////TODO
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

  const [mode, setMode] = React.useState("");

  return link === "" ? (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic="View" />
        <Box my={2}>
          <Typography>To see a gift you need to buy it</Typography>
          <Typography component={Link} to="/gallery">
            You can buy them in Gallery
          </Typography>
        </Box>
      </Container>
      <Toolbar />
    </React.Fragment>
  ) : (
    <React.Fragment>
      {mode === "AR" ? (
        <ARViewer className={classes.arviewer} image={image} />
      ) : mode === "marker" ? (
        <div>Marker</div>
      ) : (
        <div>
          Main{" "}
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
        </div>
      )}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.filter}
        // component={Link}
        // to="/view"
        onClick={() => {
          // setLink("");
          setMode("");
          window.location.reload();
          // console.log(window.location);
        }}
      >
        Close
      </Fab>
      {/* <div
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
              </div> */}
    </React.Fragment>
  );
};

export default View;
