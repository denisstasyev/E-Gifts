import * as actionTypes from "store/actionTypes";

const initialState = {
  wasVisited: false,
  availableGifts: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GALLERY_VISIT:
      state.wasVisited = true;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default userReducer;
