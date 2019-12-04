import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import EmailIcon from "@material-ui/icons/AlternateEmail";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";
import { MyTwoBoxes } from "components/MyTwoBoxes";
import { Gifts } from "components/Gifts";

import { addOnLoadAnimation } from "utils/animations";

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

const Home = props => {
  const classes = useStyles();
  const steps = getSteps();

  addOnLoadAnimation(resolve);

  return (
    <MyContainer showFooter={true}>
      <Header topic="E-Gifts" />
      <Box id="content" pb={2}>
        <MyBox title="What is it? 🤔">
          <div className={classes.idea}>
            <div id="vr" className={classes.vr}>
              <Gifts />
            </div>
            <div className={classes.ideaTitle}>
              <Typography variant="h2">E-Gifts</Typography>
              <Typography variant="h4">are electronic gifts,</Typography>
              <Typography variant="h5">
                that you can send to a friend
              </Typography>
            </div>
          </div>
          <div className={classes.fab}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              component={Link}
              to="/gallery"
            >
              <PlayArrowIcon className={classes.icon} />
              Get started
            </Fab>
            {!props.isMobile && (
              <Typography className={classes.moreDetails}>
                Read some more details below or
              </Typography>
            )}
          </div>
        </MyBox>
        <MyBox title="Newest E-Gifts">Soon</MyBox>
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
                  cology is experiencing big changes{" "}
                  <span role="img" aria-label="Sad face">
                    😞
                  </span>{" "}
                  these days. Refusing traditional gifts in favor of virtual
                  ones will help reduce environmental pollution and save our
                  planet!{" "}
                  <span role="img" aria-label="Happy face">
                    😀
                  </span>
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
                  ifts usually associate with attention{" "}
                  <span role="img" aria-label="Astonished face">
                    😲
                  </span>{" "}
                  and new experiences. E-Gifts offers you to give gifts in the
                  virtual world of AR & VR (Augmented and Virtual Reality)!{" "}
                  <span role="img" aria-label="Winking face">
                    😉
                  </span>
                </Typography>
              </div>
            </>
          }
        />
        <MyBox title="Most Trending E-Gifts">Soon</MyBox>
        <MyBox title="How to start? 🤗">
          <Stepper orientation={props.isMobile ? "vertical" : "horizontal"}>
            {steps.map((label, index) => (
              <Step
                className={
                  props.isMobile
                    ? classes.stepMobile
                    : index !== 0
                    ? classes.step
                    : null
                }
                key={index}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography>
            E-Gifts do not take up space, but always near the recipient!{" "}
            <span role="img" aria-label="Astonished face">
              😲
            </span>
          </Typography>
          <div className={classes.fab}>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              component={Link}
              to="/gallery"
            >
              <PlayArrowIcon className={classes.icon} />
              Get started
            </Fab>
          </div>
        </MyBox>
        {props.isPartlyMobile && (
          <MyBox title="Contact Us">
            <Typography>
              Have you encountered a problem on this site? Do you have any ideas
              for improving E-Gifts? Feel free to contact us via email
            </Typography>
            <Button
              className={classes.mail}
              variant="contained"
              color="primary"
              href="mailto:support@e-gifts.site"
            >
              <EmailIcon className={classes.icon} />
              Email
            </Button>
          </MyBox>
        )}
      </Box>
    </MyContainer>
  );
};

const mapStateToProps = state => ({
  isMobile: state.settingsReducer.isMobile,
  isPartlyMobile: state.settingsReducer.isPartlyMobile
});

export default connect(
  mapStateToProps,
  null
)(Home);
