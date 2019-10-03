import React from "react";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import SignIn from "components/SignIn";

const Account = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box my={2}>
          {props.token === null ? (
            <SignIn />
          ) : (
            [...new Array(120)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")
          )}
        </Box>
      </Container>
      <Toolbar />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  token: state.userReducer.token
});

export default connect(
  mapStateToProps,
  null
)(Account);
