import axios from "axios";

import * as config from "config";
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
const setGift = element => {
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

export const getAvailableGifts = selectedTags => {
  return dispatch => {
    if (selectedTags.length === 0) {
      axios
        .get(`${config.BACKEND_SERVER}/get_gallery`)
        .then(response => {
          if (response.data[config.RESULT]) {
            let gifts = [];
            response.data[config.AVAILABLE_GIFTS].forEach(element => {
              if (gifts.length === 0) {
                gifts.push(setGift(element));
              } else {
                let giftIds = gifts.map(gifts => gifts["id"]);
                if (giftIds.indexOf(element[config.GIFT_ID]) === -1) {
                  gifts.push(setGift(element));
                }
              }
            });
            dispatch({
              type: actionTypes.GALLERY_SET_AVAILABLE_GIFTS,
              availableGifts: gifts
            });
          } else {
            console.log("Cannot load all available gifts :(");
          }
        })
        .catch(e => {
          console.log("Cannot load all available gifts: network problem");
          console.log(e);
        });
    } else {
      //TODO: create request with tags
    }
  };
};
