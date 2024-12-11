import {
  isArray,
  isString,
  isSomeString,
  isNumeric,
  isFunction,
  isSomeArray,
  query,
  isPrimitive,
} from "@locustjs/base";
import Enum from "@locustjs/enum";
import ExtensionHelper from "@locustjs/extensions-options";
import { htmlEncode, htmlDecode } from "@locustjs/htmlencode";

const SplitOptions = Enum.define(
  {
    none: 0,
    removeEmpties: 1,
    trim: 2,
    trimAndRemoveEmpties: 3,
    toLower: 4,
    trimToLowerAndRemoveEmpties: 5,
    toUpper: 6,
    trimToUpperAndRemoveEmpties: 7,
  },
  "SplitOptions"
);

const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();

class StringBuilder {
  constructor(bufferSize) {
    this.bufferSize = isNumeric(bufferSize) ? parseInt(bufferSize) || 32 : 32;
    this._buffer = new Array(this.bufferSize);
    this._index = 0;
    this._length = 0;
  }
  append(x) {
    this._buffer[this._index] = isSomeString(x)
      ? x
      : isFunction(x.toString)
      ? x.toString()
      : "";
    this._length += this._buffer[this._index].length;
    this._index++;

    if (this._index == this.bufferSize) {
      this._buffer.splice(this.bufferSize, ...new Array(this.bufferSize));
    }
  }
  get length() {
    return this._length;
  }
  toString() {
    const result = this._buffer.join("");

    this._buffer = new Array(this.bufferSize);
    this._index = 0;
    this._length = 0;

    return result;
  }
}
const replaceAll = (source, find, replace) =>
  source.replace(
    new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"),
    replace
  );
const reverse = (x) => (isSomeString(x) ? x.split("").reverse().join("") : "");
const ltrim = (x) => (isSomeString(x) ? x.trimLeft() : "");
const rtrim = (x) => (isSomeString(x) ? x.trimRight() : "");

const toBytes = (x) =>
  isSomeString(x) ? utf8Encoder.encode(x) : new Uint8Array();
const fromBytes = (x) => {
  if (x instanceof Uint8Array) {
    return utf8Decoder.decode(x);
  } else if (isArray(x)) {
    return utf8Decoder.decode(new Uint8Array(x));
  } else {
    return "";
  }
};
const toArray = (x) => {
  let result = [];

  if (isSomeString(x)) {
    for (let i = 0; i < x.length; i++) {
      result.push(x.charCodeAt(i));
    }
  }

  return result;
};
const fromArray = (arr) => {
  const result = new StringBuilder();

  if (isArray(arr)) {
    for (let item of arr) {
      if (isNumeric(item)) {
        result.append(String.fromCharCode(item));
      }
    }
  }

  return result.toString();
};
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

const isCharacter = (x) => isString(x) && x.length == 1;
const isPunctuation = (x) =>
  isSomeString(x) && Chars.punctuation.indexOf(x) >= 0;
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
const isMath = (x) =>
  isArithmatic(x) || isLogic(x) || isBitwise(x) || isComparison(x);
const isLetter = isAlpha;

const stringify = (x, ch = '"') => `${ch}${x}${ch}`;
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
const pascalCase = (x) =>
  isSomeString(x)
    ? x
        .match(/[a-z]+/gi)
        .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
        .join("")
    : "";
const camelCase = (x) =>
  isSomeString(x)
    ? x
        .match(/[a-z]+/gi)
        .map(
          (word, i) =>
            (i == 0
              ? word.charAt(0).toLowerCase()
              : word.charAt(0).toUpperCase()) + word.substr(1)
        )
        .join("")
    : "";
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
const changeCase = toggleCase;

const left = (x, n) => (isSomeString(x) ? x.substr(0, n) : "");
const right = (x, n) =>
  isSomeString(x) ? (x.length > n ? x.substr(x.length - n, n) : x) : "";

