import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import axios from "axios";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Fab from "@material-ui/core/Fab";
import MobileStepper from "@material-ui/core/MobileStepper";

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyTwoBoxes } from "components/MyTwoBoxes";
import { ButtonMobile } from "components/ButtonMobile";
import { ButtonFixed } from "components/ButtonFixed";

import * as giftActionCreators from "store/actions/gift";

import * as config from "configs/backendAPI";

import { priceToString } from "utils";
import { MOBILE_WIDTH, MOBILE_HEIGHT } from "configs/CSSvariables";

import { useStyles } from "./styles";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Gift = props => {
  const classes = useStyles();

  const [link, setLink] = React.useState("");

  const isMobile =
    window.innerWidth < MOBILE_WIDTH || window.innerHeight < MOBILE_HEIGHT;

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

  //TODO
  // eslint-disable-next-line
  const [id, setId] = React.useState(
    props.location.pathname !== "/gallery/gift" &&
      props.location.pathname !== "/gallery/gift/"
      ? props.location.pathname.substring(
          props.location.pathname.lastIndexOf("/") + 1,
          props.location.pathname.length
        )
      : ""
  );

  React.useEffect(() => {
    if (props.id === null) {
      props.getGift(id);
    }
    // eslint-disable-next-line
  }, []);

  const handleBuy = () => {
    axios
      .get(`${config.BACKEND_SERVER}/buy_gift_ref?id=${props.id}`)
      .then(response => {
        if (response.data[config.RESULT]) {
          setLink(response.data[config.GIFT_VIEW_LINK]);
        } else {
          console.log("Cannot buy gift :(");
        }
      })
      .catch(() => {
        console.log("Cannot buy gift: network problem");
        //TODO: dispatch(loadFail("Network problem, try again later"));
      });
  };

  return (
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
                  className={classes.stepper}
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
                <Typography align="center">{props.description}</Typography>
                {link === "" ? null : (
                  <React.Fragment>
                    <Typography align="center">
                      Your private link with gift:
                    </Typography>
                    <Typography
                      align="center"
                      component={Link}
                      to={link.substring(link.indexOf("/"), link.length)}
                    >
                      {link}
                    </Typography>
                  </React.Fragment>
                )}
                {props.tags.map((tag, index) => (
                  <Chip
                    className={classes.chip}
                    // key={index}
                    size="medium"
                    label={tag}
                    color="default"
                  />
                ))}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.buy}
                  onClick={handleBuy}
                >
                  Buy for {priceToString(props.price)}
                </Button>
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
