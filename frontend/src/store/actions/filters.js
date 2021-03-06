import axios from "axios";

import * as config from "configs/backendAPI";
import * as actionTypes from "store/actionTypes";

export const getAvailableTags = () => {
  return dispatch => {
    axios
      .get(`${config.BACKEND_SERVER}/get_tags`)
      .then(response => {
        if (response[config.DATA][config.RESULT]) {
          let availableTags = [];
          response[config.DATA][config.AVAILABLE_TAGS].forEach(element => {
            if (availableTags.indexOf(element[config.TAG_NAME]) === -1) {
              availableTags.push(element[config.TAG_NAME]);
            }
          });
          dispatch({
            type: actionTypes.FILTERS_SET_AVAILABLE_TAGS,
            availableTags
          });
        } else {
          console.log("Cannot load available tags :(");
        }
      })
      .catch(() => {
        console.log("Cannot load available tags: network problem");
        //TODO: dispatch(loadFail("Network problem, try again later"));
      });
  };
};
