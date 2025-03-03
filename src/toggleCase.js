import { isSomeString } from "@locustjs/base";
import StringBuilder from "./StringBuilder";

const toggleCase = (x) => {
  const result = new StringBuilder();

  if (isSomeString(x)) {
    for (let i = 0; i < x.length; i++) {
      let code = x.charCodeAt(i);

      if (code >= 65 && code <= 90) {
        result.append(String.fromCharCode(code + 32));
      } else if (code >= 97 && code <= 122) {
        result.append(String.fromCharCode(code - 32));
      } else {
        result.append(x[i]);
      }
    }
  }

  return result.toString();
};

export default toggleCase;
