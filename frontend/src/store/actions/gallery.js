import axios from "axios";

import * as config from "configs/backendAPI";
import * as actionTypes from "store/actionTypes";

import { setGifts } from "utils/actions";

export const getAvailableGifts = selectedTags => {
  return dispatch => {
    if (selectedTags.length === 0) {
      axios
        .get(`${config.BACKEND_SERVER}/get_gallery`)
        .then(response => {
          if (response[config.DATA][config.RESULT]) {
            let gifts = setGifts(response);
            dispatch({
              type: actionTypes.GALLERY_SET_AVAILABLE_GIFTS,
              availableGifts: gifts
            });
          } else {
            console.log("Cannot load all available gifts :(");
          }
        })
        .catch(() => {
          console.log("Cannot load all available gifts: network problem");
        });
    } else {
      //TODO: create request with tags
      axios
        .get(
          `${config.BACKEND_SERVER}/get_gallery_by_tags?tags=${selectedTags}`
        )
        .then(response => {
          if (response[config.DATA][config.RESULT]) {
            let gifts = setGifts(response);
            dispatch({
              type: actionTypes.GALLERY_SET_AVAILABLE_GIFTS,
              availableGifts: gifts
            });
          } else {
            console.log("Cannot load all available gifts :(");
          }
        })
        .catch(() => {
          console.log("Cannot load all available gifts: network problem");
          //TODO: dispatch(loadFail("Network problem, try again later"));
        });
    }
  };
};
