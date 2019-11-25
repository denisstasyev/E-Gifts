import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import MobileStepper from "@material-ui/core/MobileStepper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import GalleryIcon from "@material-ui/icons/Redeem";

import axios from "axios";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { CopyToClipboard } from "react-copy-to-clipboard";

import Confetti from "react-confetti";

import { NotFound } from "containers/NotFound";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyTwoBoxes } from "components/MyTwoBoxes";
import { ButtonMobile } from "components/ButtonMobile";
import { ButtonFixed } from "components/ButtonFixed";
import { MyBox } from "components/MyBox";
import { MyBoxCard } from "components/MyBoxCard";

import * as giftActionCreators from "store/actions/gift";

import * as config from "configs/backendAPI";

import { priceToString, checkIsMobile } from "utils";
import { MOBILE_WIDTH } from "configs/CSSvariables";

import { useStyles } from "./styles";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const getSteps = () => {
  return [
    "Choose E-Gift in the Gallery",
    "Customize Congratulations and buy E-Gift",
    "Send a unique Link with E-Gift to a friend"
  ];
};

const getMessages = () => {
  return [
    "Birthdays are a new start, a fresh beginning and a time to pursue new endeavors with new goals. Move forward with confidence and courage. You are a very special person. May today and all of your days be amazing!",
    "Your birthday is the first day of another 365-day journey. Be the shining thread in the beautiful tapestry of the world to make this year the best ever. Enjoy the ride.",
    "Be happy! Today is the day you were brought into this world to be a blessing and inspiration to the people around you! You are a wonderful person! May you be given more birthdays to fulfill all of your dreams!",
    "Hello! Wish you all the best!"
  ];
};

