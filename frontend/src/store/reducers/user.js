import * as actionTypes from "store/actionTypes";

const initialState = {
  username: null,
  firstName: null,
  lastName: null,
  mail: null,
  birthDate: null,
  token: null,
  errorMessage: null,
  isAuth: false,
  sentGiftGUID: "",
  receivedGiftGUID: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_AUTH_SUCCESS:
      state.username = action.username;
      state.firstName = action.firstName;
      state.lastName = action.lastName;
      state.mail = action.mail;
      state.birthDate = action.birthDate;
      state.token = action.token;
      state.errorMessage = null;
      state.isAuth = true;
      state.sentGiftGUID = "";
      state.receivedGiftGUID = "";
      return Object.assign({}, state);
    case actionTypes.USER_AUTH_FAIL:
      state.errorMessage = action.errorMessage;
      state.isAuth = false;
      return Object.assign({}, state);
    case actionTypes.USER_CLEAN_ERROR:
      state.errorMessage = null;
      return Object.assign({}, state);
    case actionTypes.USER_AUTH_EXIT:
      state.username = null;
      state.firstName = null;
      state.lastName = null;
      state.mail = null;
      state.birthDate = null;
      state.token = null;
      state.errorMessage = null;
      state.isAuth = false;
      state.sentGiftGUID = "";
      state.receivedGiftGUID = "";
      return Object.assign({}, state);
    case actionTypes.USER_SET_SENT_GIFT_GUID:
      state.sentGiftGUID = action.sentGiftGUID;
      return Object.assign({}, state);
    case actionTypes.USER_SET_RECEIVED_GIFT_GUID:
      state.receivedGiftGUID = action.receivedGiftGUID;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default userReducer;
