function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function () { it = it.call(o); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { isArray, isString, isSomeString, isNumeric, isFunction, isSomeArray, query, isNullOrEmpty } from "@locustjs/base";
import Enum from "@locustjs/enum";
import ExtensionHelper from "@locustjs/extensions-options";
import { htmlEncode, htmlDecode } from "@locustjs/htmlencode";
var SplitOptions = Enum.define({
  none: 0,
  removeEmpties: 1,
  trim: 2,
  trimAndRemoveEmpties: 3,
  toLower: 4,
  trimToLowerAndRemoveEmpties: 5,
  toUpper: 6,
  trimToUpperAndRemoveEmpties: 7
}, "SplitOptions");
var utf8Encoder = new TextEncoder();
var utf8Decoder = new TextDecoder();
var StringBuilder = /*#__PURE__*/function () {
  function StringBuilder(bufferSize) {
    _classCallCheck(this, StringBuilder);
    this.bufferSize = isNumeric(bufferSize) ? parseInt(bufferSize) || 32 : 32;
    this._buffer = new Array(this.bufferSize);
    this._index = 0;
    this._length = 0;
  }
  _createClass(StringBuilder, [{
    key: "append",
    value: function append(x) {
      this._buffer[this._index] = isSomeString(x) ? x : isFunction(x.toString) ? x.toString() : "";
      this._length += this._buffer[this._index].length;
      this._index++;
      if (this._index == this.bufferSize) {
        var _this$_buffer;
        (_this$_buffer = this._buffer).splice.apply(_this$_buffer, [this.bufferSize].concat(_toConsumableArray(new Array(this.bufferSize))));
      }
    }
  }, {
    key: "length",
    get: function get() {
      return this._length;
    }
  }, {
    key: "toString",
    value: function toString() {
      var result = this._buffer.join("");
      this._buffer = new Array(this.bufferSize);
      this._index = 0;
      this._length = 0;
      return result;
    }
  }]);
  return StringBuilder;
}();
var replaceAll = function replaceAll(source, find, replace) {
  return source.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), replace);
};
var _reverse = function reverse(x) {
  return isSomeString(x) ? x.split("").reverse().join("") : "";
};
var _ltrim = function ltrim(x) {
  return isSomeString(x) ? x.trimLeft() : "";
};
var _rtrim = function rtrim(x) {
  return isSomeString(x) ? x.trimRight() : "";
};
var toBytes = function toBytes(x) {
  return isSomeString(x) ? utf8Encoder.encode(x) : new Uint8Array();
};
var fromBytes = function fromBytes(x) {
  if (x instanceof Uint8Array) {
    return utf8Decoder.decode(x);
  } else if (isArray(x)) {
    return utf8Decoder.decode(new Uint8Array(x));
  } else {
    return "";
  }
};
var toArray = function toArray(x) {
  var result = [];
  if (isSomeString(x)) {
    for (var i = 0; i < x.length; i++) {
      result.push(x.charCodeAt(i));
    }
  }
  return result;
};
var fromArray = function fromArray(arr) {
  var result = new StringBuilder();
  if (isArray(arr)) {
    var _iterator = _createForOfIteratorHelper(arr),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (isNumeric(item)) {
          result.append(String.fromCharCode(item));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return result.toString();
};
var Chars = {
  punctuation: [".", ",", ";", ":", "?", "!", "(", ")", "-", "'", '"', "/", "\\", "{", "}", "[", "]", "%", "#"],
  control: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "|", "<", ">", "?", ":", "{", "}", "[", "]", ";", '"', "'", ",", ".", "/", "-", "=", "\\", "`"],
  arithmatic: ["/", "\\", "+", "-", "(", ")", "%", "^", "*", "++", "--", "*=", "/=", "+=", "-="],
  logic: ["&&", "||", "!", "&=", "|="],
  bitwise: ["&", "|", ">>", "<<"],
  comparison: ["==", "!=", "<>", ">", "<", ">=", "<=", "===", "!=="]
};
var isCharacter = function isCharacter(x) {
  return isString(x) && x.length == 1;
};
var isPunctuation = function isPunctuation(x) {
  return isSomeString(x) && Chars.punctuation.indexOf(x) >= 0;
};
var isControl = function isControl(x) {
  return isSomeString(x) && Chars.control.indexOf(x) >= 0;
};
var isAlpha = function isAlpha(x) {
  return isSomeString(x) && x.match(/^[a-z]+$/i) !== null;
};
var isLower = function isLower(x) {
  return isSomeString(x) && x.match(/^[a-z]+$/) !== null;
};
var isUpper = function isUpper(x) {
  return isSomeString(x) && x.match(/^[A-Z]+$/) !== null;
};
var isDigit = function isDigit(x) {
  return isSomeString(x) && x.match(/^[0-9]+$/) !== null;
};
var isAlphaNum = function isAlphaNum(x) {
  return isSomeString(x) && x.match(/^[a-z0-9]+$/i) !== null;
};
var isWord = function isWord(x) {
  return isSomeString(x) && x.match(/^\w+$/i) !== null;
};
var isArithmatic = function isArithmatic(x) {
  return isSomeString(x) && Chars.arithmatic.indexOf(x) >= 0;
};
var isLogic = function isLogic(x) {
  return isSomeString(x) && Chars.logic.indexOf(x) >= 0;
};
var isBitwise = function isBitwise(x) {
  return isSomeString(x) && Chars.bitwise.indexOf(x) >= 0;
};
var isComparison = function isComparison(x) {
  return isSomeString(x) && Chars.comparison.indexOf(x) >= 0;
};
var isWhitespace = function isWhitespace(x) {
  return isSomeString(x) && x.match(/^\s+$/) !== null;
};
var isMath = function isMath(x) {
  return isArithmatic(x) || isLogic(x) || isBitwise(x) || isComparison(x);
};
var isLetter = isAlpha;
var _stringify = function stringify(x) {
  var ch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '"';
  return "".concat(ch).concat(x).concat(ch);
};
var unString = function unString(x) {
  var result = "";
  if (isSomeString(x)) {
    if (['"', "'", "`"].indexOf(x[0]) >= 0) {
      result = x.substr(1);
    }
    if (result.length && ['"', "'", "`"].indexOf(result[result.length - 1]) >= 0) {
      result = result.substr(0, result.length - 1);
    }
  }
  return result;
};
var pascalCase = function pascalCase(x) {
  return isSomeString(x) ? x.match(/[a-z]+/gi).map(function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
  }).join("") : "";
};
var camelCase = function camelCase(x) {
  return isSomeString(x) ? x.match(/[a-z]+/gi).map(function (word, i) {
    return (i == 0 ? word.charAt(0).toLowerCase() : word.charAt(0).toUpperCase()) + word.substr(1);
  }).join("") : "";
};
var _capitalize = function capitalize(str) {
  var result = str;
  if (isSomeString(str)) {
    var arr = [];
    var inWord = false;
    var _iterator2 = _createForOfIteratorHelper(str),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var ch = _step2.value;
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
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    result = arr.join("");
  }
  return result;
};
var toggleCase = function toggleCase(x) {
  var result = new StringBuilder();
  if (isSomeString(x)) {
    for (var i = 0; i < x.length; i++) {
      var code = x.charCodeAt(i);
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
var changeCase = toggleCase;
var left = function left(x, n) {
  return isSomeString(x) ? x.substr(0, n) : "";
};
var right = function right(x, n) {
  return isSomeString(x) ? x.length > n ? x.substr(x.length - n, n) : x : "";
};
var StringTransformations = {
  free: function free(x) {
    return x.trim();
  },
  trim: function trim(x) {
    return x.trim();
  },
  ltrim: function ltrim(x) {
    return _ltrim(x);
  },
  rtrim: function rtrim(x) {
    return _rtrim(x);
  },
  upper: function upper(x) {
    return x.toUpperCase();
  },
  lower: function lower(x) {
    return x.toLowerCase();
  },
  camel: function camel(x) {
    return camelCase(x);
  },
  camelcase: function camelcase(x) {
    return camelCase(x);
  },
  pascal: function pascal(x) {
    return pascalCase(x);
  },
  pascalcase: function pascalcase(x) {
    return pascalCase(x);
  },
  toggle: function toggle(x) {
    return toggleCase(x);
  },
  togglecase: function togglecase(x) {
    return toggleCase(x);
  },
  changecase: function changecase(x) {
    return toggleCase(x);
  },
  capitalize: function capitalize(x) {
    return _capitalize(x);
  },
  reverse: function reverse(x) {
    return _reverse(x);
  },
  stringify: function stringify(x) {
    return _stringify(x);
  },
  unstring: function unstring(x) {
    return unString(x);
  },
  htmlencode: function htmlencode(x, ignoreList) {
    return htmlEncode(x, ignoreList);
  },
  htmldecode: function htmldecode(x, ignoreList) {
    return htmlDecode(x, ignoreList);
  },
  urlencode: function urlencode(x, full) {
    return full ? encodeURIComponent(x) : encodeURI(x);
  },
  urldecode: function urldecode(x, full) {
    return full ? decodeURIComponent(x) : decodeURI(x);
  },
  isValid: function isValid(transform) {
    return isFunction(this[transform]);
  }
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
var _singleTransform = function _singleTransform(str, transformType) {
  var result = str;
  if (isFunction(transformType)) {
    result = transformType(str);
  } else {
    var transform = StringTransformations[transformType];
    if (isFunction(transform)) {
      result = transform(str);
    }
  }
  return result;
};
var _transform = function _transform(str, transArray) {
  var result = str;
  transArray.forEach(function (transformType) {
    result = _singleTransform(result, transformType);
  });
  return result;
};
var xsplit = function xsplit(str, separator) {
  var result = [];
  if (isSomeString(str)) {
    var _transforms = [];
    var _finalTransforms = [];
    for (var _len = arguments.length, transforms = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      transforms[_key - 2] = arguments[_key];
    }
    for (var _i = 0, _transforms2 = transforms; _i < _transforms2.length; _i++) {
      var item = _transforms2[_i];
      if (isArray(item)) {
        var _iterator3 = _createForOfIteratorHelper(item),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var subItem = _step3.value;
            _transforms.push(subItem);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      } else if (isSomeString(item)) {
        var temp = xsplit(item, ",", SplitOptions.trimToLowerAndRemoveEmpties);
        var _iterator4 = _createForOfIteratorHelper(temp),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _subItem = _step4.value;
            _transforms.push(_subItem);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      } else if (isNumeric(item)) {
        _transforms.push(item);
      } else if (isFunction(item)) {
        _transforms.push(item);
      }
    }
    for (var _i2 = 0, _transforms3 = _transforms; _i2 < _transforms3.length; _i2++) {
      var transform = _transforms3[_i2];
      if (SplitOptions.isValid(transform)) {
        var transformValue = SplitOptions.getNumber(transform);
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
    var arr = str.split(separator);
    if (_finalTransforms.length) {
      var i = 0;
      while (i < arr.length) {
        var _item = arr[i++];
        _item = _transform(_item, _finalTransforms);
        if ((_finalTransforms[_finalTransforms.length - 1] == "free" || _finalTransforms[_finalTransforms.length - 1] == "f") && (!_item || _item.length == 0)) {
          continue;
        }
        result.push(_item);
      }
    } else {
      result = arr;
    }
  }
  return result;
};
function _nsplit(s, separators, callback, level) {
  var result = s.split(separators[0]);
  if (separators.length > 1) {
    for (var i = 0; i < result.length; i++) {
      result[i] = _nsplit(result[i], separators.slice(1), callback, level + 1);
    }
  } else if (isFunction(callback)) {
    for (var _i3 = 0; _i3 < result.length; _i3++) {
      result[_i3] = callback({
        input: s,
        value: result[_i3],
        index: _i3,
        level: level,
        separator: separators[0]
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
var format = function format(str) {
  var result = [];
  var _args;
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  if (args.length == 1) {
    _args = args[0];
  } else {
    _args = args;
  }
  if (isSomeString(str) && args.length) {
    var i = 0;
    var state = 0;
    var temp = "";
    while (i < str.length) {
      var ch = str[i];
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
              throw "Invalid character '".concat(ch, "' in interpolation.");
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
      throw "Unterminated interpolation detected at the end of input.";
    }
    if (temp.length) {
      result.push(temp);
    }
    var interpolations = {};
    for (i = 0; i < result.length; i++) {
      if (isArray(result[i])) {
        var fArgs = {
          source: str,
          part: i,
          args: args
        };
        var key = result[i][0];
        var isArrayKey = key[0] == "[" && key[key.length - 1] == "]";
        if (interpolations[key] == undefined) {
          if (isFunction(_args)) {
            if (isArrayKey) {
              interpolations[key] = _args(_objectSpread(_objectSpread({}, fArgs), {}, {
                index: key.substr(1, key.length - 2),
                key: key.substr(1, key.length - 2)
              }));
            } else {
              interpolations[key] = _args(_objectSpread(_objectSpread({}, fArgs), {}, {
                index: key,
                key: key
              }));
            }
          } else {
            interpolations[key] = query(_args, key);
          }
          if (isFunction(interpolations[key])) {
            interpolations[key] = interpolations[key](_objectSpread(_objectSpread({}, fArgs), {}, {
              key: key
            }));
          }
        }
        result[i] = interpolations[key];
        if (result[i] === undefined) {
          if (isArrayKey) {
            result[i] = "{" + key.substr(1, key.length - 2) + "}";
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
function configureStringExtensions(options) {
  var extendAsStaticMethods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var eh = new ExtensionHelper(options, console);
  eh.extend(String, "replaceAll", function (find, replace) {
    return replaceAll(this, find, replace);
  });
  eh.extend(String, "reverse", function () {
    return _reverse(this);
  });
  eh.extend(String, "ltrim", function () {
    return _ltrim(this);
  });
  eh.extend(String, "rtrim", function () {
    return _rtrim(this);
  });
  eh.extend(String, "toArray", function () {
    return toArray(this);
  });
  eh.extend(String, "toBytes", function () {
    return toBytes(this);
  });
  eh.extend(String, "format", function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return format.apply(void 0, [this].concat(args));
  });
  eh.extend(String, "isCharacter", function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return isCharacter.apply(void 0, [this].concat(args));
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
    return _stringify(this, ch);
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
    return _capitalize(this);
  });
  eh.extend(String, "left", function (n) {
    return left(this, n);
  });
  eh.extend(String, "right", function (n) {
    return right(this, n);
  });
  eh.extend(String, "xsplit", function () {
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    return xsplit.apply(void 0, [this].concat(args));
  });
  eh.extend(String, "nsplit", function () {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    return nsplit.apply(void 0, [this].concat(args));
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
    eh.extend(String, "reverse", _reverse, true);
    eh.extend(String, "ltrim", _ltrim, true);
    eh.extend(String, "rtrim", _rtrim, true);
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
    eh.extend(String, "stringify", _stringify, true);
    eh.extend(String, "toggleCase", toggleCase, true);
    eh.extend(String, "changeCase", changeCase, true);
    eh.extend(String, "unString", unString, true);
    eh.extend(String, "pascalCase", pascalCase, true);
    eh.extend(String, "camelCase", camelCase, true);
    eh.extend(String, "capitalize", _capitalize, true);
    eh.extend(String, "left", left, true);
    eh.extend(String, "right", right, true);
    eh.extend(String, "format", format, true);
    eh.extend(String, "xsplit", xsplit, true);
    eh.extend(String, "nsplit", nsplit, true);
  }
}
export default configureStringExtensions;
export { StringBuilder, SplitOptions, Chars, StringTransformations, replaceAll, _reverse as reverse, _ltrim as ltrim, _rtrim as rtrim, left, right, toArray, fromArray, toBytes, fromBytes, isCharacter, isPunctuation, isControl, isAlpha, isLower, isUpper, isDigit, isAlphaNum, isWord, isArithmatic, isLogic, isBitwise, isComparison, isWhitespace, isMath, isLetter, toggleCase, changeCase, pascalCase, camelCase, _capitalize as capitalize, _stringify as stringify, unString, format, xsplit, nsplit };
