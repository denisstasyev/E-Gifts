import axios from "axios";

import * as config from "configs/backendAPI";

export const getGiftViewLink = async (id, text, isAuth) => {
  // if (!isAuth) {
  let giftViewLink = await axios
    .get(`${config.BACKEND_SERVER}/buy_gift_ref?id=${id}&text=${text}`)
    .then(response => {
      if (response[config.DATA][config.RESULT]) {
        return response[config.DATA][config.GIFT_VIEW_LINK];
      } else {
        console.log("Cannot buy gift :(");
      }
    })
    .catch(() => {
      console.log("Cannot buy gift: network problem");
      //TODO: dispatch(loadFail("Network problem, try again later"));
    });
  //Add gift to user
  // } else {
  //   axios
  //     .get(
  //       `${config.BACKEND_SERVER}/buy_gift_ref?id=${props.id}&text=${text}&authorization_token${props.token}`
  //     )
  //     .then(response => {
  //       if (response[config.DATA][config.RESULT]) {
  //         setLink(response[config.DATA][config.GIFT_VIEW_LINK]);
  //       } else {
  //         console.log("Cannot buy gift :(");
  //       }
  //     })
  //     .catch(() => {
  //       console.log("Cannot buy gift: network problem");
  //       //TODO: dispatch(loadFail("Network problem, try again later"));
  //     });
  //Send api call to add myself
  // }
  return giftViewLink;
};

export const sendMail = (guid, mail) => {
  axios
    .get(`${config.BACKEND_SERVER}/send_by_email?guid=${guid}&email=${mail}`)
    .then(response => {
      if (response[config.DATA][config.RESULT]) {
      } else {
        console.log("Cannot send gift :(");
      }
    })
    .catch(() => {
      console.log("Cannot send gift: network problem");
      //TODO: dispatch(loadFail("Network problem, try again later"));
    });
};
