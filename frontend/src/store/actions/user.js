import axios from "axios";

import * as config from "config";
import * as actionTypes from "store/actionTypes";

// import { preventXSSAttack } from "utils";

export const authSuccess = data => {
  return {
    type: actionTypes.USER_AUTH_SUCCESS,
    username: data[config.USERNAME],
    firstName: data[config.FIRST_NAME],
    lastName: data[config.LAST_NAME],
    mail: data[config.MAIL],
    token: data[config.TOKEN]
  };
};

export const authFail = errorMessage => {
  return {
    type: actionTypes.USER_AUTH_FAIL,
    errorMessage
  };
};

export const signIn = (username, password, rememberMe) => {
  return dispatch => {
    axios
      .get(
        `${config.BACKEND_SERVER}/login?login=${username}&password=${password}`
      )
      .then(response => {
        if (response.data[config.RESULT]) {
          dispatch(authSuccess(response.data));
          if (rememberMe) {
            localStorage.setItem("username", response.data[config.USERNAME]);
            localStorage.setItem("firstName", response.data[config.FIRST_NAME]); //TODO: fix null value
            localStorage.setItem("lastName", response.data[config.LAST_NAME]);
            localStorage.setItem("mail", response.data[config.MAIL]);
            localStorage.setItem("token", response.data[config.TOKEN]);
          }
        } else {
          dispatch(authFail("Wrong username or password"));
        }
      })
      .catch(() => {
        dispatch(authFail("Network problem, try again later"));
      });
  };
};

export const signUp = (
  firstName,
  lastName,
  mail,
  username,
  password,
  rememberMe
) => {
  return dispatch => {
    axios
      .get(
        `${config.BACKEND_SERVER}/reg?login=${username}&password=${password}&first_name=${firstName}&last_name=${lastName}&mail=${mail}`
      )
      .then(response => {
        if (response.data[config.RESULT]) {
          dispatch(authSuccess(response.data));
          if (rememberMe) {
            localStorage.setItem("username", response.data[config.USERNAME]);
            localStorage.setItem("firstName", response.data[config.FIRST_NAME]);
            localStorage.setItem("lastName", response.data[config.LAST_NAME]);
            localStorage.setItem("mail", response.data[config.MAIL]);
            localStorage.setItem("token", response.data[config.TOKEN]);
          }
        } else {
          dispatch(
            authFail(
              response.data[config.RESULT_MESSAGE]
                .replace("login", "username")
                .replace("Login", "Username")
            )
          );
        }
      })
      .catch(() => {
        dispatch(authFail("Network problem, try again later"));
      });
  };
};
