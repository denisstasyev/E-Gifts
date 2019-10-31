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

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Redirect } from "react-router-dom";

import * as userActionCreators from "store/actions/user";

const Profile = props => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {!props.isAuth ? (
        <Redirect to="/profile/signup" />
      ) : (
        <Container>
          <Header topic={props.username} />
          <Box my={2}>
            <Grid container spacing={2}>
              {props.firstName !== "" || props.lastName !== "" ? (
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {props.firstName} {props.lastName}
                  </Typography>
                </Grid>
              ) : null}
              {props.mail !== "" ? (
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Email: {props.mail}</Typography>
                </Grid>
              ) : null}
              {props.birthDate !== "" ? (
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">
                    Birth Date: {props.birthDate}
                  </Typography>
                </Grid>
              ) : null}
            </Grid>
            <Grid container spacing={2}>
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
                  onClick={handleClickOpen}
                >
                  Sign Out
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure you want to sign out?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This action will delete all data about you stored on this
                device.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={props.handleSignOut} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
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
  birthDate: state.userReducer.birthDate,
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
