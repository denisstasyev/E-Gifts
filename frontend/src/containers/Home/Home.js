import React from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Fab from "@material-ui/core/Fab";

import Header from "components/Header";
// import ScrollTop from "components/ScrollTop";

import { useStyles } from "./styles";
import {
  resolve,
  resolveToE,
  resolveOutE,
  resolveToG,
  resolveOutG
} from "./animations";

const getSteps = () => {
  return [
    "Choose E-Gift in the Gallery",
    "Customize Greetings and buy E-Gift",
    "Send a unique link with E-Gift to a friend"
  ];
};

const Home = () => {
  const classes = useStyles();
  const steps = getSteps();

  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    resolve();
  } else {
    window.addEventListener("DOMContentLoaded", resolve);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.container}>
        <Container>
          <Header topic="E-Gifts" />
          <Box id="content" my={2}>
            <Box className={classes.box} p={2}>
              <Typography className={classes.title} variant="h5">
                What is it?
              </Typography>
              <Typography>
                E-Gifts are electronic gifts that you can give to a friend
              </Typography>
            </Box>
            <div className={classes.boxEG}>
              <div className={classes.boxE}>
                <Box className={classes.boxLogo} p={2} mt={2}>
                  <Typography className={classes.flexTitle} variant="h5">
                    Ecology
                  </Typography>
                  <div
                    className={[classes.boxImage, classes.boxImageNoE].join(
                      " "
                    )}
                  >
                    <img
                      id="e-image"
                      className={classes.boxImageE}
                      src={require("static/home/e.svg")}
                      alt="E-Gifts logo"
                      onMouseOver={resolveToE}
                      onMouseLeave={resolveOutE}
                    />
                  </div>
                  <div className={classes.boxText}>
                    <Avatar
                      id="e-letter"
                      className={classes.boxTextLetter}
                      onMouseOver={resolveToE}
                      onMouseLeave={resolveOutE}
                    >
                      E
                    </Avatar>
                    <Typography>
                      means Ecology. Refusing traditional gifts will help reduce
                      the pollution of our planet
                    </Typography>
                  </div>
                </Box>
              </div>
              <div className={classes.boxG}>
                <Box className={classes.boxLogo} p={2} mt={2}>
                  <Typography className={classes.flexTitle} variant="h5">
                    Gifts
                  </Typography>
                  <div
                    className={[classes.boxImage, classes.boxImageNoG].join(
                      " "
                    )}
                  >
                    <img
                      id="g-image"
                      className={classes.boxImageG}
                      src={require("static/home/g.svg")}
                      alt="E-Gifts logo"
                      onMouseOver={resolveToG}
                      onMouseLeave={resolveOutG}
                    />
                  </div>
                  <div className={classes.boxText}>
                    <Avatar
                      id="g-letter"
                      className={classes.boxTextLetter}
                      onMouseOver={resolveToG}
                      onMouseLeave={resolveOutG}
                    >
                      G
                    </Avatar>
                    <Typography>
                      means Gifts. E-Gifts offers you to give gifts in the
                      virtual world of AR & VR
                    </Typography>
                  </div>
                </Box>
              </div>
            </div>
            <Box className={classes.box} p={2} mt={2}>
              <Typography className={classes.title} variant="h5">
                How to start?
              </Typography>
              <Stepper orientation="vertical">
                {steps.map((label, index) => (
                  <Step className={classes.step} key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Typography>
                It is also possible to print Marker for E-Gift and attach it on
                any place
              </Typography>
              <div className={classes.fab}>
                <Fab
                  variant="extended"
                  size="small"
                  color="primary"
                  component={Link}
                  to="/gallery"
                >
                  Get started
                </Fab>
              </div>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Home;
