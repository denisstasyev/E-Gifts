import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LinkButton from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import axios from "axios";
import { BACKEND_SERVER } from "config";

import { AUTH_SIGNIN } from "store/actionTypes";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
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
    marginTop: theme.spacing(1)
  },
  alert: {
    color: "red",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2, 0, 2)
  }
}));

const SignIn = props => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    rememberMe: true,
    showPassword: false,
    signInError: ""
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

    if (values.username.length < 5 || values.password.length < 5) {
      setValues({ ...values, signInError: "Wrong username or password" });
    } else {
      axios
        .get(
          `${BACKEND_SERVER}/login?login=${values.username}&password=${values.password}`
        )
        .then(function(response) {
          if (response.data.Result) {
            setValues({ ...values, signInError: "" });
            props.handleSignIn(response.data);
            //TODO: Direct to account page
          } else {
            setValues({ ...values, signInError: "Wrong username or password" });
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            value={values.username}
            onChange={handleChange("username")}
            // autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            // autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
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
          {values.signInError !== "" ? (
            <Typography className={classes.alert} align="center">
              {values.signInError}
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <LinkButton variant="body2" component={Link} to="/account/signup">
                {"Don't have an account? Sign Up"}
              </LinkButton>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapDispatchToProps = dispatch => ({
  handleSignIn: response =>
    dispatch({
      type: AUTH_SIGNIN,
      response
    })
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
