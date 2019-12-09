import axios from "axios";

import * as config from "configs/backendAPI";
import * as actionTypes from "store/actionTypes";

import { setGift } from "utils/actions";

export const getGift = id => {
  return dispatch => {
    axios
      .get(`${config.BACKEND_SERVER}/get_gift?id=${id}`)
      .then(response => {
        if (response[config.DATA][config.RESULT]) {
          let gift = setGift(response[config.DATA][config.GIFT]);
          dispatch({
            type: actionTypes.GIFT_SET,
            gift
          });
        } else {
          console.log("Cannot load gift :(");
        }
      })
      .catch(() => {
        console.log("Cannot load gift: network problem");
        //TODO: dispatch(loadFail("Network problem, try again later"));
      });
  };
};
