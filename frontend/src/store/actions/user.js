import axios from "axios";

import * as config from "configs/backendAPI";
import * as actionTypes from "store/actionTypes";

import { nullStringToEmpty, backendDateToString } from "utils";

const setLocalStorage = data => {
  localStorage.setItem("username", data[config.DATA_USER][config.USERNAME]);
  localStorage.setItem(
    "firstName",
    nullStringToEmpty(data[config.DATA_USER][config.FIRST_NAME])
  );
  localStorage.setItem(
    "lastName",
    nullStringToEmpty(data[config.DATA_USER][config.LAST_NAME])
  );
  localStorage.setItem(
    "mail",
    nullStringToEmpty(data[config.DATA_USER][config.MAIL])
  );
  localStorage.setItem(
    "birthDate",
    backendDateToString(
      nullStringToEmpty(data[config.DATA_USER][config.BIRTH_DATE])
    )
  );
  localStorage.setItem("token", data[config.TOKEN]);
};

const clearLocalStorage = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("mail");
  localStorage.removeItem("birthDate");
  localStorage.removeItem("token");
};

export const authSuccess = data => {
  return {
    type: actionTypes.USER_AUTH_SUCCESS,
    username: data[config.DATA_USER][config.USERNAME],
    firstName: data[config.DATA_USER][config.FIRST_NAME],
    lastName: data[config.DATA_USER][config.LAST_NAME],
    mail: data[config.DATA_USER][config.MAIL],
    birthDate: backendDateToString(data[config.DATA_USER][config.BIRTH_DATE]),
    token: data[config.TOKEN]
  };
};

export const authFail = errorMessage => {
  return {
    type: actionTypes.USER_AUTH_FAIL,
    errorMessage
  };
};

export const authCheck = () => {
  return dispatch => {
    let data = {};
    data.username = localStorage.getItem("username");
    data.token = localStorage.getItem("token");
    if (data.username && data.token) {
      data.firstName = localStorage.getItem("firstName");
      data.lastName = localStorage.getItem("lastName");
      data.mail = localStorage.getItem("mail");
      data.birthDate = localStorage.getItem("birthDate");
      dispatch({
        type: actionTypes.USER_AUTH_SUCCESS,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        mail: data.mail,
        birthDate: data.birthDate,
        token: data.token
      });
    }
  };
};

export const signIn = (
  username,
  password,
  rememberMe,
  sentGiftGUID,
  receivedGiftGUID
) => {
  return dispatch => {
    axios
      .get(
        sentGiftGUID === ""
          ? receivedGiftGUID === ""
            ? `${config.BACKEND_SERVER}/login?login=${username}&password=${password}`
            : `${config.BACKEND_SERVER}/login?login=${username}&password=${password}&owned_gift_guid=${receivedGiftGUID}`
          : receivedGiftGUID === ""
          ? `${config.BACKEND_SERVER}/login?login=${username}&password=${password}&sent_gift_guid=${sentGiftGUID}`
          : `${config.BACKEND_SERVER}/login?login=${username}&password=${password}&sent_gift_guid=${sentGiftGUID}&owned_gift_guid=${receivedGiftGUID}`
      )
      .then(response => {
        if (response[config.DATA][config.RESULT]) {
          dispatch(authSuccess(response[config.DATA]));
          if (rememberMe) {
            setLocalStorage(response[config.DATA]);
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
  birthDate,
  username,
  password,
  rememberMe,
  sentGiftGUID,
  receivedGiftGUID
) => {
  return dispatch => {
    axios
      .get(
        sentGiftGUID === ""
          ? receivedGiftGUID === ""
            ? `${config.BACKEND_SERVER}/reg?login=${username}&password=${password}&first_name=${firstName}&last_name=${lastName}&mail=${mail}&birth_date=${birthDate}`
            : `${config.BACKEND_SERVER}/reg?login=${username}&password=${password}&first_name=${firstName}&last_name=${lastName}&mail=${mail}&birth_date=${birthDate}&owned_gift_guid=${receivedGiftGUID}`
          : receivedGiftGUID === ""
          ? `${config.BACKEND_SERVER}/reg?login=${username}&password=${password}&first_name=${firstName}&last_name=${lastName}&mail=${mail}&birth_date=${birthDate}&sent_gift_guid=${sentGiftGUID}`
          : `${config.BACKEND_SERVER}/reg?login=${username}&password=${password}&first_name=${firstName}&last_name=${lastName}&mail=${mail}&birth_date=${birthDate}&sent_gift_guid=${sentGiftGUID}&owned_gift_guid=${receivedGiftGUID}`
      )
      .then(response => {
        if (response[config.DATA][config.RESULT]) {
          dispatch(authSuccess(response[config.DATA]));
          if (rememberMe) {
            setLocalStorage(response[config.DATA]);
          }
        } else {
          dispatch(
            authFail(
              response[config.DATA][config.RESULT_MESSAGE]
                .replace(/login/g, "username")
                .replace(/Login/g, "Username")
            )
          );
        }
      })
      .catch(() => {
        dispatch(authFail("Network problem, try again later"));
      });
  };
};

export const signOut = () => {
  return dispatch => {
    dispatch({ type: actionTypes.USER_AUTH_EXIT });
    clearLocalStorage();
  };
};

export const updateUser = () => {
  return dispatch => {
    // dispatch({ type: actionTypes.USER_AUTH_EXIT });
  };
};
