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

import { NotFound } from "containers/NotFound";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyTwoBoxes } from "components/MyTwoBoxes";
import { ButtonMobile } from "components/ButtonMobile";
import { ButtonFixed } from "components/ButtonFixed";
import { MyBox } from "components/MyBox";

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

const Gift = props => {
  const classes = useStyles();
  const steps = getSteps();

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
              <Typography>You can enter a congratulatory text below</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                label="Congratulation"
                value={text}
                onChange={event => {
                  setText(event.target.value);
                }}
              />
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
          <MyBox title="Your unique E-Gift" type="success">
            <Typography>
              Thank you for purchase, this contribution will save our planet
              from pollution
            </Typography>
            {link === "" ? null /*TODO*/ : (
              <div className={classes.uniqueLink}>
                <TextField
                  className={classes.link}
                  variant="outlined"
                  label="Your unique Link with E-Gift"
                  value={link}
                  fullWidth
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(link);
                  }}
                >
                  Copy
                </Button>

                {/* <Typography
                  align="center"
                  component={Link}
                  to={link.substring(link.indexOf("/"), link.length)}
                >
                  {link}
                </Typography> */}
              </div>
            )}
          </MyBox>
          {link === "" ? null /*TODO*/ : (
            <MyBox title="How to use it?">
              <Typography>
                Copy your link and send it to a friend. You can visit it to view
                the congratulations. It is important that only one person
                (except you, the sender) can save a gift to himself. Sent gifts
                can be viewed in the Pofile
              </Typography>
            </MyBox>
          )}
          {/* //TODO: add button to go in Profile or to go in Gallery */}
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
        </Box>
      </MyContainer>
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
