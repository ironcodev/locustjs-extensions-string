import { isSomeString } from "@locustjs/base";

const unString = (x) => {
  let result = "";

  if (isSomeString(x)) {
    if (['"', "'", "`"].indexOf(x[0]) >= 0) {
      result = x.substr(1);
    }
    if (
      result.length &&
      ['"', "'", "`"].indexOf(result[result.length - 1]) >= 0
    ) {
      result = result.substr(0, result.length - 1);
    }
  }

  return result;
};

export default unString;
