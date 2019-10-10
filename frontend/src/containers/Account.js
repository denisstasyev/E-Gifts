import React from "react";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Header from "components/Header";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { Redirect } from "react-router-dom";

const Account = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      {props.token === null ? (
        <Redirect to="/account/signin" />
      ) : (
        <Container>
          <Header topic={props.username} />
          <Box my={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">{props.firstName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">{props.lastName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">{props.mail}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
      <Toolbar />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  token: state.userReducer.token,
  username: state.userReducer.username,
  firstName: state.userReducer.firstName,
  lastName: state.userReducer.lastName,
  mail: state.userReducer.mail
});

export default connect(
  mapStateToProps,
  null
)(Account);
