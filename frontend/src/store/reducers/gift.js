import * as actionTypes from "store/actionTypes";

const initialState = {
  id: null,
  name: null,
  description: null,
  price: null,
  tags: [],
  urls: []
};

const giftReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GIFT_SET:
      state.id = action.gift.id;
      state.name = action.gift.name;
      state.description = action.gift.description;
      state.price = action.gift.price;
      state.tags = action.gift.tags;
      state.urls = action.gift.urls;
      return Object.assign({}, state);
    default:
      return state;
  }
};

export default giftReducer;
