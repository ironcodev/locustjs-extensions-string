import { isString, isSomeString } from "@locustjs/base";

const Chars = {
  punctuation: [
    ".",
    ",",
    ";",
    ":",
    "?",
    "!",
    "(",
    ")",
    "-",
    "'",
    '"',
    "/",
    "\\",
    "{",
    "}",
    "[",
    "]",
    "%",
    "#",
  ],
  control: [
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
    "|",
    "<",
    ">",
    "?",
    ":",
    "{",
    "}",
    "[",
    "]",
    ";",
    '"',
    "'",
    ",",
    ".",
    "/",
    "-",
    "=",
    "\\",
    "`",
  ],
  arithmatic: [
    "/",
    "\\",
    "+",
    "-",
    "(",
    ")",
    "%",
    "^",
    "*",
    "++",
    "--",
    "*=",
    "/=",
    "+=",
    "-=",
  ],
  logic: ["&&", "||", "!", "&=", "|="],
  bitwise: ["&", "|", ">>", "<<"],
  comparison: ["==", "!=", "<>", ">", "<", ">=", "<=", "===", "!=="],
};

const isChar = (x) => isString(x) && x.length == 1;
const isPunctuation = (x) => isSomeString(x) && Chars.punctuation.indexOf(x) >= 0;
const isControl = (x) => isSomeString(x) && Chars.control.indexOf(x) >= 0;
const isAlpha = (x) => isSomeString(x) && x.match(/^[a-z]+$/i) !== null;
const isLower = (x) => isSomeString(x) && x.match(/^[a-z]+$/) !== null;
const isUpper = (x) => isSomeString(x) && x.match(/^[A-Z]+$/) !== null;
const isDigit = (x) => isSomeString(x) && x.match(/^[0-9]+$/) !== null;
const isAlphaNum = (x) => isSomeString(x) && x.match(/^[a-z0-9]+$/i) !== null;
const isWord = (x) => isSomeString(x) && x.match(/^\w+$/i) !== null;
const isArithmatic = (x) => isSomeString(x) && Chars.arithmatic.indexOf(x) >= 0;
const isLogic = (x) => isSomeString(x) && Chars.logic.indexOf(x) >= 0;
const isBitwise = (x) => isSomeString(x) && Chars.bitwise.indexOf(x) >= 0;
const isComparison = (x) => isSomeString(x) && Chars.comparison.indexOf(x) >= 0;
const isWhitespace = (x) => isSomeString(x) && x.match(/^\s+$/) !== null;
const isMath = (x) => isArithmatic(x) || isLogic(x) || isBitwise(x) || isComparison(x);
const isLetter = isAlpha;

export {
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
};
