import {
  isArray,
  isSomeString,
  isNumeric,
  isFunction,
  query,
  isPrimitive,
} from "@locustjs/base";
import { isWord } from "./Char.Extensions";

const format = function (str, ...args) {
  let result = [];

  let _args;

  if (args.length == 1) {
    _args = args[0];
  } else {
    _args = args;
  }

  if (isSomeString(str)) {
    let i = 0;
    let state = 0;
    let temp = "";

    while (i < str.length) {
      let ch = str[i];

      switch (state) {
        case 0:
          if (ch == "{") {
            if (temp.length) {
              result.push(temp);
            }

            temp = "";
            state = 1;
          } else if (ch == "}") {
            if (temp.length) {
              result.push(temp);
            }

            temp = "";
            state = 2;
          } else {
            temp += ch;
          }

          break;
        case 1:
          if (ch == "{") {
            result.push("{");
            state = 0;
          } else if (ch == "}") {
            if (args.length) {
              if (temp) {
                if (isNumeric(temp)) {
                  result.push(["[" + temp + "]"]);
                } else {
                  result.push([temp]);
                }
              }
            } else {
              result.push("{" + temp + "}");
            }

            temp = "";

            state = 0;
          } else {
            if (!(isWord(ch) || ch == "." || ch == "[" || ch == "]")) {
              throw `Invalid character '${ch}' in interpolation.`;
            }

            temp += ch;
          }

          break;
        case 2:
          if (ch == "}") {
            result.push("}");
          } else {
            temp = "}" + ch;
          }

          state = 0;

          break;
      }

      i++;
    }

    if (state == 1) {
      throw `Unterminated interpolation detected at the end of input.`;
    }

    if (temp.length) {
      result.push(temp);
    }

    if (args.length) {
      let interpolations = {};

      for (i = 0; i < result.length; i++) {
        if (isArray(result[i])) {
          const fArgs = { source: str, part: i, args };
          const key = result[i][0];
          const isArrayKey = key[0] == "[" && key[key.length - 1] == "]";
          const arrayKeyIndex = isArrayKey ? key.substr(1, key.length - 2) : -1;

          if (interpolations[key] == undefined) {
            if (isFunction(_args)) {
              if (isArrayKey) {
                interpolations[key] = _args({
                  ...fArgs,
                  index: arrayKeyIndex,
                  key: arrayKeyIndex,
                });
              } else {
                interpolations[key] = _args({
                  ...fArgs,
                  index: key,
                  key,
                });
              }
            } else {
              if (isPrimitive(_args)) {
                interpolations[key] = query([_args], key);
              } else {
                interpolations[key] = query(_args, key);
              }
            }

            if (isFunction(interpolations[key])) {
              interpolations[key] = interpolations[key]({
                ...fArgs,
                key,
              });
            }
          }

          result[i] = interpolations[key];

          if (result[i] === undefined) {
            if (isArrayKey) {
              result[i] = "{" + arrayKeyIndex + "}";
            } else {
              result[i] = "{" + key + "}";
            }
          }
        }
      }
    }
  } else {
    result = [str];
  }

  return result.join("");
};

export default format;
