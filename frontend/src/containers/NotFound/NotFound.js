import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";

import GalleryIcon from "@material-ui/icons/Redeem";
import HomeIcon from "@material-ui/icons/Home";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyTwoBoxes } from "components/MyTwoBoxes";

import { addOnLoadAnimation, resolveContent } from "utils/animations";

import { useStyles } from "./styles";

const NotFound = () => {
  const classes = useStyles();

  addOnLoadAnimation(resolveContent);

  return (
    <MyContainer>
      <Header topic="Not Found" />
      <Box id="content" mb={2}>
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
                  size="medium"
                  color="primary"
                  component={Link}
                  to="/home"
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
                  size="medium"
                  color="primary"
                  component={Link}
                  to="/gallery"
                >
                  <HomeIcon className={classes.icon} />
                  Home
                </Fab>
              </div>
            </>
          }
        />
      </Box>
    </MyContainer>
  );
};

export default NotFound;
