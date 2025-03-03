import { isSomeString } from "@locustjs/base";
import { isAlpha, isLower } from "./Char.Extensions";

const capitalize = function (str) {
  let result = str;

  if (isSomeString(str)) {
    let arr = [];
    let inWord = false;

    for (let ch of str) {
      if (isAlpha(ch)) {
        if (!inWord) {
          inWord = true;

          if (isLower(ch)) {
            arr.push(ch.toUpperCase());
          } else {
            arr.push(ch);
          }
        } else {
          arr.push(ch);
        }
      } else {
        arr.push(ch);
        inWord = false;
      }
    }

    result = arr.join("");
  }

  return result;
};

export default capitalize;