const Gift = props => {
  const classes = useStyles();
  const steps = getSteps();
  const messages = getMessages();

  const [mode, setMode] = React.useState("preview");
  const [text, setText] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    if (props.id === null) {
      props.getGift(
        props.location.pathname.substring(
          props.location.pathname.lastIndexOf("/") + 1,
          props.location.pathname.length
        )
      );
    }
    // eslint-disable-next-line
  }, []);

  const isMobile = checkIsMobile();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.urls.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleStepChange = step => {
    setActiveStep(step);
  };

  const handleBuy = () => {
    axios
      .get(`${config.BACKEND_SERVER}/buy_gift_ref?id=${props.id}&text=${text}`)
      .then(response => {
        if (response[config.DATA][config.RESULT]) {
          setLink(response[config.DATA][config.GIFT_VIEW_LINK]);
        } else {
          console.log("Cannot buy gift :(");
        }
      })
      .catch(() => {
        console.log("Cannot buy gift: network problem");
        //TODO: dispatch(loadFail("Network problem, try again later"));
      });
  };

  if (mode === "preview") {
    //TODO Add error parameter to gift to check Loading
    return props.id === null ? (
      <NotFound />
    ) : (
      <>
        <MyContainer>
          <Header topic={props.name} />
          <Box id="content" mb={2}>
            <MyTwoBoxes
              type="big"
              leftBoxTitle="Preview"
              leftBox={
                <>
                  <AutoPlaySwipeableViews
                    className={classes.views}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {props.urls.map((url, index) => (
                      <img
                        key={index}
                        className={classes.image}
                        src={`${config.BACKEND_SERVER}/${url}`}
                        alt={props.name}
                      />
                    ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                    className={classes.mobileStepper}
                    steps={maxSteps}
                    position="static"
                    variant="dots"
                    activeStep={activeStep}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                      >
                        Next
                        <KeyboardArrowRight />
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                      >
                        <KeyboardArrowLeft />
                        Back
                      </Button>
                    }
                  />
                </>
              }
              rightBoxTitle="Details"
              rightBox={
                <div className={classes.details}>
                  <Typography>{props.description}</Typography>
                  {props.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      className={classes.chip}
                      size="medium"
                      label={tag}
                      color="default"
                    />
                  ))}
                  <Typography className={classes.price}>
                    Price: {priceToString(props.price)}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => setMode("customize")}
                      >
                        Customize
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                          setMode("buy");
                          handleBuy();
                        }}
                      >
                        Buy
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              }
            />
            {isMobile ? (
              <ButtonMobile type="link" text="Back" to="/gallery">
                <KeyboardArrowLeft />
              </ButtonMobile>
            ) : null}
          </Box>
        </MyContainer>
        {isMobile ? null : (
          <ButtonFixed type="link" text="Back" to="/gallery">
            <KeyboardArrowLeft />
          </ButtonFixed>
        )}
      </>
    );
  } else if (mode === "customize") {
    return (
      <>
        <MyContainer>
          <Header topic="Customization" />
          <Box id="content" mb={2}>
            <Stepper
              className={classes.stepper}
              orientation={
                window.innerWidth < MOBILE_WIDTH ? "vertical" : "horizontal"
              }
              activeStep={1}
            >
              {steps.map((label, index) => (
                <Step className={classes.step} key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <MyBox title="Make your E-Gift unique">
              <Typography>
                Click to choose one of the ready-made congratulations
              </Typography>
              <div className={classes.messages}>
                {messages.map((text, index) => (
                  <MyBoxCard
                    text={text}
                    key={index}
                    onClick={() => setText(text)}
                  />
                ))}
              </div>
              <Typography>
                Or you can enter a congratulatory text below
              </Typography>
              <div className={classes.textField}>
                <TextField
                  className={classes.text}
                  variant="outlined"
                  label="Congratulation"
                  value={text}
                  fullWidth
                  multiline
                  onChange={event => {
                    setText(event.target.value);
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setText("")}
                >
                  Clear
                </Button>
              </div>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  setMode("buy");
                  handleBuy();
                }}
              >
                Buy E-Gift for {priceToString(props.price)}
              </Button>
            </MyBox>
            {isMobile ? (
              <ButtonMobile
                type="onClick"
                text="Back"
                onClick={() => setMode("preview")}
              >
                <KeyboardArrowLeft />
              </ButtonMobile>
            ) : null}
          </Box>
        </MyContainer>
        {isMobile ? null : (
          <ButtonFixed
            type="onClick"
            text="Back"
            onClick={() => setMode("preview")}
          >
            <KeyboardArrowLeft />
          </ButtonFixed>
        )}
      </>
    );
  } else if (mode === "buy") {
    return (
      <MyContainer>
        <Header topic="Congratulations" />
        <Box id="content" mb={2}>
          <Stepper
            className={classes.stepper}
            orientation={
              window.innerWidth < MOBILE_WIDTH ? "vertical" : "horizontal"
            }
            activeStep={2}
          >
            {steps.map((label, index) => (
              <Step className={classes.step} key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <MyBox title="Thank you for purchase">
            <Typography>
              This contribution will surely save our planet from pollution
            </Typography>
          </MyBox>
          {link === "" ? null /*TODO*/ : (
            <MyBox title="Attention" type="warning">
              <Typography>
                E-Gift can be sent only to one person. Unique Link will become
                inactive after receiving
              </Typography>
            </MyBox>
          )}
          <MyBox title="Your E-Gift" type="success">
            <Typography>
              You can send E-Gift by email or you can copy unique Link to send
              it in any other way
            </Typography>
            {link === "" ? null /*TODO*/ : (
              <div className={classes.textField}>
                <TextField
                  id="link"
                  className={classes.text}
                  variant="outlined"
                  label="Your unique Link with E-Gift"
                  value={link}
                  fullWidth
                />
                <CopyToClipboard text={link} onCopy={() => setMode("copied")}>
                  <Button variant="outlined" color="primary">
                    Copy
                  </Button>
                </CopyToClipboard>
              </div>
            )}
          </MyBox>
        </Box>
      </MyContainer>
    );
  } else if (mode === "copied" || mode === "sent") {
    return (
      <>
        <Confetti numberOfPieces={400} recycle={false} />
        <MyContainer>
          <Header topic={mode === "copied" ? "Copied" : "Sent"} />
          <Box id="content" mb={2}>
            <Stepper
              className={classes.stepper}
              orientation={
                window.innerWidth < MOBILE_WIDTH ? "vertical" : "horizontal"
              }
              activeStep={3}
            >
              {steps.map((label, index) => (
                <Step className={classes.step} key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {mode === "copied" ? (
              <>
                <MyBox title="Successfully copied" type="success">
                  <Typography>
                    You can send your Link in any social network or messenger by
                    pasting it from the clipboard
                  </Typography>
                </MyBox>
                <MyBox title="Buy more E-Gifts">
                  <Typography>
                    The more E-Gifts you give to people, the cleaner our planet
                    becomes. More E-Gifts can be found in the Gallery
                  </Typography>
                  <div className={classes.fab}>
                    <Fab
                      variant="extended"
                      size="small"
                      color="primary"
                      component={Link}
                      to="/gallery"
                    >
                      <GalleryIcon className={classes.icon} />
                      Gallery
                    </Fab>
                  </div>
                </MyBox>
              </>
            ) : null}
          </Box>
        </MyContainer>
      </>
    );
  }
};

const mapStateToProps = state => ({
  id: state.giftReducer.id,
  name: state.giftReducer.name,
  description: state.giftReducer.description,
  price: state.giftReducer.price,
  tags: state.giftReducer.tags,
  urls: state.giftReducer.urls
});

const mapDispatchToProps = dispatch => ({
  getGift: id => {
    dispatch(giftActionCreators.getGift(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gift);