const StringTransformations = {
  free: (x) => x.trim(),
  trim: (x) => x.trim(),
  ltrim: (x) => ltrim(x),
  rtrim: (x) => rtrim(x),
  upper: (x) => x.toUpperCase(),
  lower: (x) => x.toLowerCase(),
  camel: (x) => camelCase(x),
  camelcase: (x) => camelCase(x),
  pascal: (x) => pascalCase(x),
  pascalcase: (x) => pascalCase(x),
  toggle: (x) => toggleCase(x),
  togglecase: (x) => toggleCase(x),
  changecase: (x) => toggleCase(x),
  capitalize: (x) => capitalize(x),
  reverse: (x) => reverse(x),
  stringify: (x) => stringify(x),
  unstring: (x) => unString(x),
  htmlencode: (x, ignoreList) => htmlEncode(x, ignoreList),
  htmldecode: (x, ignoreList) => htmlDecode(x, ignoreList),
  urlencode: (x, full) => (full ? encodeURIComponent(x) : encodeURI(x)),
  urldecode: (x, full) => (full ? decodeURIComponent(x) : decodeURI(x)),
  isValid: function (transform) {
    return isFunction(this[transform]);
  },
};

StringTransformations.f = StringTransformations.free;
StringTransformations.t = StringTransformations.trim;
StringTransformations.lt = StringTransformations.ltrim;
StringTransformations.rt = StringTransformations.rtrim;
StringTransformations.u = StringTransformations.upper;
StringTransformations.up = StringTransformations.upper;
StringTransformations.l = StringTransformations.lower;
StringTransformations.low = StringTransformations.lower;
StringTransformations.c = StringTransformations.camel;
StringTransformations.cam = StringTransformations.camel;
StringTransformations.p = StringTransformations.pascal;
StringTransformations.pas = StringTransformations.pascal;
StringTransformations.cc = StringTransformations.changecase;
StringTransformations.cap = StringTransformations.capitalize;
StringTransformations.s = StringTransformations.stringify;
StringTransformations.r = StringTransformations.reverse;
StringTransformations.rev = StringTransformations.reverse;
StringTransformations.un = StringTransformations.unstring;
StringTransformations.he = StringTransformations.htmlencode;
StringTransformations.hd = StringTransformations.htmldecode;
StringTransformations.ue = StringTransformations.urlencode;
StringTransformations.ud = StringTransformations.urldecode;

const _singleTransform = function (str, transformType) {
  let result = str;

  if (isFunction(transformType)) {
    result = transformType(str);
  } else {
    const transform = StringTransformations[transformType];

    if (isFunction(transform)) {
      result = transform(str);
    }
  }

  return result;
};
const _transform = function (str, transArray) {
  let result = str;

  transArray.forEach((transformType) => {
    result = _singleTransform(result, transformType);
  });

  return result;
};
const xsplit = function (str, separator, ...transforms) {
  let result = [];

  if (isSomeString(str)) {
    let _transforms = [];
    let _finalTransforms = [];

    for (let item of transforms) {
      if (isArray(item)) {
        for (let subItem of item) {
          _transforms.push(subItem);
        }
      } else if (isSomeString(item)) {
        let temp = xsplit(item, ",", SplitOptions.trimToLowerAndRemoveEmpties);

        for (let subItem of temp) {
          _transforms.push(subItem);
        }
      } else if (isNumeric(item)) {
        _transforms.push(item);
      } else if (isFunction(item)) {
        _transforms.push(item);
      }
    }

    for (let transform of _transforms) {
      if (SplitOptions.isValid(transform)) {
        const transformValue = SplitOptions.getNumber(transform);

        switch (transformValue) {
          case SplitOptions.removeEmpties:
            _finalTransforms.push("free");
            break;
          case SplitOptions.trim:
            _finalTransforms.push("trim");
            break;
          case SplitOptions.trimAndRemoveEmpties:
            _finalTransforms.push("trim");
            _finalTransforms.push("free");
            break;
          case SplitOptions.toLower:
            _finalTransforms.push("lower");
            break;
          case SplitOptions.trimToLowerAndRemoveEmpties:
            _finalTransforms.push("trim");
            _finalTransforms.push("lower");
            _finalTransforms.push("free");
            break;
          case SplitOptions.toUpper:
            _finalTransforms.push("upper");
            break;
          case SplitOptions.trimToUpperAndRemoveEmpties:
            _finalTransforms.push("trim");
            _finalTransforms.push("upper");
            _finalTransforms.push("free");
            break;
        }
      } else {
        _finalTransforms.push(transform);
      }
    }

    let arr = str.split(separator);

    if (_finalTransforms.length) {
      let i = 0;

      while (i < arr.length) {
        let item = arr[i++];

        item = _transform(item, _finalTransforms);

        if (
          (_finalTransforms[_finalTransforms.length - 1] == "free" ||
            _finalTransforms[_finalTransforms.length - 1] == "f") &&
          (!item || item.length == 0)
        ) {
          continue;
        }

        result.push(item);
      }
    } else {
      result = arr;
    }
  }

  return result;
};
function _nsplit(s, separators, callback, level) {
  let result = s.split(separators[0]);

  if (separators.length > 1) {
    for (let i = 0; i < result.length; i++) {
      result[i] = _nsplit(result[i], separators.slice(1), callback, level + 1);
    }
  } else if (isFunction(callback)) {
    for (let i = 0; i < result.length; i++) {
      result[i] = callback({
        input: s,
        value: result[i],
        index: i,
        level,
        separator: separators[0],
      });
    }
  }

  return result;
}
function nsplit(s, separators, callback) {
  if (isSomeString(s) && isSomeArray(separators)) {
    return _nsplit(s, separators, callback, 0);
  }

  return [];
}

