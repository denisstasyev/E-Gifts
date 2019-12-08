import * as actionTypes from "store/actionTypes";

const initialState = {
  newestGifts: [],
  popularGifts: []
};

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HOME_SET_NEWEST_GIFTS:
      state.newestGifts = action.newestGifts;
      return Object.assign({}, state);
    case actionTypes.HOME_SET_POPULAR_GIFTS:
      state.popularGifts = action.popularGifts;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default galleryReducer;
