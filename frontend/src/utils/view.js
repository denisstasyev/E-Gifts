import axios from "axios";

import * as config from "configs/backendAPI";

export const getViewGift = async link => {
  let viewGift = await axios
    .get(`${config.BACKEND_SERVER}/get_model_by_ref?guid=${link}`)
    .then(response => {
      let result = { modelURL: "", text: "", isValidGift: true };
      if (response[config.DATA][config.RESULT]) {
        result.modelURL = response[config.DATA][config.VIEW_MODEL_URL];
        result.text = response[config.DATA][config.VIEW_TEXT];
      } else {
        result.isValidGift = false;
      }
      return result;
    })
    .catch(() => {
      let result = { modelURL: "", text: "", isValidGift: true };
      console.log("Cannot buy gift: network problem");
      result.isValidGift = false; //TODO: dispatch(loadFail("Network problem, try again later"));
      return result;
    });
  return viewGift;
};
