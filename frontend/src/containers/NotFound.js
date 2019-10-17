import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Header from "components/Header";

const NotFound = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic="Not Found" />
        <Box my={2}>
          Sorry, this page does not exist now. Visit out gallery to see
          available gifts.
        </Box>
      </Container>
      <Toolbar />
    </React.Fragment>
  );
};

export default NotFound;
