import React from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import GalleryIcon from "@material-ui/icons/Redeem";
import HomeIcon from "@material-ui/icons/Home";

import Header from "components/Header";

import { addOnLoadAnimation } from "utils/animations";

import { useStyles } from "./styles";
import { resolve } from "./animations";

const NotFound = () => {
  const classes = useStyles();

  addOnLoadAnimation(resolve);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.container}>
        <Container>
          <Header topic="Not Found" />
          <Box id="content" my={2}>
            <Box className={classes.box} p={2}>
              <Typography className={classes.title} variant="h5">
                What happened?
              </Typography>
              <Typography>
                Sorry, 404 Error occurred: this page does not exist yet. Visit
                Gallery to see available E-Gifts
              </Typography>
              <div className={classes.fab}>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  component={Link}
                  to="/home"
                >
                  <GalleryIcon className={classes.icon} />
                  Gallery
                </Fab>
              </div>
            </Box>
            <Box className={classes.box} p={2} mt={2}>
              <Typography className={classes.title} variant="h5">
                First time here?
              </Typography>
              <Typography>
                Learn more about the E-Gifts project on the Home page
              </Typography>
              <div className={classes.fab}>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  component={Link}
                  to="/gallery"
                >
                  <HomeIcon className={classes.icon} />
                  Home
                </Fab>
              </div>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default NotFound;