import { isSomeString } from "@locustjs/base";

const toArray = (x) => {
  let result = [];

  if (isSomeString(x)) {
    for (let i = 0; i < x.length; i++) {
      result.push(x.charCodeAt(i));
    }
  }

  return result;
};

export default toArray;
