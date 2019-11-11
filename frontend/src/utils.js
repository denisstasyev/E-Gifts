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