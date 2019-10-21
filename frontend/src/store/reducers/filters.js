import * as actionTypes from "store/actionTypes";

const initialState = {
  availableTags: [],
  selectedTags: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTERS_SET_AVAILABLE_TAGS:
      state.availableTags = action.availableTags;
      return Object.assign({}, state);
    case actionTypes.FILTERS_SET_SELECTED_TAGS:
      if (state.selectedTags.indexOf(action.tag) === -1) {
        state.selectedTags = state.selectedTags.concat(action.tag);
      } else {
        let selectedTags = state.selectedTags;
        selectedTags.splice(selectedTags.indexOf(action.tag), 1);
        state.selectedTags = [];
        selectedTags.forEach(element => {
          state.selectedTags = state.selectedTags.concat(element);
        });
      }
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default userReducer;
