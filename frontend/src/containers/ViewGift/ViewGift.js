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

import axios from "axios";

import Confetti from "react-confetti";
import BoomConfetti from "react-dom-confetti";

import Ticker from "react-ticker";

import { NotFound } from "containers/NotFound";
import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";
import { MyTwoBoxes } from "components/MyTwoBoxes";

import * as config from "configs/backendAPI";

import { addOnLoadAnimation, resolveContent } from "utils/animations";

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
  const [text, setText] = React.useState("");

  const link = props.location.pathname.substring(
    props.location.pathname.lastIndexOf("/") + 1,
    props.location.pathname.length
  );

  React.useEffect(() => {
    axios
      .get(`${config.BACKEND_SERVER}/get_model_by_ref?guid=${link}`)
      .then(response => {
        if (response[config.DATA][config.RESULT]) {
          setModelURL(response[config.DATA][config.VIEW_MODEL_URL]);
          setText(response[config.DATA][config.VIEW_TEXT]);
        } else {
          setIsValidGift(false);
        }
      })
      .catch(() => {
        console.log("Cannot buy gift: network problem");
        setIsValidGift(false); //TODO: dispatch(loadFail("Network problem, try again later"));
      });
    // eslint-disable-next-line
  }, []);

  const [mode, setMode] = React.useState("welcome");
  const [boom, setBoom] = React.useState(false);

  const handleOpen = props => {
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
                  <ModelViewerComponent //! .glb models much better than .gltf
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "400px",
                      outline: "none"
                    }}
                    auto-rotate
                    camera-controls
                    autoplay
                    shadow-intensity={1}
                    background-color={theme.palette.background.paper}
                    // camera-orbit="-20deg 75deg 2m"
                    alt="A 3D model of an astronaut."
                    src={require("static/models/Bee.glb")}
                    ios-src={require("static/models/bee2.usdz")}
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
                  <MyBox title="Congratulator left you a message">
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
                          You can save this E-Gift to your Profile
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
                            Save
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
  isAuth: state.userReducer.isAuth
});

export default connect(
  mapStateToProps,
  null
)(ViewGift);
