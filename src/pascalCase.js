import { isSomeString, isString } from "@locustjs/base";

const pascalCase = (x, replacer = "") => {
  let i = 0;

  return isSomeString(x)
    ? isString(replacer)
      ? x
          .match(/[a-z]+/gi)
          .map(
            (word) =>
              (i++ > 0 ? replacer || "" : "") +
              word.charAt(0).toUpperCase() +
              word.substr(1)
          )
          .join("")
      : x.replace(
          /[a-z]+/gi,
          (match) => match[0].toUpperCase() + match.substr(1).toLowerCase()
        )
    : "";
};

export default pascalCase;
