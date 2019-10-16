import React from "react";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Header from "components/Header";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Redirect } from "react-router-dom";

import * as userActionCreators from "store/actions/user";

const Profile = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      {!props.isAuth ? (
        <Redirect to="/profile/signin" />
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
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                >
                  Edit profile
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={props.handleSignOut}
                >
                  Sign Out
                </Button>
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
  token: state.userReducer.token,
  isAuth: state.userReducer.username && state.userReducer.token
});

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => dispatch(userActionCreators.signOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
