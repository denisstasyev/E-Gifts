import React from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";

import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header";
import ScrollTop from "components/ScrollTop";

import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

import TweenMax from "gsap/TweenMax"; //TODO

const useStyles = makeStyles(theme => ({
  container: {
    overflowY: "auto",
    height: "100vh"
    // marginBottom: "60px"
  },
  box: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20
  },
  boxe: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    width: "50%"
    // minWidth: 400
    // height: 400
    // display: "flex"
  },
  boximg: {
    // position: "relative",
    margin: 40
  },
  img: {
    // position: "absolute",
    // left: 0,
    // top: 0,
    // position: "fixed",
    // position: "static",
    width: "50%"
    // padding: "10vw"
  },
  imgr: {
    marginLeft: "-50%"
  }
}));

const Home = props => {
  const classes = useStyles();

  const resolve = () => {
    TweenMax.from("#content", 1, {
      opacity: 0,
      y: 40
    });
    TweenMax.from("#e", 1, {
      opacity: 0,
      x: -40,
      y: 20
    });
  };

  const resolveToE = () => {
    TweenMax.to("#e", 2, {
      x: -50,
      y: 25
    });
  };

  const resolveOutE = () => {
    TweenMax.to("#e", 2, {
      x: 0,
      y: 0
    });
  };

  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    resolve();
  } else {
    window.addEventListener("DOMContentLoaded", resolve);
  }

  return (
    <>
      <CssBaseline />
      <Container className={classes.container}>
        <Header topic="E-Gifts" />
        <Box id="content" my={2}>
          <Box className={classes.box} p={2}>
            <Typography>
              E-Gifts are electronic gifts that you can give to a friend
            </Typography>
          </Box>
          <div></div>
          <Box className={classes.boxe} p={2} mt={2}>
            <div className={classes.boximg}>
              <img
                id="e"
                className={classes.img}
                src={require("static/home/E/E.svg")}
                alt="E-Gifts logo"
                onMouseOver={resolveToE}
                onMouseLeave={resolveOutE}
              />
              <img
                className={[classes.img, classes.imgr].join(" ")}
                src={require("static/home/E/noE.svg")}
                alt="E-Gifts logo"
                // onMouseOver={resolveToE}
                // onMouseLeave={resolveOutE}
              />
            </div>
            <div>
              <Typography>
                E- also means ecology. Refusing traditional gifts you stop
                polluting our planet.
              </Typography>
            </div>
          </Box>
        </Box>
        {/* <Toolbar /> */}
      </Container>
      <ScrollTop />
    </>
  );
};

export default Home;

// You
//               can choose a gift in the{" "}
//               <Typography component={Link} to={"/gallery"}>
//                 Gallery
//               </Typography>
//               . Having bought a gift, you will receive a unique link by opening
//               which your friend will be able to receive a gift.

{
  /* <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              component={Link}
              to="/gallery"
            >
              Get started
            </Fab> */
}
