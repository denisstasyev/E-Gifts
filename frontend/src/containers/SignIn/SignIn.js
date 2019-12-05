import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LinkButton from "@material-ui/core/Link";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { Header2 } from "components/Header2";
import { MyContainer } from "components/MyContainer";
import { MyBox2 } from "components/MyBox2";
import { MyAvatar } from "components/MyAvatar";
import { Form } from "components/Form";
import { Alert } from "components/Alert";

import * as userActionCreators from "store/actions/user";
import { USER_CLEAN_ERROR } from "store/actionTypes";

import { useStyles } from "./styles";

const SignIn = props => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    rememberMe: true,
    showPassword: false
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
      props.handleError("Wrong username or password");
    } else {
      props.handleSubmit(values.username, values.password, values.rememberMe);
    }
  };

  return props.isAuth ? (
    <Redirect to="/profile" />
  ) : (
    <>
      <Header2 />
      <MyContainer type="small">
        <MyBox2>
          <MyAvatar title="Sign In">
            <LockOutlinedIcon />
          </MyAvatar>
          <Form>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              value={values.username}
              onChange={handleChange("username")}
              autoComplete="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
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
                  color="primary"
                />
              }
              label="Remember me"
            />
            {props.errorMessage !== null ? (
              <Alert text={props.errorMessage} />
            ) : null}
            <Button
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
                <LinkButton
                  component={Link}
                  to="/profile/signup"
                  onClick={() => {
                    if (props.errorMessage !== null)
                      return props.handleRedirect();
                  }}
                >
                  Don't have an account? Sign Up
                </LinkButton>
              </Grid>
            </Grid>
          </Form>
        </MyBox2>
      </MyContainer>
    </>
  );
};

const mapStateToProps = state => ({
  errorMessage: state.userReducer.errorMessage,
  isAuth: state.userReducer.isAuth
});

const mapDispatchToProps = dispatch => ({
  handleError: errorMessage =>
    dispatch(userActionCreators.authFail(errorMessage)),
  handleSubmit: (username, password, rememberMe) =>
    dispatch(userActionCreators.signIn(username, password, rememberMe)),
  handleRedirect: () =>
    dispatch({
      type: USER_CLEAN_ERROR
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
