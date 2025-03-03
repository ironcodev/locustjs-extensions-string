import StringBuilder from "./StringBuilder";
import SplitOptions from "./SplitOptions";
import replaceAll from "./replaceAll";
import reverse from "./reverse";
import { ltrim, rtrim } from "./trim";
import fromArray from "./fromArray";
import toArray from "./toArray";
import fromBytes from "./fromBytes";
import toBytes from "./toBytes";
import format from "./format";
import {
  Chars,
  isChar,
  isPunctuation,
  isControl,
  isAlpha,
  isLower,
  isUpper,
  isDigit,
  isAlphaNum,
  isWord,
  isArithmatic,
  isLogic,
  isBitwise,
  isComparison,
  isWhitespace,
  isMath,
  isLetter,
} from "./Char.Extensions";
import stringify from "./stringify";
import toggleCase from "./toggleCase";
import unString from "./unString";
import pascalCase from "./pascalCase";
import camelCase from "./camelCase";
import capitalize from "./capitalize";
import { left, right } from "./left-right";
import { StringTransformations, xsplit } from "./xsplit";
import nsplit from "./nsplit";
import ExtensionHelper from "@locustjs/extensions-options";
import {
  isNumeric,
  isString,
  isArray,
  isNullOrUndefined,
} from "@locustjs/base";

const changeCase = toggleCase;

