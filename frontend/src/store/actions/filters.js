import axios from "axios";

import * as config from "config";
import * as actionTypes from "store/actionTypes";

export const getAvailableTags = () => {
  return dispatch => {
    axios
      .get(`${config.BACKEND_SERVER}/get_tags`)
      .then(response => {
        if (response.data[config.RESULT]) {
          let availableTags = [];
          response.data.tags.forEach(element => {
            if (availableTags.indexOf(element.name) === -1) {
              availableTags.push(element.name);
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
      });
  };
};
