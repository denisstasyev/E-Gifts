import axios from "axios";

import * as config from "configs/backendAPI";
import * as actionTypes from "store/actionTypes";

import { setGifts } from "utils/actions";

export const getNewestGifts = () => {
  return dispatch => {
    axios
      .get(`${config.BACKEND_SERVER}/get_gallery_last`)
      .then(response => {
        if (response[config.DATA][config.RESULT]) {
          let gifts = setGifts(response);
          dispatch({
            type: actionTypes.HOME_SET_NEWEST_GIFTS,
            newestGifts: gifts
          });
        } else {
          console.log("Cannot load all newest gifts :(");
        }
      })
      .catch(() => {
        console.log("Cannot load all newest gifts: network problem");
      });
  };
};

export const getPopularGifts = () => {
  return dispatch => {
    axios
      .get(`${config.BACKEND_SERVER}/get_gallery_popular`)
      .then(response => {
        if (response[config.DATA][config.RESULT]) {
          let gifts = setGifts(response);
          dispatch({
            type: actionTypes.HOME_SET_POPULAR_GIFTS,
            popularGifts: gifts
          });
        } else {
          console.log("Cannot load all popular gifts :(");
        }
      })
      .catch(() => {
        console.log("Cannot load all popular gifts: network problem");
      });
  };
};
