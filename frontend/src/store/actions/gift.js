import axios from "axios";

import * as config from "configs/backendAPI";
import * as actionTypes from "store/actionTypes";

// After setGift(element) each gift will look like:
// gift = {
//   description: null,
//   id: 3,
//   name: "g2",
//   price: 0,
//   tags: ["t1", "t2"],
//   urls: ["g2url1", "g2url2"]
// };

export const setGift = element => {
  let gift = {};
  gift.id = element[config.GIFT_ID];
  gift.name = element[config.GIFT_NAME];
  gift.description = element[config.GIFT_DESCRIPTION];
  gift.price = element[config.GIFT_PRICE];
  gift.tags = [];
  element[config.GIFT_TAGS].forEach(elem => {
    if (gift.tags.length === 0) {
      gift.tags.push(elem[config.GIFT_TAG][config.TAG_NAME]);
    } else {
      if (gift.tags.indexOf(elem[config.GIFT_TAG][config.TAG_NAME]) === -1) {
        gift.tags.push(elem[config.GIFT_TAG][config.TAG_NAME]);
      }
    }
  });
  gift.urls = [];
  element[config.GIFT_URLS].forEach(elem => {
    if (gift.urls.length === 0) {
      gift.urls.push(elem[config.GIFT_IMAGE_URL]);
    } else {
      if (gift.urls.indexOf(elem[config.GIFT_IMAGE_URL]) === -1) {
        gift.urls.push(elem[config.GIFT_IMAGE_URL]);
      }
    }
  });
  return gift;
};

export const getGift = id => {
  return dispatch => {
    axios
      .get(`${config.BACKEND_SERVER}/get_gift?id=${id}`)
      .then(response => {
        if (response[config.DATA][config.RESULT]) {
          let gift = setGift(response[config.DATA][config.GIFT]);
          dispatch({
            type: actionTypes.GIFT_SET,
            gift
          });
        } else {
          console.log("Cannot load gift :(");
        }
      })
      .catch(() => {
        console.log("Cannot load gift: network problem");
        //TODO: dispatch(loadFail("Network problem, try again later"));
      });
  };
};
