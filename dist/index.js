'use strict';

var base = require('@locustjs/base');
var _enum = require('@locustjs/enum');
var htmlencode = require('@locustjs/htmlencode');
var ExtensionHelper = require('@locustjs/extensions-options');

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var StringBuilder = /*#__PURE__*/function () {
  function StringBuilder(bufferSize) {
    _classCallCheck(this, StringBuilder);
    this.bufferSize = base.isNumeric(bufferSize) ? parseInt(bufferSize) || 32 : 32;
    if (isNaN(this.bufferSize)) {
      this.bufferSize = 32;
    }
    this.clear();
  }
  return _createClass(StringBuilder, [{
    key: "clear",
    value: function clear() {
      this._buffer = new Array(this.bufferSize);
      this._last = 0;
      this._length = 0;
    }
  }, {
    key: "append",
    value: function append(x) {
      var item = (x || "").toString();
      this._buffer[this._last] = item;
      this._length += item.length;
      this._last++;
      if (this._last == this.bufferSize) {
        var _this$_buffer;
        (_this$_buffer = this._buffer).splice.apply(_this$_buffer, [this.bufferSize].concat(_toConsumableArray(new Array(this.bufferSize))));
      }
      return this._last - 1;
    }
  }, {
    key: "appendAt",
    value: function appendAt(index, x) {
      if (index < 0 || index > this._last) {
        throw "index ".concat(index, " is out of range");
      }
      var item = (x || "").toString();
      this._buffer.splice(index, 0, item);
      this._length += item.length;
      this._last++;
      if (this._last == this.bufferSize) {
        var _this$_buffer2;
        (_this$_buffer2 = this._buffer).splice.apply(_this$_buffer2, [this.bufferSize].concat(_toConsumableArray(new Array(this.bufferSize))));
      }
      return this._last - 1;
    }
  }, {
    key: "replaceAt",
    value: function replaceAt(index, x) {
      if (index < 0 || index >= this._last) {
        throw "index ".concat(index, " is out of range");
      }
      var prev = this._buffer[index];
      var item = (x || "").toString();
      this._buffer[index] = item;
      this._length += item.length - prev.length;
    }
  }, {
    key: "itemAt",
    value: function itemAt(index) {
      if (index < 0 || index >= this._last) {
        throw "index ".concat(index, " is out of range");
      }
      var item = this._buffer[index];
      return item;
    }
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      if (index < 0 || index >= this._last) {
        throw "index ".concat(index, " is out of range");
      }
      if (count < 0) {
        throw "count should be greater than 0";
      }
      if (index + count > this._last) {
        throw "exceeding count. cannot remove ".concat(count, " items from internal buffer");
      }
      var items = this._buffer.splice(index, count);
      this._length -= items.join("").length;
      this._last -= count;
    }
  }, {
    key: "length",
    get: function get() {
      return this._length;
    }
  }, {
    key: "count",
    get: function get() {
      return this._last;
    }
  }, {
    key: "toString",
    value: function toString() {
      var result = this._buffer.join("");
      this.clear();
      return result;
    }
  }, {
    key: "checkRange",
    value: function checkRange(from, to) {
      if (base.isNullOrUndefined(from)) {
        from = 0;
      }
      if (base.isNullOrUndefined(to)) {
        to = this._last;
      }
      var reverse = false;
      if (from > to) {
        var temp = from;
        from = to;
        to = temp;
        reverse = true;
      }
      if (from < 0 || from >= this._last) {
        throw "from index (".concat(from, ") is out of range");
      }
      if (to < 0 || to > this._last) {
        throw "to index (".concat(to, ") is out of range");
      }
      return {
        from: from,
        to: to,
        reverse: reverse
      };
    }
  }, {
    key: "getRange",
    value: function getRange(from, to) {
      var _this$checkRange = this.checkRange(from, to),
        _from = _this$checkRange.from,
        _to = _this$checkRange.to,
        reverse = _this$checkRange.reverse;
      var arr = this._buffer.filter(function (x, i) {
        return i >= _from && i < _to;
      });
      if (reverse) {
        arr = arr.reverse();
      }
      return arr;
    }
  }, {
    key: "getString",
    value: function getString(from, to) {
      var arr = this.getRange(from, to);
      var result = arr.join("");
      return result;
    }
  }, {
    key: "toLower",
    value: function toLower(from, to) {
      var _this$checkRange2 = this.checkRange(from, to),
        _from = _this$checkRange2.from,
        _to = _this$checkRange2.to;
      for (var i = _from; i < _to; i++) {
        this._buffer[i] = this._buffer[i].toLowerCase();
      }
    }
  }, {
    key: "toUpper",
    value: function toUpper(from, to) {
      var _this$checkRange3 = this.checkRange(from, to),
        _from = _this$checkRange3.from,
        _to = _this$checkRange3.to;
      for (var i = _from; i < _to; i++) {
        this._buffer[i] = this._buffer[i].toUpperCase();
      }
    }
  }, {
    key: "trim",
    value: function trim(from, to) {
      var _this$checkRange4 = this.checkRange(from, to),
        _from = _this$checkRange4.from,
        _to = _this$checkRange4.to;
      for (var i = _from; i < _to; i++) {
        this._buffer[i] = this._buffer[i].trim();
      }
    }
  }]);
}();

