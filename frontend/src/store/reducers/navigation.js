import * as actionTypes from "store/actionTypes";

const initialState = {
  show: true
};

const navigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NAVIGATION_TOGGLE:
      state.show = !state.show;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default navigationReducer;
