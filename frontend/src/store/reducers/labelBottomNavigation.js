import * as actionTypes from "store/actionTypes";

const initialState = {
  show: true
};

const labelBottomNavigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LABELBOTTOMNAVIGATION_TOGGLE:
      state.show = !state.show;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default labelBottomNavigationReducer;
