import React from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Header from "components/Header";
import ScrollTop from "components/ScrollTop";

import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";

const Home = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic="E-Gifts" />
        <Box my={2}>
          <Typography>
            Hi, E-Gift are electronic gifts that you can give to a friend. You
            can choose a gift in the{" "}
            <Typography component={Link} to={"/gallery"}>
              Gallery
            </Typography>
            . Having bought a gift, you will receive a unique link by opening
            which your friend will be able to receive a gift.
          </Typography>
          <Typography>
            E- also means ecology. Refusing traditional gifts you stop polluting
            our planet.
          </Typography>
          <Fab
            variant="extended"
            size="small"
            color="primary"
            aria-label="add"
            component={Link}
            to="/gallery"
          >
            Get started
          </Fab>
        </Box>
      </Container>
      <ScrollTop />
      <Toolbar />
    </React.Fragment>
  );
};

export default Home;
