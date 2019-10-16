import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Header from "components/Header";
import ScrollTop from "components/ScrollTop";

const Home = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic="E-Gifts" />
        <Box my={2}>
          {[...new Array(120)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </Box>
      </Container>
      <ScrollTop />
      <Toolbar />
    </React.Fragment>
  );
};

export default Home;
