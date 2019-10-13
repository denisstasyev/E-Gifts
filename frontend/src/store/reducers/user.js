import { AUTH_SIGNUP } from "store/actionTypes";
import { AUTH_SIGNIN } from "store/actionTypes";

import { preventXSSAttack } from "utils";

const initialState = {
  username: null,
  firstName: null,
  lastName: null,
  mail: null,
  token: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGNIN:
      state.username = preventXSSAttack(action.response.Name);
      state.firstName = preventXSSAttack(action.response.FirstName);
      state.lastName = preventXSSAttack(action.response.LastName);
      state.mail = preventXSSAttack(action.response.Mail);
      state.token = action.response.Token;
      return Object.assign({}, state);
    case AUTH_SIGNUP:
      state.username = preventXSSAttack(action.response.Name);
      state.firstName = preventXSSAttack(action.response.FirstName);
      state.lastName = preventXSSAttack(action.response.LastName);
      state.mail = preventXSSAttack(action.response.Mail);
      state.token = action.response.Token;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default userReducer;
