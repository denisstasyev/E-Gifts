const sanitize = string => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&grave;",
    "/": "&#x2F;"
  };
  const reg = /[&<>"'`/]/gi;
  return string.replace(reg, match => map[match]);
};

export const preventXSSAttack = text => {
  if (text === null) {
    return null;
  } else {
    return sanitize(text);
  }
};

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
