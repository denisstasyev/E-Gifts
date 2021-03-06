import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { useTheme } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import LockOpenIcon from "@material-ui/icons/LockOpen";
import CameraIcon from "@material-ui/icons/CameraAlt";
import AccountIcon from "@material-ui/icons/AccountCircle";
import GalleryIcon from "@material-ui/icons/Redeem";

import "@google/model-viewer";

import Confetti from "react-confetti";
import BoomConfetti from "react-dom-confetti";

import Ticker from "react-ticker";

import { NotFound } from "containers/NotFound";
import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";
import { MyTwoBoxes } from "components/MyTwoBoxes";

import { USER_SET_RECEIVED_GIFT_GUID } from "store/actionTypes";

import * as config from "configs/backendAPI";

import { addOnLoadAnimation, resolveContent } from "utils/animations";
import { getViewGift, addGiftToCollection } from "utils/view";

import { useStyles } from "./styles";
import { resolveToTop } from "./animations";

const configBoomConfetti = {
  angle: "90",
  spread: "90",
  startVelocity: 45,
  elementCount: "150",
  dragFriction: 0.1,
  duration: "2500",
  stagger: 5,
  width: "10px",
  height: "20px",
  colors: [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548"
  ]
};

const ModelViewerComponent = "model-viewer";

const ViewGift = props => {
  const classes = useStyles();
  const theme = useTheme();

  const [isValidGift, setIsValidGift] = React.useState(true);
  const [modelURL, setModelURL] = React.useState("");
  const [modelURLApple, setModelURLApple] = React.useState("");
  const [text, setText] = React.useState("");

  const GUID = props.location.pathname.substring(
    props.location.pathname.lastIndexOf("/") + 1,
    props.location.pathname.length
  );

  React.useEffect(() => {
    getViewGift(GUID).then(result => {
      setIsValidGift(result.isValidGift);
      setModelURL(result.modelURL);
      setModelURLApple(result.modelURLApple);
      setText(result.text);
    });
    // eslint-disable-next-line
  }, []);

  const [mode, setMode] = React.useState("welcome");
  const [boom, setBoom] = React.useState(false);

  const handleOpen = () => {
    resolveToTop();
    setBoom(true);
    setTimeout(() => {
      setMode("main");
    }, 1800);
  };

  if (!isValidGift) {
    return <NotFound />;
  } else {
    return (
      <>
        <Confetti numberOfPieces={400} recycle={false} />
        <MyContainer>
          <Header topic="E-Gift for you" />
          <Box id="content" pb={2}>
            {mode === "welcome" ? (
              <>
                <MyBox title="Click to open your E-Gift">
                  <div className={classes.welcome}>
                    <div
                      className={[classes.boxImage, classes.boxImageNoTop].join(
                        " "
                      )}
                    >
                      <img
                        id="top-image"
                        className={classes.boxImageTop}
                        src={require("static/view/top.svg")}
                        alt="E-Gifts logo"
                        onClick={handleOpen}
                      />
                      <BoomConfetti
                        className={classes.boom}
                        active={boom}
                        config={configBoomConfetti}
                      />
                    </div>
                    <Fab
                      className={classes.fab}
                      variant="extended"
                      color="primary"
                      onClick={handleOpen}
                    >
                      <LockOpenIcon className={classes.icon} />
                      Open E-Gift
                    </Fab>
                  </div>
                </MyBox>
              </>
            ) : (
              <>
                {addOnLoadAnimation(resolveContent)}
                <MyBox title="Viewer">
                  <Ticker mode="await" offset="100%">
                    {index => (
                      <Typography
                        className={classes.tickerText}
                        noWrap={true}
                        variant="h5"
                      >
                        {text}
                      </Typography>
                    )}
                  </Ticker>
                  <ModelViewerComponent
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "400px",
                      outline: "none"
                    }}
                    auto-rotate
                    camera-controls
                    autoplay
                    // shadow-intensity={1}
                    background-color={theme.palette.background.paper}
                    alt="3D model"
                    src={`${config.BACKEND_SERVER}/${modelURL}`}
                    ios-src={`${config.BACKEND_SERVER}/${modelURLApple}`}
                    magic-leap
                    ar
                  >
                    <Fab
                      slot="ar-button"
                      className={classes.button}
                      variant="extended"
                      size="small"
                      color="primary"
                    >
                      <CameraIcon className={classes.icon} />
                      Activate AR
                    </Fab>
                  </ModelViewerComponent>
                  <Typography className={classes.adviceText}>
                    Drag to rotate, pinch or scroll to zoom
                  </Typography>
                </MyBox>
                {text !== "" ? (
                  <MyBox title="Congratulator sent you a message">
                    <Typography>{text}</Typography>
                  </MyBox>
                ) : null}
                <MyTwoBoxes
                  leftBoxTitle={
                    props.isAuth
                      ? "Save E-Gift to the Profile"
                      : "Sign Up or Sign In to save"
                  }
                  leftBox={
                    props.isAuth ? (
                      <>
                        <Typography className={classes.text}>
                          You can add this E-Gift to your Collection
                        </Typography>
                        <div className={classes.fab}>
                          <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            onClick={() => {
                              addGiftToCollection(GUID, props.token);
                            }}
                            component={Link}
                            to="/profile"
                          >
                            <AccountIcon className={classes.icon} />
                            Add
                          </Fab>
                        </div>
                      </>
                    ) : (
                      <>
                        <Typography className={classes.text}>
                          You can Sign Up or Sign In to save sent E-Gift to your
                          Collection
                        </Typography>
                        <div className={classes.fab}>
                          <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            onClick={() => {
                              props.setReceivedGiftGUID(GUID);
                            }}
                            component={Link}
                            to="/profile"
                          >
                            <AccountIcon className={classes.icon} />
                            Sign Up or Sign In
                          </Fab>
                        </div>
                      </>
                    )
                  }
                  rightBoxTitle="Buy more E-Gifts"
                  rightBox={
                    <>
                      <Typography className={classes.text}>
                        The more E-Gifts you give to people, the cleaner our
                        planet becomes. More E-Gifts can be found in the Gallery
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
              </>
            )}
          </Box>
        </MyContainer>
      </>
    );
  }
};

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth,
  token: state.userReducer.token
});

const mapDispatchToProps = dispatch => ({
  setReceivedGiftGUID: receivedGiftGUID => {
    dispatch({ type: USER_SET_RECEIVED_GIFT_GUID, receivedGiftGUID });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewGift);
