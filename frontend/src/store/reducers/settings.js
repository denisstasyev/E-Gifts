import * as actionTypes from "store/actionTypes";

import { MOBILE_WIDTH, PARTLY_MOBILE_WIDTH } from "configs/CSSvariables";

const initialState = {
  isMobile: true,
  isPartlyMobile: true
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SETTINGS_RESIZE:
      if (action.width < MOBILE_WIDTH) {
        state.isMobile = true;
        state.isPartlyMobile = true;
      } else if (action.width < PARTLY_MOBILE_WIDTH) {
        state.isMobile = false;
        state.isPartlyMobile = true;
      } else {
        state.isMobile = false;
        state.isPartlyMobile = false;
      }
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default settingsReducer;
