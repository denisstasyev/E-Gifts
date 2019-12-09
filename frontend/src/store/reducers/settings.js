import * as actionTypes from "store/actionTypes";

import {
  MOBILE_WIDTH,
  PARTLY_MOBILE_WIDTH,
  SMALL_MOBILE_WIDTH
} from "configs/CSSvariables";

const initialState = {
  isMobile: true,
  isPartlyMobile: true,
  isSmallMobile: false,
  colorTheme: "light"
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SETTINGS_RESIZE:
      if (action.width < SMALL_MOBILE_WIDTH) {
        state.isMobile = true;
        state.isPartlyMobile = true;
        state.isSmallMobile = true;
      } else if (action.width < MOBILE_WIDTH) {
        state.isMobile = true;
        state.isPartlyMobile = true;
        state.isSmallMobile = false;
      } else if (action.width < PARTLY_MOBILE_WIDTH) {
        state.isMobile = false;
        state.isPartlyMobile = true;
        state.isSmallMobile = false;
      } else {
        state.isMobile = false;
        state.isPartlyMobile = false;
        state.isSmallMobile = false;
      }
      return Object.assign({}, state);
    case actionTypes.SETTINGS_SET_COLOR_THEME:
      state.colorTheme = action.colorTheme;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default settingsReducer;
