import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Fab from "@material-ui/core/Fab";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";
import { MyTwoBoxes } from "components/MyTwoBoxes";

import { addOnLoadAnimation } from "utils/animations";
import { MOBILE_WIDTH } from "configs/CSSvariables";

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
    "Customize Congratulations and buy E-Gift",
    "Send a unique Link with E-Gift to a friend"
  ];
};

const Home = () => {
  const classes = useStyles();
  const steps = getSteps();

  addOnLoadAnimation(resolve);

  return (
    <MyContainer>
      <Header topic="E-Gifts" />
      <Box id="content" mb={2}>
        <MyBox title="What is it?">
          <Typography>
            E-Gifts are electronic gifts that you can give to a friend
          </Typography>
        </MyBox>
        <MyTwoBoxes
          leftBoxTitle="Ecology"
          leftBox={
            <>
              <div
                className={[classes.boxImage, classes.boxImageNoE].join(" ")}
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
                  means Ecology. Refusing traditional gifts will help reduce the
                  pollution of our planet
                </Typography>
              </div>
            </>
          }
          rightBoxTitle="Gifts"
          rightBox={
            <>
              <div
                className={[classes.boxImage, classes.boxImageNoG].join(" ")}
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
                  means Gifts. E-Gifts offers you to give gifts in the virtual
                  world of AR & VR
                </Typography>
              </div>
            </>
          }
        />
        <MyBox title="How to start?">
          <Stepper
            orientation={
              window.innerWidth < MOBILE_WIDTH ? "vertical" : "horizontal"
            }
          >
            {steps.map((label, index) => (
              <Step className={classes.step} key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography>
            It is also possible to print Marker with unique Link for E-Gift and
            attach it on any place
          </Typography>
          <div className={classes.fab}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              component={Link}
              to="/gallery"
            >
              <PlayArrowIcon className={classes.startIcon} />
              Get started
            </Fab>
          </div>
        </MyBox>
      </Box>
    </MyContainer>
  );
};

export default Home;
