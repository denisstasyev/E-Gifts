import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinkButton from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Toolbar from "@material-ui/core/Toolbar";

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { Redirect } from "react-router-dom";

import * as userActionCreators from "store/actions/user";
import { USER_CLEAN_ERROR } from "store/actionTypes";

import { dateToString, validateMail } from "utils";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  alert: {
    color: "red",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = props => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    mail: "",
    birthDate: null,
    username: "",
    password: "",
    rememberMe: true,
    showPassword: false,
    mailError: ""
  });

  const handleChange = prop => event => {
    if (prop === "mail") {
      if (validateMail(event.target.value) || event.target.value === "") {
        values.mailError = "";
      } else {
        values.mailError = "Invalid Email Format";
      }
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleBirthDateChange = date => {
    setValues({ ...values, birthDate: date });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleCheck = prop => event => {
    setValues({ ...values, [prop]: event.target.checked });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (
      values.username.length >= 5 &&
      values.password.length >= 5 &&
      values.mailError === "" &&
      values.birthDate >= new Date("1.1.1900") &&
      values.birthDate <= new Date()
    ) {
      props.handleSubmit(
        values.firstName,
        values.lastName,
        values.mail,
        dateToString(values.birthDate),
        values.username,
        values.password,
        values.rememberMe
      );
    } else {
      props.handleError("Check Form Data");
    }
  };

  return (
    <React.Fragment>
      {props.isAuth ? (
        <Redirect to="/profile" />
      ) : (
        <React.Fragment>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="First Name"
                      autoComplete="fname"
                      value={values.firstName}
                      onChange={handleChange("firstName")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Last Name"
                      autoComplete="lname"
                      value={values.lastName}
                      onChange={handleChange("lastName")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Email Address"
                      autoComplete="email"
                      value={values.mail}
                      onChange={handleChange("mail")}
                      error={values.mailError !== ""}
                      helperText={values.mailError}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        fullWidth
                        clearable
                        inputVariant="outlined"
                        disableFuture
                        openTo="year"
                        format="dd.MM.yyyy"
                        label="Birth Date"
                        views={["year", "month", "date"]}
                        value={values.birthDate}
                        onChange={handleBirthDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Username"
                      autoComplete="username"
                      value={values.username}
                      onChange={handleChange("username")}
                      error={values.username.length < 5}
                      helperText={
                        values.username.length === 0
                          ? "Data required"
                          : values.username.length < 5
                          ? "Username is too short"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      autoComplete="new-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={handleClickShowPassword}
                            >
                              {values.showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      error={values.password.length < 5}
                      helperText={
                        values.password.length === 0
                          ? "Data required"
                          : values.password.length < 5
                          ? "Password is too short"
                          : ""
                      }
                    />
                  </Grid>
                </Grid>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.rememberMe}
                      onChange={handleCheck("rememberMe")}
                      value="remember me"
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                {props.errorMessage !== "" ? (
                  <Typography className={classes.alert} align="center">
                    {props.errorMessage}
                  </Typography>
                ) : null}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <LinkButton
                      variant="body2"
                      component={Link}
                      to="/profile/signin"
                      onClick={() => {
                        if (props.errorMessage !== null)
                          return props.handleRedirect();
                      }}
                    >
                      Already have an account? Sign In
                    </LinkButton>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          <Toolbar />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  errorMessage: state.userReducer.errorMessage,
  isAuth: state.userReducer.isAuth
});

const mapDispatchToProps = dispatch => ({
  handleError: errorMessage =>
    dispatch(userActionCreators.authFail(errorMessage)),
  handleSubmit: (
    firstName,
    lastName,
    mail,
    birthDate,
    username,
    password,
    rememberMe
  ) =>
    dispatch(
      userActionCreators.signUp(
        firstName,
        lastName,
        mail,
        birthDate,
        username,
        password,
        rememberMe
      )
    ),
  handleRedirect: () =>
    dispatch({
      type: USER_CLEAN_ERROR
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
