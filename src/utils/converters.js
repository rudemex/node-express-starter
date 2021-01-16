const toStringify = (data, replace = null, space = 2) => {
  return JSON.stringify(data, replace, space);
};

module.exports = {
  toStringify,
};
