import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import GalleryIcon from "@material-ui/icons/Redeem";
import HomeIcon from "@material-ui/icons/Home";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";
import { MyTwoBoxes } from "components/MyTwoBoxes";

import { addOnLoadAnimation, resolveContent } from "utils/animations";

import { useStyles } from "./styles";

const NotFound = props => {
  const classes = useStyles();

  addOnLoadAnimation(resolveContent);

  return (
    <MyContainer>
      <Header topic="Not Found" />
      <Box id="content" mb={2}>
        {props.isAuth ? (
          <MyBox title="What happened?">
            <Typography className={classes.text}>
              Sorry, 404 Error occurred: this page does not exist yet. Visit
              Gallery to see available E-Gifts
            </Typography>
            <div className={classes.fab}>
              <Fab
                variant="extended"
                size="small"
                color="primary"
                component={Link}
                to="/home"
              >
                <GalleryIcon className={classes.icon} />
                Gallery
              </Fab>
            </div>
          </MyBox>
        ) : (
          <MyTwoBoxes
            leftBoxTitle="What happened?"
            leftBox={
              <>
                <Typography className={classes.text}>
                  Sorry, 404 Error occurred: this page does not exist yet. Visit
                  Gallery to see available E-Gifts
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
            rightBoxTitle="First time here?"
            rightBox={
              <>
                <Typography className={classes.text}>
                  Learn more about the E-Gifts project on the Home page
                </Typography>
                <div className={classes.fab}>
                  <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    component={Link}
                    to="/home"
                  >
                    <HomeIcon className={classes.icon} />
                    Home
                  </Fab>
                </div>
              </>
            }
          />
        )}
      </Box>
    </MyContainer>
  );
};

const mapStateToProps = state => ({
  isAuth: state.userReducer.isAuth
});

export default connect(
  mapStateToProps,
  null
)(NotFound);
