import * as actionTypes from "store/actionTypes";

const initialState = {
  wasVisited: false,
  availableGifts: []
};

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GALLERY_VISIT:
      state.wasVisited = true;
      return Object.assign({}, state);
    case actionTypes.GALLERY_SET_AVAILABLE_GIFTS:
      state.availableGifts = action.availableGifts;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default galleryReducer;
