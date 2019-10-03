import { AUTH_SIGNUP } from "store/actionTypes";
import { AUTH_SIGNIN } from "store/actionTypes";

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
      state.username = action.response.Name;
      state.firstName = action.response.FirstName;
      state.lastName = action.response.LastName;
      state.mail = action.response.Mail;
      state.token = action.response.Token;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default userReducer;
