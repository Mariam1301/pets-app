export const transformEmptyStringsToNull = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = obj[key] === "" ? null : obj[key];
      return acc;
    }, {});
  };
  