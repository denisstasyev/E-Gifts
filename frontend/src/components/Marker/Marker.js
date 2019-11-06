import React from "react";

import Typography from "@material-ui/core/Typography";

import { useStyles } from "./styles";

const Marker = () => {
  const classes = useStyles();

  return (
    <div id="marker" className={classes.root}>
      <img
        className={classes.markerImage}
        src={require("static/marker.png")}
        alt="Marker"
      />
      <Typography className={classes.text} variant="h4">
        Point the camera to see magic
      </Typography>
    </div>
  );
};

export default Marker;
