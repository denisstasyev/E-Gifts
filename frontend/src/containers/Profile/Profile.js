import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as userActionCreators from "store/actions/user";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";

const Profile = props => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return !props.isAuth ? (
    <Redirect to="/profile/signup" />
  ) : (
    <>
      <MyContainer>
        <Header topic={props.username} />
        <Box id="content" mb={2}>
          <MyBox
            title={
              props.firstName !== "" || props.lastName !== ""
                ? `${props.firstName} ${props.lastName}`
                : "User"
            }
          >
            <Grid container spacing={2}>
              {props.mail !== "" ? (
                <Grid item xs={12} sm={6}>
                  <Typography>Email: {props.mail}</Typography>
                </Grid>
              ) : null}
              {props.birthDate !== "" ? (
                <Grid item xs={12} sm={6}>
                  <Typography>Birth Date: {props.birthDate}</Typography>
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
          </MyBox>
        </Box>
      </MyContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign Out Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleSignOut} color="primary" autoFocus>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  username: state.userReducer.username,
  firstName: state.userReducer.firstName,
  lastName: state.userReducer.lastName,
  mail: state.userReducer.mail,
  birthDate: state.userReducer.birthDate,
  isAuth: state.userReducer.isAuth
});

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => dispatch(userActionCreators.signOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
