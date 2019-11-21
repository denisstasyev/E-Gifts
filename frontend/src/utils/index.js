import { MOBILE_WIDTH, MOBILE_HEIGHT } from "configs/CSSvariables";

export const nullStringToEmpty = text => {
  if (text === null) {
    return "";
  } else {
    return text;
  }
};

export const dateToString = date => {
  if (date instanceof Date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  } else return "";
};

export const backendDateToString = text => {
  text = nullStringToEmpty(text);
  if (text === "") {
    return "";
  } else {
    let strings = text.split("T");
    strings = strings[0].split("-");
    if (strings.length !== 3) {
      return "";
    } else {
      return `${strings[1]}.${strings[2]}.${strings[0]}`;
    }
  }
};

export const validateMail = mail => {
  //eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(mail).toLowerCase());
};

export const hexToRgb = hex => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null;
};

export const priceToString = price => {
  if (price === 0 || price === null) return "FREE";
  else return `${price} $`;
};

export const checkIsMobile = () => {
  return window.innerWidth < MOBILE_WIDTH || window.innerHeight < MOBILE_HEIGHT;
};

export const copyToClipboard = id => {
  const copyTextarea = document.getElementById(id);
  copyTextarea.focus();
  copyTextarea.select();

  try {
    document.execCommand("copy");
  } catch (error) {
    console.log("Oops, unable to copy");
  }
};
