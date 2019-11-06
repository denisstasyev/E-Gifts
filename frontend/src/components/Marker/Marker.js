import React from "react";

import Typography from "@material-ui/core/Typography";

import MarkerImage from "static/marker.png";

import { useStyles } from "./styles";

const Marker = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.markerImage}
        src={MarkerImage}
        alt="Marker"
        width="40px"
      />
      <Typography variant="h4">Text</Typography>
    </div>
  );
};

export default Marker;