var SplitOptions = _enum.Enum.define({
  none: 0,
  removeEmpties: 1,
  trim: 2,
  trimAndRemoveEmpties: 3,
  toLower: 4,
  trimToLowerAndRemoveEmpties: 5,
  toUpper: 6,
  trimToUpperAndRemoveEmpties: 7
}, "SplitOptions");

var replaceAll = function replaceAll(source, find, replace) {
  return source.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), replace);
};

var reverse = function reverse(x) {
  return base.isSomeString(x) ? x.split("").reverse().join("") : "";
};

var ltrim = function ltrim(x) {
  return base.isSomeString(x) ? x.trimLeft() : "";
};
var rtrim = function rtrim(x) {
  return base.isSomeString(x) ? x.trimRight() : "";
};

var fromArray = function fromArray(arr) {
  var result = new StringBuilder();
  if (base.isArray(arr)) {
    var _iterator = _createForOfIteratorHelper(arr),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        if (base.isNumeric(item)) {
          result.append(String.fromCharCode(item));
        } else if (base.isString(item)) {
          result.append(item);
        } else if (!base.isNullOrUndefined(item)) {
          result.append(item.toString());
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

var toArray = function toArray(x) {
  var result = [];
  if (base.isSomeString(x)) {
    for (var i = 0; i < x.length; i++) {
      result.push(x.charCodeAt(i));
    }
  }
  return result;
};

var utf8Decoder = new TextDecoder();
var fromBytes = function fromBytes(x) {
  if (x instanceof Uint8Array) {
    return utf8Decoder.decode(x);
  } else if (base.isArray(x)) {
    return utf8Decoder.decode(new Uint8Array(x));
  } else {
    return "";
  }
};

var utf8Encoder = new TextEncoder();
var toBytes = function toBytes(x) {
  return base.isSomeString(x) ? utf8Encoder.encode(x) : new Uint8Array();
};

var Chars = {
  punctuation: [".", ",", ";", ":", "?", "!", "(", ")", "-", "'", '"', "/", "\\", "{", "}", "[", "]", "%", "#"],
  control: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "|", "<", ">", "?", ":", "{", "}", "[", "]", ";", '"', "'", ",", ".", "/", "-", "=", "\\", "`"],
  arithmatic: ["/", "\\", "+", "-", "(", ")", "%", "^", "*", "++", "--", "*=", "/=", "+=", "-="],
  logic: ["&&", "||", "!", "&=", "|="],
  bitwise: ["&", "|", ">>", "<<"],
  comparison: ["==", "!=", "<>", ">", "<", ">=", "<=", "===", "!=="]
};
var isChar = function isChar(x) {
  return base.isString(x) && x.length == 1;
};
var isPunctuation = function isPunctuation(x) {
  return base.isSomeString(x) && Chars.punctuation.indexOf(x) >= 0;
};
var isControl = function isControl(x) {
  return base.isSomeString(x) && Chars.control.indexOf(x) >= 0;
};
var isAlpha = function isAlpha(x) {
  return base.isSomeString(x) && x.match(/^[a-z]+$/i) !== null;
};
var isLower = function isLower(x) {
  return base.isSomeString(x) && x.match(/^[a-z]+$/) !== null;
};
var isUpper = function isUpper(x) {
  return base.isSomeString(x) && x.match(/^[A-Z]+$/) !== null;
};
var isDigit = function isDigit(x) {
  return base.isSomeString(x) && x.match(/^[0-9]+$/) !== null;
};
var isAlphaNum = function isAlphaNum(x) {
  return base.isSomeString(x) && x.match(/^[a-z0-9]+$/i) !== null;
};
var isWord = function isWord(x) {
  return base.isSomeString(x) && x.match(/^\w+$/i) !== null;
};
var isArithmatic = function isArithmatic(x) {
  return base.isSomeString(x) && Chars.arithmatic.indexOf(x) >= 0;
};
var isLogic = function isLogic(x) {
  return base.isSomeString(x) && Chars.logic.indexOf(x) >= 0;
};
var isBitwise = function isBitwise(x) {
  return base.isSomeString(x) && Chars.bitwise.indexOf(x) >= 0;
};
var isComparison = function isComparison(x) {
  return base.isSomeString(x) && Chars.comparison.indexOf(x) >= 0;
};
var isWhitespace = function isWhitespace(x) {
  return base.isSomeString(x) && x.match(/^\s+$/) !== null;
};
var isMath = function isMath(x) {
  return isArithmatic(x) || isLogic(x) || isBitwise(x) || isComparison(x);
};
var isLetter = isAlpha;

var format = function format(str) {
  var result = [];
  var _args;
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (args.length == 1) {
    _args = args[0];
  } else {
    _args = args;
  }
  if (base.isSomeString(str)) {
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
            if (args.length) {
              if (temp) {
                if (base.isNumeric(temp)) {
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
    if (args.length) {
      var interpolations = {};
      for (i = 0; i < result.length; i++) {
        if (base.isArray(result[i])) {
          var fArgs = {
            source: str,
            part: i,
            args: args
          };
          var key = result[i][0];
          var isArrayKey = key[0] == "[" && key[key.length - 1] == "]";
          var arrayKeyIndex = isArrayKey ? key.substr(1, key.length - 2) : -1;
          if (interpolations[key] == undefined) {
            if (base.isFunction(_args)) {
              if (isArrayKey) {
                interpolations[key] = _args(_objectSpread2(_objectSpread2({}, fArgs), {}, {
                  index: arrayKeyIndex,
                  key: arrayKeyIndex
                }));
              } else {
                interpolations[key] = _args(_objectSpread2(_objectSpread2({}, fArgs), {}, {
                  index: key,
                  key: key
                }));
              }
            } else {
              if (base.isPrimitive(_args)) {
                interpolations[key] = base.query([_args], key);
              } else {
                interpolations[key] = base.query(_args, key);
              }
            }
            if (base.isFunction(interpolations[key])) {
              interpolations[key] = interpolations[key](_objectSpread2(_objectSpread2({}, fArgs), {}, {
                key: key
              }));
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

var stringify = function stringify(x) {
  var ch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '"';
  return "".concat(ch).concat(x).concat(ch);
};

var toggleCase = function toggleCase(x) {
  var result = new StringBuilder();
  if (base.isSomeString(x)) {
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

var unString = function unString(x) {
  var result = "";
  if (base.isSomeString(x)) {
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
  var replacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var i = 0;
  return base.isSomeString(x) ? base.isString(replacer) ? x.match(/[a-z]+/gi).map(function (word) {
    return (i++ > 0 ? replacer || "" : "") + word.charAt(0).toUpperCase() + word.substr(1);
  }).join("") : x.replace(/[a-z]+/gi, function (match) {
    return match[0].toUpperCase() + match.substr(1).toLowerCase();
  }) : "";
};

var camelCase = function camelCase(x) {
  var replacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var i = 0;
  return base.isSomeString(x) ? base.isString(replacer) ? x.match(/[a-z]+/gi).map(function (word, i) {
    return (i > 0 ? replacer || "" : "") + (i == 0 ? word.charAt(0).toLowerCase() : word.charAt(0).toUpperCase()) + word.substr(1);
  }).join("") : x.replace(/[a-z]+/gi, function (match) {
    if (i++ == 0) {
      return match.toLowerCase();
    } else {
      return match[0].toUpperCase() + match.substr(1).toLowerCase();
    }
  }) : "";
};

var capitalize = function capitalize(str) {
  var result = str;
  if (base.isSomeString(str)) {
    var arr = [];
    var inWord = false;
    var _iterator = _createForOfIteratorHelper(str),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var ch = _step.value;
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
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    result = arr.join("");
  }
  return result;
};

var left = function left(x, n) {
  return base.isSomeString(x) ? x.substr(0, n) : "";
};
var right = function right(x, n) {
  return base.isSomeString(x) ? x.length > n ? x.substr(x.length - n, n) : x : "";
};

var StringTransformations = {
  free: function free(x) {
    return x.trim();
  },
  trim: function trim(x) {
    return x.trim();
  },
  ltrim: function ltrim$1(x) {
    return ltrim(x);
  },
  rtrim: function rtrim$1(x) {
    return rtrim(x);
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
  capitalize: function capitalize$1(x) {
    return capitalize(x);
  },
  reverse: function reverse$1(x) {
    return reverse(x);
  },
  stringify: function stringify$1(x) {
    return stringify(x);
  },
  unstring: function unstring(x) {
    return unString(x);
  },
  htmlencode: function htmlencode$1(x, ignoreList) {
    return htmlencode.htmlEncode(x, ignoreList);
  },
  htmldecode: function htmldecode(x, ignoreList) {
    return htmlencode.htmlDecode(x, ignoreList);
  },
  urlencode: function urlencode(x, full) {
    return full ? encodeURIComponent(x) : encodeURI(x);
  },
  urldecode: function urldecode(x, full) {
    return full ? decodeURIComponent(x) : decodeURI(x);
  },
  isValid: function isValid(transform) {
    return base.isFunction(this[transform]);
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
  if (base.isFunction(transformType)) {
    result = transformType(str);
  } else {
    var transform = StringTransformations[transformType];
    if (base.isFunction(transform)) {
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
var _xsplit = function xsplit(str, separator) {
  var result = [];
  if (base.isSomeString(str)) {
    for (var _len = arguments.length, transforms = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      transforms[_key - 2] = arguments[_key];
    }
    var trans = [].concat(transforms);
    var limit;
    if (trans.length && base.isNumeric(trans[0])) {
      limit = trans[0];
      trans.splice(0, 1);
    }
    var _transforms = [];
    var _finalTransforms = [];
    var _iterator = _createForOfIteratorHelper(trans),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _item = _step.value;
        if (base.isArray(_item)) {
          var _iterator2 = _createForOfIteratorHelper(_item),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var subItem = _step2.value;
              _transforms.push(subItem);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        } else if (base.isSomeString(_item)) {
          var temp = _xsplit(_item, ",", SplitOptions.trimToLowerAndRemoveEmpties);
          var _iterator3 = _createForOfIteratorHelper(temp),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _subItem = _step3.value;
              _transforms.push(_subItem);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else if (base.isNumeric(_item)) {
          _transforms.push(_item);
        } else if (base.isFunction(_item)) {
          _transforms.push(_item);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    for (var _i = 0, _transforms2 = _transforms; _i < _transforms2.length; _i++) {
      var transform = _transforms2[_i];
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
    var arr = str.split(separator, limit);
    if (_finalTransforms.length) {
      var i = 0;
      while (i < arr.length) {
        var item = arr[i++];
        item = _transform(item, _finalTransforms);
        if ((_finalTransforms[_finalTransforms.length - 1] == "free" || _finalTransforms[_finalTransforms.length - 1] == "f") && (!item || item.length == 0)) {
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

function _nsplit(s, separators, callback, level, limit) {
  var result = s.split(separators[0], limit);
  if (separators.length > 1) {
    for (var i = 0; i < result.length; i++) {
      result[i] = _nsplit(result[i], separators.slice(1), callback, level + 1, limit);
    }
  } else if (base.isFunction(callback)) {
    for (var _i = 0; _i < result.length; _i++) {
      result[_i] = callback({
        input: s,
        value: result[_i],
        index: _i,
        level: level,
        separator: separators[0]
      });
    }
  }
  return result;
}
function nsplit(s, separators, callback, limit) {
  if (base.isSomeString(s) && base.isSomeArray(separators)) {
    return _nsplit(s, separators, callback, 0, limit);
  }
  return [];
}

var changeCase = toggleCase;
function configureStringExtensions(options, logger) {
  var eh = new ExtensionHelper(options, logger);
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
  eh.extend(String, "format", function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return format.apply(void 0, [this].concat(args));
  });
  eh.extend(String, "isChar", function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return isChar.apply(void 0, [this].concat(args));
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
  eh.extend(String, "xsplit", function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return _xsplit.apply(void 0, [this].concat(args));
  });
  eh.extend(String, "nsplit", function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return nsplit.apply(void 0, [this].concat(args));
  });
  var _split = String.prototype.split;
  if (eh.shouldExtend("split")) {
    var _fn = function _fn() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      if (args.length <= 1 || args.length == 2 && base.isString(args[0]) && (base.isNumeric(args[1]) || base.isNullOrUndefined(args[1]))) {
        return _split.call.apply(_split, [this].concat(args));
      }
      var separators = args.length ? args[0] : undefined;
      var limit = args.length > 1 ? args[1] : undefined;
      var callback = args.length > 2 ? args[2] : undefined;
      var trans = args.length > 3 ? args.slice(3) : [];
      if (base.isArray(separators)) {
        return nsplit(this, separators, callback, limit);
      }
      trans = [callback].concat(_toConsumableArray(trans));
      if (base.isNullOrUndefined(callback)) {
        trans.splice(1);
      }
      return _xsplit.apply(void 0, [this, separators, limit].concat(_toConsumableArray(trans)));
    };
    String.prototype.split = _fn;
    eh._log("String.prototype.split extended.");
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
  eh.extend(String, "xsplit", _xsplit, true);
  eh.extend(String, "nsplit", nsplit, true);
}

exports.Chars = Chars;
exports.SplitOptions = SplitOptions;
exports.StringBuilder = StringBuilder;
exports.StringTransformations = StringTransformations;
exports.camelCase = camelCase;
exports.capitalize = capitalize;
exports.changeCase = changeCase;
exports.configureStringExtensions = configureStringExtensions;
exports.format = format;
exports.fromArray = fromArray;
exports.fromBytes = fromBytes;
exports.isAlpha = isAlpha;
exports.isAlphaNum = isAlphaNum;
exports.isArithmatic = isArithmatic;
exports.isBitwise = isBitwise;
exports.isChar = isChar;
exports.isComparison = isComparison;
exports.isControl = isControl;
exports.isDigit = isDigit;
exports.isLetter = isLetter;
exports.isLogic = isLogic;
exports.isLower = isLower;
exports.isMath = isMath;
exports.isPunctuation = isPunctuation;
exports.isUpper = isUpper;
exports.isWhitespace = isWhitespace;
exports.isWord = isWord;
exports.left = left;
exports.ltrim = ltrim;
exports.nsplit = nsplit;
exports.pascalCase = pascalCase;
exports.replaceAll = replaceAll;
exports.reverse = reverse;
exports.right = right;
exports.rtrim = rtrim;
exports.stringify = stringify;
exports.toArray = toArray;
exports.toBytes = toBytes;
exports.toggleCase = toggleCase;
exports.unString = unString;
exports.xsplit = _xsplit;
