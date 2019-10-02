// import { AUTH_REGISTER } from "store/actionTypes";
// import { AUTH_LOGIN } from "store/actionTypes";
// import { AUTH_SUCCESS } from "store/actionTypes";
// import { AUTH_FAIL } from "store/actionTypes";

// const initialState = {
//     username: null,
//     firstName: null,
//     lastName: null,
//     email: null,
//     token: null,
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CHANGE_COLOR:
//       state.prev_color = state.color;
//       state.color = action.color;
//       state.permit = true;
//       state.color_ar.push(action.color);
//       state.color_ind++;
//       state.color_cur = state.color_ind;
//       return Object.assign({}, state);
//     case PREV_COLOR:
//       state.color_cur--;
//       if (state.color_cur <= "0") {
//         state.permit = false;
//       }
//       state.color = state.color_ar[state.color_cur];
//       // state.color = state.prev_color;

//       return Object.assign({}, state);
//     default:
//       return state;
//   }
// };

// export default reducer;