function configureStringExtensions(options, logger) {
  const eh = new ExtensionHelper(options, logger);

  eh.extend(String, "replaceAll", function (find, replace) {
    return replaceAll(this, find, replace);
  });
  eh.extend(String, "reverse", function () {
    return reverse(this);
  });
  eh.extend(String, "ltrim", function () {
    return ltrim(this);
  });
  eh.extend(String, "rtrim", function () {
    return rtrim(this);
  });
  eh.extend(String, "toArray", function () {
    return toArray(this);
  });
  eh.extend(String, "toBytes", function () {
    return toBytes(this);
  });
  eh.extend(String, "format", function (...args) {
    return format(this, ...args);
  });
  eh.extend(String, "isChar", function (...args) {
    return isChar(this, ...args);
  });
  eh.extend(String, "isPunctuation", function () {
    return isPunctuation(this);
  });
  eh.extend(String, "isControl", function () {
    return isControl(this);
  });
  eh.extend(String, "isAlpha", function () {
    return isAlpha(this);
  });
  eh.extend(String, "isLower", function () {
    return isLower(this);
  });
  eh.extend(String, "isUpper", function () {
    return isUpper(this);
  });
  eh.extend(String, "isDigit", function () {
    return isDigit(this);
  });
  eh.extend(String, "isAlphaNum", function () {
    return isAlphaNum(this);
  });
  eh.extend(String, "isWord", function () {
    return isWord(this);
  });
  eh.extend(String, "isArithmatic", function () {
    return isArithmatic(this);
  });
  eh.extend(String, "isLogic", function () {
    return isLogic(this);
  });
  eh.extend(String, "isBitwise", function () {
    return isBitwise(this);
  });
  eh.extend(String, "isComparison", function () {
    return isComparison(this);
  });
  eh.extend(String, "isWhitespace", function () {
    return isWhitespace(this);
  });
  eh.extend(String, "isMath", function () {
    return isMath(this);
  });
  eh.extend(String, "isLetter", function () {
    return isLetter(this);
  });
  eh.extend(String, "stringify", function (ch) {
    return stringify(this, ch);
  });
  eh.extend(String, "toggleCase", function () {
    return toggleCase(this);
  });
  eh.extend(String, "changeCase", function () {
    return changeCase(this);
  });
  eh.extend(String, "unString", function () {
    return unString(this);
  });
  eh.extend(String, "pascalCase", function () {
    return pascalCase(this);
  });
  eh.extend(String, "camelCase", function () {
    return camelCase(this);
  });
  eh.extend(String, "capitalize", function () {
    return capitalize(this);
  });
  eh.extend(String, "left", function (n) {
    return left(this, n);
  });
  eh.extend(String, "right", function (n) {
    return right(this, n);
  });
  eh.extend(String, "xsplit", function (...args) {
    return xsplit(this, ...args);
  });
  eh.extend(String, "nsplit", function (...args) {
    return nsplit(this, ...args);
  });

  const _split = String.prototype.split;

  if (eh.shouldExtend("split")) {
    const _fn = function (...args) {
      if (
        args.length <= 1 ||
        (args.length == 2 &&
          isString(args[0]) &&
          (isNumeric(args[1]) || isNullOrUndefined(args[1])))
      ) {
        return _split.call(this, ...args);
      }

      let separators = args.length ? args[0] : undefined;
      let limit = args.length > 1 ? args[1] : undefined;
      let callback = args.length > 2 ? args[2] : undefined;
      let trans = args.length > 3 ? args.slice(3) : [];

      if (isArray(separators)) {
        return nsplit(this, separators, callback, limit);
      }

      trans = [callback, ...trans];

      if (isNullOrUndefined(callback)) {
        trans.splice(1);
      }

      return xsplit(this, separators, limit, ...trans);
    };

    String.prototype.split = _fn;

    eh._log(`String.prototype.split extended.`);
  }

  eh.extend(String, "replaceAll", replaceAll, true);
  eh.extend(String, "reverse", reverse, true);
  eh.extend(String, "ltrim", ltrim, true);
  eh.extend(String, "rtrim", rtrim, true);
  eh.extend(String, "fromArray", fromArray, true);
  eh.extend(String, "toArray", toArray, true);
  eh.extend(String, "fromBytes", fromBytes, true);
  eh.extend(String, "toBytes", toBytes, true);
  eh.extend(String, "format", format, true);

  eh.extend(String, "Chars", Chars, true);

  eh.extend(String, "isChar", isChar, true);
  eh.extend(String, "isPunctuation", isPunctuation, true);
  eh.extend(String, "isControl", isControl, true);
  eh.extend(String, "isAlpha", isAlpha, true);
  eh.extend(String, "isLower", isLower, true);
  eh.extend(String, "isUpper", isUpper, true);
  eh.extend(String, "isDigit", isDigit, true);
  eh.extend(String, "isAlphaNum", isAlphaNum, true);
  eh.extend(String, "isWord", isWord, true);
  eh.extend(String, "isArithmatic", isArithmatic, true);
  eh.extend(String, "isLogic", isLogic, true);
  eh.extend(String, "isBitwise", isBitwise, true);
  eh.extend(String, "isComparison", isComparison, true);
  eh.extend(String, "isWhitespace", isWhitespace, true);
  eh.extend(String, "isMath", isMath, true);
  eh.extend(String, "isLetter", isLetter, true);
  
  eh.extend(String, "stringify", stringify, true);
  eh.extend(String, "toggleCase", toggleCase, true);
  eh.extend(String, "changeCase", changeCase, true);
  eh.extend(String, "unString", unString, true);
  eh.extend(String, "pascalCase", pascalCase, true);
  eh.extend(String, "camelCase", camelCase, true);
  eh.extend(String, "capitalize", capitalize, true);
  eh.extend(String, "left", left, true);
  eh.extend(String, "right", right, true);
  eh.extend(String, "xsplit", xsplit, true);
  eh.extend(String, "nsplit", nsplit, true);
}

export {
  configureStringExtensions,
  StringBuilder,
  SplitOptions,
  StringTransformations,
  replaceAll,
  reverse,
  ltrim,
  rtrim,
  fromArray,
  toArray,
  fromBytes,
  toBytes,
  format,
  Chars,
  isChar,
  isPunctuation,
  isControl,
  isAlpha,
  isLower,
  isUpper,
  isDigit,
  isAlphaNum,
  isWord,
  isArithmatic,
  isLogic,
  isBitwise,
  isComparison,
  isWhitespace,
  isMath,
  isLetter,
  stringify,
  toggleCase,
  changeCase,
  unString,
  pascalCase,
  camelCase,
  capitalize,
  left,
  right,
  xsplit,
  nsplit,
};
