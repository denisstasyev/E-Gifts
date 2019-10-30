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

const useStyles = makeStyles(theme => ({
  filter: {
    position: "fixed",
    bottom: theme.spacing(9),
    left: theme.spacing(2)
  }
}));

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
  ) : mode === "AR" ? (
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
  );
};

export default View;
