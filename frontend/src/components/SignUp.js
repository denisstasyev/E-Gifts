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

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import axios from "axios";
import { BACKEND_SERVER } from "config";

import { AUTH_SIGNUP } from "store/actionTypes";

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
    username: "",
    password: "",
    rememberMe: true,
    showPassword: false,
    signUpError: ""
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleCheck = prop => event => {
    setValues({ ...values, [prop]: event.target.checked });
  };

  const handleSubmit = event => {
    event.preventDefault();

    console.log(values);
    if (values.username.length === 0) {
      setValues({ ...values, signUpError: "Username required" });
    } else if (values.password.length === 0) {
      setValues({ ...values, signUpError: "Password required" });
    } else if (values.username.length < 5) {
      setValues({ ...values, signUpError: "Username is too short" });
    } else if (values.password.length < 5) {
      setValues({ ...values, signUpError: "Password is too short" });
    } else {
      axios
        .get(
          `${BACKEND_SERVER}/reg?login=${values.username}&password=${values.password}` //TODO fix this url
        )
        .then(function(response) {
          if (response.data.Result) {
            setValues({ ...values, signUpError: "" });
            props.handleSignUp(response.data);
          } else {
            setValues({ ...values, sigUpError: response.data.ResultMessage });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                // autoFocus
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Email Address"
                autoComplete="email"
                value={values.mail}
                onChange={handleChange("mail")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Username"
                autoComplete="username"
                value={values.username}
                onChange={handleChange("username")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
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
          {values.signUpError !== "" ? (
            <Typography className={classes.alert} align="center">
              {values.signUpError}
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
              <LinkButton variant="body2" component={Link} to="/account/signin">
                Already have an account? Sign in
              </LinkButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  handleSignUp: response =>
    dispatch({
      type: AUTH_SIGNUP,
      response
    })
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
