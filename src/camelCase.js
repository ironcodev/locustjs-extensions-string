import { isSomeString, isString } from "@locustjs/base";

const camelCase = (x, replacer = "") => {
  let i = 0;

  return isSomeString(x)
    ? isString(replacer)
      ? x
          .match(/[a-z]+/gi)
          .map(
            (word, i) =>
              (i > 0 ? replacer || "" : "") +
              (i == 0
                ? word.charAt(0).toLowerCase()
                : word.charAt(0).toUpperCase()) +
              word.substr(1)
          )
          .join("")
      : x.replace(/[a-z]+/gi, (match) => {
          if (i++ == 0) {
            return match.toLowerCase();
          } else {
            return match[0].toUpperCase() + match.substr(1).toLowerCase();
          }
        })
    : "";
};

export default camelCase;
