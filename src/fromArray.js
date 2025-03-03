import { isArray, isNullOrUndefined, isNumeric, isString } from "@locustjs/base";
import StringBuilder from "./StringBuilder";

const fromArray = (arr) => {
  const result = new StringBuilder();

  if (isArray(arr)) {
    for (let item of arr) {
      if (isNumeric(item)) {
        result.append(String.fromCharCode(item));
      } else if (isString(item)) {
        result.append(item);
      } else if (!isNullOrUndefined(item)) {
        result.append(item.toString());
      }
    }
  }

  return result.toString();
};

export default fromArray;
