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

import { USER_AUTH_SUCCESS } from "store/actionTypes";

const Account = props => {
  //TODO: fix this not to handle every render time
  let data = {};
  data.username = localStorage.getItem("username");
  data.token = localStorage.getItem("token");
  if (data.username && data.token) {
    data.firstName = localStorage.getItem("firstName");
    data.lastName = localStorage.getItem("lastName");
    data.mail = localStorage.getItem("mail");
    props.handleAuthSuccess(data);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      {!props.username || !props.token ? (
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
  username: state.userReducer.username,
  firstName: state.userReducer.firstName,
  lastName: state.userReducer.lastName,
  mail: state.userReducer.mail,
  token: state.userReducer.token
});

const mapDispatchToProps = dispatch => ({
  handleAuthSuccess: data =>
    dispatch({
      type: USER_AUTH_SUCCESS,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      mail: data.mail,
      token: data.token
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
