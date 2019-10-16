import * as actionTypes from "store/actionTypes";

const initialState = {
  username: null,
  firstName: null,
  lastName: null,
  mail: null,
  token: null,
  errorMessage: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_AUTH_SUCCESS:
      state.username = action.username;
      state.firstName = action.firstName;
      state.lastName = action.lastName;
      state.mail = action.mail;
      state.token = action.token;
      state.errorMessage = null;
      return Object.assign({}, state);
    case actionTypes.USER_AUTH_FAIL:
      state.errorMessage = action.errorMessage;
      return Object.assign({}, state);
    case actionTypes.USER_CLEAN_ERROR:
      state.errorMessage = null;
      return Object.assign({}, state);
    case actionTypes.USER_AUTH_EXIT:
      state.username = null;
      state.firstName = null;
      state.lastName = null;
      state.mail = null;
      state.token = null;
      state.errorMessage = null;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default userReducer;
