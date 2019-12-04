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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SettingsIcon from "@material-ui/icons/Settings";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ClearIcon from "@material-ui/icons/Clear";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import TelegramIcon from "@material-ui/icons/Telegram";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import EmailIcon from "@material-ui/icons/AlternateEmail";
import AccountIcon from "@material-ui/icons/AccountCircle";
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

import { priceToString, checkIsMobile, validateMail } from "utils";

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
    "Birthdays are a new start. You are a very special person. May today and all of your days be amazing!",
    "Your birthday is the first day of another 365-day journey. Enjoy the ride!",
    "Wishing you a Happy New Year with the hope that you will have many blessings in the year to come!",
    "Celebrate the Wonder and the Joy of the Festive Season. Merry Christmas!",
    "Wishing a perfect pair a perfectly happy day!",
    "Hope you find time to look back on all your sweet memories together!",
    "Reach high, for stars lie hidden in your soul. Dream deep, for every dream precedes the goal!",
    "You have finally walked that extra mile and gone up the ladder of success!"
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
    // if (!props.isAuth) {
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
    //Add gift to user
    // } else {
    //   axios
    //     .get(
    //       `${config.BACKEND_SERVER}/buy_gift_ref?id=${props.id}&text=${text}&authorization_token${props.token}`
    //     )
    //     .then(response => {
    //       if (response[config.DATA][config.RESULT]) {
    //         setLink(response[config.DATA][config.GIFT_VIEW_LINK]);
    //       } else {
    //         console.log("Cannot buy gift :(");
    //       }
    //     })
    //     .catch(() => {
    //       console.log("Cannot buy gift: network problem");
    //       //TODO: dispatch(loadFail("Network problem, try again later"));
    //     });
    //Send api call to add myself
    // }
  };

  const [selectedTags, setSelectedTags] = React.useState([]);

  const handleSelectTag = tag => {
    if (selectedTags.indexOf(tag) === -1) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter(item => item !== tag));
    }
  };

  const [open, setOpen] = React.useState(false);
  const [mail, setMail] = React.useState("");
  const [mailError, setMailError] = React.useState("");

  const handleMail = event => {
    if (validateMail(event.target.value) || event.target.value === "") {
      setMailError("");
    } else {
      setMailError("Invalid Email Format");
    }
    setMail(event.target.value);
  };

  const handleSendMail = () => {
    if (mailError !== "" || mail === "") {
      setMailError("Enter the correct email first");
    } else {
      axios
        .get(
          `${config.BACKEND_SERVER}/send_by_email?guid=${link.substring(
            link.lastIndexOf("/") + 1,
            link.length
          )}&email=${mail}`
        )
        .then(response => {
          if (response[config.DATA][config.RESULT]) {
          } else {
            console.log("Cannot send gift :(");
          }
        })
        .catch(() => {
          console.log("Cannot send gift: network problem");
          //TODO: dispatch(loadFail("Network problem, try again later"));
        });

      setMode("sent");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (mode === "preview") {
    //TODO Add error parameter to gift to check Loading
    return props.id === null ? (
      <NotFound />
    ) : (
      <>
        <MyContainer>
          <Header topic={props.name} />
          <Box id="content" pb={2}>
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
                        {!(!props.isMobile && props.isPartlyMobile) && (
                          <SettingsIcon className={classes.icon} />
                        )}
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
                        {!(!props.isMobile && props.isPartlyMobile) && (
                          <ShoppingCartIcon className={classes.icon} />
                        )}
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
          <Box id="content" pb={2}>
            {props.isMobile ? (
              <Stepper
                className={classes.stepper}
                orientation="horizontal"
                activeStep={1}
              >
                {steps.map((label, index) => (
                  <Step
                    className={index !== 0 ? classes.step : null}
                    key={index}
                  >
                    <StepLabel />
                  </Step>
                ))}
              </Stepper>
            ) : (
              <Stepper
                className={classes.stepper}
                orientation="horizontal"
                activeStep={1}
              >
                {steps.map((label, index) => (
                  <Step className={classes.step} key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
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
                Or you can use Tags to find the best congratulation
              </Typography>
              {props.tags.map((tag, index) => (
                <Chip
                  key={index}
                  className={classes.chip}
                  size="medium"
                  label={tag}
                  color={
                    selectedTags.indexOf(tag) === -1 ? "default" : "primary"
                  }
                  onClick={() => {
                    handleSelectTag(tag);
                  }}
                />
              ))}
              <Typography className={classes.check}>
                Check and adjust a congratulatory text below
              </Typography>
              <div className={classes.message}>
                <TextField
                  variant="outlined"
                  label="Congratulation"
                  value={text}
                  fullWidth
                  multiline
                  onChange={event => {
                    setText(event.target.value);
                  }}
                />
                {text === "" ? null : (
                  <Button
                    className={classes.clear}
                    size="small"
                    onClick={() => setText("")}
                  >
                    <ClearIcon className={classes.icon} />
                    Clear
                  </Button>
                )}
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
      <>
        <MyContainer>
          <Header topic="Congratulations" />
          <Box id="content" pb={2}>
            {props.isMobile ? (
              <Stepper
                className={classes.stepper}
                orientation="horizontal"
                activeStep={2}
              >
                {steps.map((label, index) => (
                  <Step
                    className={index !== 0 ? classes.step : null}
                    key={index}
                  >
                    <StepLabel />
                  </Step>
                ))}
              </Stepper>
            ) : (
              <Stepper
                className={classes.stepper}
                orientation="horizontal"
                activeStep={2}
              >
                {steps.map((label, index) => (
                  <Step className={classes.step} key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            {link === "" ? null /*TODO*/ : (
              <>
                <MyBox title="Thank you for purchase">
                  <Typography>
                    This contribution will surely save our planet from pollution
                  </Typography>
                </MyBox>
                <MyBox title="Email" type="success">
                  <Typography>
                    You can send E-Gift by email with unique Link to your friend
                  </Typography>
                  <Button
                    className={classes.mail}
                    variant="contained"
                    color="primary"
                    onClick={() => setOpen(true)}
                  >
                    <EmailIcon className={classes.icon} />
                    Email
                  </Button>
                </MyBox>
                <MyBox title="Social Networks" type="success">
                  <Typography>
                    You can send a message with unique Link with E-Gift to your
                    friend
                  </Typography>
                  <div className={classes.buttons}>
                    <Button variant="contained" color="primary">
                      <FacebookIcon />
                      {props.isMobile ? null : (
                        <div className={classes.socialText}>Facebook</div>
                      )}
                    </Button>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      <TwitterIcon />
                      {props.isMobile ? null : (
                        <div className={classes.socialText}>Twitter</div>
                      )}
                    </Button>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      <TelegramIcon />
                      {props.isMobile ? null : (
                        <div className={classes.socialText}>Telegram</div>
                      )}
                    </Button>
                  </div>
                </MyBox>
                <MyBox title="Your E-Gift" type="success">
                  <Typography>
                    E-Gift can be sent only to one person. Unique Link will
                    become inactive after receiving
                  </Typography>
                  <TextField
                    className={classes.link}
                    variant="outlined"
                    label="Your unique Link with E-Gift"
                    value={link}
                    fullWidth
                  />
                  <CopyToClipboard
                    className={classes.copy}
                    text={link}
                    onCopy={() => setMode("copied")}
                  >
                    <Button variant="contained" color="primary">
                      <FileCopyIcon className={classes.icon} />
                      Copy
                    </Button>
                  </CopyToClipboard>
                </MyBox>
              </>
            )}
          </Box>
        </MyContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Send email with E-Gift</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Who do you want to send an email to?
            </DialogContentText>
            <TextField
              margin="normal"
              variant="outlined"
              label="Recipient's email"
              value={mail}
              onChange={handleMail}
              fullWidth
              autoComplete="email"
              error={mailError !== ""}
              helperText={mailError}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSendMail} color="primary">
              Send email
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  } else if (mode === "copied" || mode === "sent") {
    return (
      <>
        <Confetti numberOfPieces={400} recycle={false} />
        <MyContainer>
          <Header topic={mode === "copied" ? "Copied" : "Sent"} />
          <Box id="content" pb={2}>
            {props.isMobile ? (
              <Stepper
                className={classes.stepper}
                orientation="horizontal"
                activeStep={3}
              >
                {steps.map((label, index) => (
                  <Step
                    className={index !== 0 ? classes.step : null}
                    key={index}
                  >
                    <StepLabel />
                  </Step>
                ))}
              </Stepper>
            ) : (
              <Stepper
                className={classes.stepper}
                orientation="horizontal"
                activeStep={3}
              >
                {steps.map((label, index) => (
                  <Step className={classes.step} key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            )}
            {mode === "copied" ? (
              <>
                <MyBox title="Successfully copied" type="success">
                  <Typography>
                    You can send your Link in any social network or messenger by
                    pasting it from the clipboard
                  </Typography>
                </MyBox>
              </>
            ) : (
              <>
                <MyBox title="Successfully sent" type="success">
                  <Typography>
                    The recipient will receive an email shortly
                  </Typography>
                </MyBox>
              </>
            )}
            <MyTwoBoxes
              leftBoxTitle={
                props.isAuth
                  ? "View E-Gift in the Profile"
                  : "Sign Up or Sign In to save"
              }
              leftBox={
                props.isAuth ? (
                  <>
                    <Typography className={classes.text}>
                      You can view sent E-Gifts in your Profile
                    </Typography>
                    <div className={classes.fab}>
                      <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        component={Link}
                        to="/profile"
                      >
                        <AccountIcon className={classes.icon} />
                        Profile
                      </Fab>
                    </div>
                  </>
                ) : (
                  <>
                    <Typography className={classes.text}>
                      You can Sign Up or Sign In in the Profile to save sent
                      E-Gift to your Collection
                    </Typography>
                    <div className={classes.fab}>
                      <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        component={Link}
                        to="/profile"
                      >
                        <AccountIcon className={classes.icon} />
                        Profile
                      </Fab>
                    </div>
                  </>
                )
              }
              rightBoxTitle="Buy more E-Gifts"
              rightBox={
                <>
                  <Typography className={classes.text}>
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
                </>
              }
            />
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
  urls: state.giftReducer.urls,
  isAuth: state.userReducer.isAuth,
  token: state.userReducer.token,
  isMobile: state.settingsReducer.isMobile,
  isPartlyMobile: state.settingsReducer.isPartlyMobile
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