const format = function (str, ...args) {
  let result = [];

  let _args;

  if (args.length == 1) {
    _args = args[0];
  } else {
    _args = args;
  }

  if (isSomeString(str) && args.length) {
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
            if (temp) {
              if (isNumeric(temp)) {
                result.push(["[" + temp + "]"]);
              } else {
                result.push([temp]);
              }

              temp = "";
            }

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

    let interpolations = {};

    for (i = 0; i < result.length; i++) {
      if (isArray(result[i])) {
        const fArgs = { source: str, part: i, args };
        const key = result[i][0];
        const isArrayKey = key[0] == "[" && key[key.length - 1] == "]";
        const arrayKeyIndex = isArrayKey ? key.substr(1, key.length - 2): -1;

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
  } else {
    result = [str];
  }

  return result.join("");
};

function configureStringExtensions(options, extendAsStaticMethods = true) {
  const eh = new ExtensionHelper(options, console);

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
  eh.extend(String, "isCharacter", function (...args) {
    return isCharacter(this, ...args);
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
  /* examples
		nsplit("a=1&b=ali", '&', '=') or nsplit("a=1&b=ali", ['&', '='])
		output:
		[
			["a",1],
			["b","ali"]
		]
		
		nsplit("a=1:b=ali&a=2:b=reza:c=true&a=3:b=:c=false&b=saeed:c=true", '&', ':', '=')
		output:
			[
				[
					["a",1],
					["b", "ali"]
				],
				[
					["a",2],
					["b", "reza"],
					["c", true]
				],
				[
					["a",3],
					["b", ""],
					["c", false]
				],
				[
					["b", "saeed"],
					["c", true]
				]
			]
	*/

  if (extendAsStaticMethods) {
    eh.extend(String, "replaceAll", replaceAll, true);
    eh.extend(String, "reverse", reverse, true);
    eh.extend(String, "ltrim", ltrim, true);
    eh.extend(String, "rtrim", rtrim, true);
    eh.extend(String, "toArray", toArray, true);
    eh.extend(String, "fromArray", fromArray, true);
    eh.extend(String, "toBytes", toBytes, true);
    eh.extend(String, "fromBytes", fromBytes, true);
    eh.extend(String, "isCharacter", isCharacter, true);
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
    eh.extend(String, "format", format, true);
    eh.extend(String, "xsplit", xsplit, true);
    eh.extend(String, "nsplit", nsplit, true);
  }
}

export default configureStringExtensions;
export {
  StringBuilder,
  SplitOptions,
  Chars,
  StringTransformations,
  replaceAll,
  reverse,
  ltrim,
  rtrim,
  left,
  right,
  toArray,
  fromArray,
  toBytes,
  fromBytes,
  isCharacter,
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
  toggleCase,
  changeCase,
  pascalCase,
  camelCase,
  capitalize,
  stringify,
  unString,
  format,
  xsplit,
  nsplit,
};
