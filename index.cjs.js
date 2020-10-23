"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nestedSplit = exports.transplit = exports.format = exports.stringTransforms = exports.right = exports.left = exports.isLetter = exports.capitalize = exports.camelCase = exports.pascalCase = exports.unString = exports.toggleCase = exports.stringify = exports.isMath = exports.isWhitespace = exports.isComparison = exports.isBitwise = exports.isLogic = exports.isArithmatic = exports.isWord = exports.isAlphaNum = exports.isDigit = exports.isUpper = exports.isLower = exports.isAlpha = exports.isControl = exports.isPunctuation = exports.isChar = exports.Chars = exports.toBytes = exports.rtrim = exports.ltrim = exports.reverse = exports.replaceAll = exports.SplitOptions = exports.default = void 0;

var _locustjsBase = require("locustjs-base");

var _locustjsEnum = _interopRequireDefault(require("locustjs-enum"));

var _locustjsExtensionsOptions = require("locustjs-extensions-options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var SplitOptions = _locustjsEnum.default.define({
  none: 0,
  removeEmpties: 1,
  trim: 2,
  trimAndRemoveEmpties: 3,
  toLower: 4,
  trimToLowerAndRemoveEmpties: 5,
  toUpper: 6,
  trimToUpperAndRemoveEmpties: 7
}, 'SplitOptions');

exports.SplitOptions = SplitOptions;

var replaceAll = function replaceAll(source, find, replace) {
  return source.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

exports.replaceAll = replaceAll;

var _reverse = function reverse(x) {
  return (0, _locustjsBase.isSomeString)(x) ? x.split('').reverse().join('') : '';
};

exports.reverse = _reverse;

var _ltrim = function ltrim(x) {
  return (0, _locustjsBase.isSomeString)(x) ? x.trimLeft() : '';
};

exports.ltrim = _ltrim;

var _rtrim = function rtrim(x) {
  return (0, _locustjsBase.isSomeString)(x) ? x.trimRight() : '';
};

exports.rtrim = _rtrim;

var toBytes = function toBytes(x) {
  var data = [];

  if ((0, _locustjsBase.isSomeString)(x)) {
    for (var i = 0; i < x.length; i++) {
      data.push(x.charCodeAt(i));
    }
  }

  return data;
};

exports.toBytes = toBytes;
var Chars = {
  punctuation: ['.', ',', ';', ':', '?', '!', '(', ')', '-', "'", '"', '/', '\\', '{', '}', '[', ']', '%', '#'],
  control: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '|', '<', '>', '?', ':', '{', '}', '[', ']', ';', '"', "'", ',', '.', '/', '-', '=', '\\', '`'],
  arithmatic: ['/', '\\', '+', '-', '(', ')', '%', '^', '*', '++', '--'],
  logic: ['&&', '||', '!'],
  bitwise: ['&', '|', '>>', '<<'],
  comparison: ['==', '!=', '<>', '>', '<', '>=', '<=', '===', '!==']
};
exports.Chars = Chars;

var isChar = function isChar(x) {
  return (0, _locustjsBase.isString)(x) && x.length == 1;
};

exports.isChar = isChar;

var isPunctuation = function isPunctuation(x) {
  return (0, _locustjsBase.isSomeString)(x) && Chars.punctuation.indexOf(x) >= 0;
};

exports.isPunctuation = isPunctuation;

var isControl = function isControl(x) {
  return (0, _locustjsBase.isSomeString)(x) && Chars.control.indexOf(x) >= 0;
};

exports.isControl = isControl;

var isAlpha = function isAlpha(x) {
  return (0, _locustjsBase.isSomeString)(x) && x.match(/^[a-z]+$/i) !== null;
};

exports.isAlpha = isAlpha;

var isLower = function isLower(x) {
  return (0, _locustjsBase.isSomeString)(x) && x.match(/^[a-z]+$/) !== null;
};

exports.isLower = isLower;

var isUpper = function isUpper(x) {
  return (0, _locustjsBase.isSomeString)(x) && x.match(/^[A-Z]+$/) !== null;
};

exports.isUpper = isUpper;

var isDigit = function isDigit(x) {
  return (0, _locustjsBase.isSomeString)(x) && x.match(/^[0-9]+$/) !== null;
};

exports.isDigit = isDigit;

var isAlphaNum = function isAlphaNum(x) {
  return (0, _locustjsBase.isSomeString)(x) && x.match(/^[a-z0-9]+$/i) !== null;
};

exports.isAlphaNum = isAlphaNum;

var isWord = function isWord(x) {
  return (0, _locustjsBase.isSomeString)(x) && x.match(/^\w+$/i) !== null;
};

exports.isWord = isWord;

var isArithmatic = function isArithmatic(x) {
  return (0, _locustjsBase.isSomeString)(x) && Chars.arithmatic.indexOf(x) >= 0;
};

exports.isArithmatic = isArithmatic;

var isLogic = function isLogic(x) {
  return (0, _locustjsBase.isSomeString)(x) && Chars.logic.indexOf(x) >= 0;
};

exports.isLogic = isLogic;

var isBitwise = function isBitwise(x) {
  return (0, _locustjsBase.isSomeString)(x) && Chars.bitwise.indexOf(x) >= 0;
};

exports.isBitwise = isBitwise;

var isComparison = function isComparison(x) {
  return (0, _locustjsBase.isSomeString)(x) && Chars.comparison.indexOf(x) >= 0;
};

exports.isComparison = isComparison;

var isWhitespace = function isWhitespace(x) {
  return (0, _locustjsBase.isSomeString)(x) && x.match(/^\s+$/) !== null;
};

exports.isWhitespace = isWhitespace;

var isMath = function isMath(x) {
  return isArithmatic(x) || isLogic(x) || isBitwise(x) || isComparison(x);
};

exports.isMath = isMath;

var _stringify = function stringify(x) {
  var ch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '"';
  return ch + x + ch;
};

exports.stringify = _stringify;

var toggleCase = function toggleCase(x) {
  var result = '';

  if ((0, _locustjsBase.isSomeString)(x)) {
    for (var i = 0; i < x.length; i++) {
      var code = x.charCodeAt(i);

      if (code >= 65 && x <= 90) {
        result += String.fromCharCode(code + 32);
        continue;
      }

      if (code >= 97 && x <= 122) {
        result += String.fromCharCode(code - 32);
        continue;
      }
    }
  }

  return result;
};

exports.toggleCase = toggleCase;

var unString = function unString(x) {
  var result = '';

  if ((0, _locustjsBase.isSomeString)(x)) {
    if (['"', "'", '`'].indexOf(x[0]) >= 0) {
      result = x.substr(1);
    }

    if (result.length && ['"', "'", '`'].indexOf(result[result.length - 1]) >= 0) {
      result = result.substr(0, result.length - 1);
    }
  }

  return result;
};

exports.unString = unString;

var pascalCase = function pascalCase(x) {
  return (0, _locustjsBase.isSomeString)(x) ? x.match(/[a-z]+/gi).map(function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1);
  }).join('') : '';
};

exports.pascalCase = pascalCase;

var camelCase = function camelCase(x) {
  return (0, _locustjsBase.isSomeString)(x) ? x.match(/[a-z]+/gi).map(function (word, i) {
    return (i == 0 ? word.charAt(0).toLowerCase() : word.charAt(0).toUpperCase()) + word.substr(1);
  }).join('') : '';
};

exports.camelCase = camelCase;

var _capitalize = function capitalize(str) {
  var result = str;

  if ((0, _locustjsBase.isSomeString)(str)) {
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

    result = arr.join('');
  }

  return result;
};

exports.capitalize = _capitalize;
var isLetter = isAlpha;
exports.isLetter = isLetter;

var left = function left(x, n) {
  return (0, _locustjsBase.isSomeString)(x) ? x.substr(0, n) : '';
};

exports.left = left;

var right = function right(x, n) {
  return (0, _locustjsBase.isSomeString)(x) ? x.length > n ? x.substr(x.length - n, n) : x : '';
};

exports.right = right;
var stringTransforms = {
  'free': function free(x) {
    return x.trim();
  },
  'trim': function trim(x) {
    return x.trim();
  },
  'ltrim': function ltrim(x) {
    return _ltrim(x);
  },
  'rtrim': function rtrim(x) {
    return _rtrim(x);
  },
  'upper': function upper(x) {
    return x.toUpperCase();
  },
  'lower': function lower(x) {
    return x.toLowerCase();
  },
  'camel': function camel(x) {
    return camelCase(x);
  },
  'camelcase': function camelcase(x) {
    return camelCase(x);
  },
  'pascal': function pascal(x) {
    return pascalCase(x);
  },
  'pascalcase': function pascalcase(x) {
    return pascalCase(x);
  },
  'toggle': function toggle(x) {
    return toggleCase(x);
  },
  'togglecase': function togglecase(x) {
    return toggleCase(x);
  },
  'capitalize': function capitalize(x) {
    return _capitalize(x);
  },
  'reverse': function reverse(x) {
    return _reverse(x);
  },
  'stringify': function stringify(x) {
    return _stringify(x);
  },
  'unstring': function unstring(x) {
    return unString(x);
  },
  isValid: function isValid(transform) {
    return (0, _locustjsBase.isFunction)(this[transform]);
  }
};
exports.stringTransforms = stringTransforms;

var _singleTransform = function _singleTransform(str, transformType) {
  var result = str;

  if ((0, _locustjsBase.isFunction)(transformType)) {
    result = transformType(str);
  } else {
    var transform = stringTransforms[transformType];

    if (transform != undefined) {
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

var transplit = function transplit(str, separator) {
  var result = [];

  if ((0, _locustjsBase.isSomeString)(str)) {
    var _transforms = [];
    var _finalTransforms = [];

    for (var _len = arguments.length, transforms = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      transforms[_key - 2] = arguments[_key];
    }

    for (var _i = 0, _transforms2 = transforms; _i < _transforms2.length; _i++) {
      var item = _transforms2[_i];

      if ((0, _locustjsBase.isArray)(item)) {
        var _iterator2 = _createForOfIteratorHelper(item),
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
      } else if ((0, _locustjsBase.isSomeString)(item)) {
        if (item.indexOf(',') >= 0) {
          var temp = transplit(item, ',', SplitOptions.trimToLowerAndRemoveEmpties);

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
        } else {
          _transforms.push(item.trim().toLowerCase());
        }
      } else if ((0, _locustjsBase.isNumeric)(item)) {
        _transforms.push(item);
      } else if ((0, _locustjsBase.isFunction)(item)) {
        _transforms.push(item);
      }
    }

    for (var _i2 = 0, _transforms3 = _transforms; _i2 < _transforms3.length; _i2++) {
      var transform = _transforms3[_i2];

      if (SplitOptions.isValid(transform)) {
        var transformValue = SplitOptions.getNumber(transform);

        switch (transformValue) {
          case SplitOptions.removeEmpties:
            _finalTransforms.push('free');

            break;

          case SplitOptions.trim:
            _finalTransforms.push('trim');

            break;

          case SplitOptions.trimAndRemoveEmpties:
            _finalTransforms.push('trim');

            _finalTransforms.push('free');

            break;

          case SplitOptions.toLower:
            _finalTransforms.push('lower');

            break;

          case SplitOptions.trimToLowerAndRemoveEmpties:
            _finalTransforms.push('trim');

            _finalTransforms.push('lower');

            _finalTransforms.push('free');

            break;

          case SplitOptions.toUpper:
            _finalTransforms.push('upper');

            break;

          case SplitOptions.trimToUpperAndRemoveEmpties:
            _finalTransforms.push('trim');

            _finalTransforms.push('upper');

            _finalTransforms.push('free');

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

        if (_finalTransforms[_finalTransforms.length - 1] == 'free' && (!_item || _item.length == 0)) {
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

exports.transplit = transplit;

var nestedSplit = function nestedSplit(str) {
  var result = [];

  for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    rest[_key2 - 1] = arguments[_key2];
  }

  var separators = rest;
  var transforms = null;

  if (rest.length > 1) {
    transforms = rest[rest.length - 1];

    if ((0, _locustjsBase.isSomeString)(transforms) && transforms != ',' && transforms.indexOf(',') >= 0 || (0, _locustjsBase.isArray)(transforms)) {
      separators = rest.slice(0, rest.length - 1);
    } else {
      transforms = null;
    }
  }

  separators = separators.flat();

  function splitStringArray(arr, i) {
    var _result = [];

    if (i < separators.length) {
      for (var index in arr) {
        if ((0, _locustjsBase.isString)(arr[index])) {
          var tempArr = transplit(arr[index], separators[i], transforms);
          var tempItem = splitStringArray(tempArr, i + 1);

          _result.push(tempItem);
        }
      }
    } else {
      _result = arr;
    }

    return _result;
  }

  result = splitStringArray([str], 0)[0];
  return result;
};

exports.nestedSplit = nestedSplit;

var format = function format() {
  var s = arguments.length ? arguments[0] : '';
  var _args = [];

  if (arguments.length) {
    (0, _locustjsBase.forEach)(arguments, function (a) {
      if (a.index > 0) _args.push(a.value);
    });
  }

  function formatWithObject(prefix, obj) {
    (0, _locustjsBase.forEach)(obj, function (args) {
      var key = args.key;
      var i = args.index;
      var pv = args.value;

      if (pv == null) {
        pv = '';
      }

      if ((0, _locustjsBase.isObject)(pv)) {
        formatWithObject(prefix + key + '.', pv);
      } else {
        s = replaceAll(s, '{' + prefix + key + '}', pv);
      }
    });
  }

  if (_args.length > 0) {
    if (_args.length == 1) {
      var values = _args[0];

      if ((0, _locustjsBase.isArray)(values)) {
        var _i3 = 0;
        values.forEach(function (value) {
          var v = value == null ? '' : value;
          s = replaceAll(s, '{' + _i3 + '}', v);
          _i3++;
        });
      } else if ((0, _locustjsBase.isSomeObject)(values)) {
        (0, _locustjsBase.forEach)(values, function (args) {
          var key = args.key;
          var i = args.index;
          var pv = args.value;

          if (pv == null) {
            pv = '';
          }

          if ((0, _locustjsBase.isSomeObject)(pv)) {
            if ((0, _locustjsBase.isNumeric)(key)) {
              formatWithObject('', pv);
            } else {
              formatWithObject(key + '.', pv);
            }
          } else {
            s = replaceAll(s, '{' + key + '}', pv);
          }
        });
      } else {
        if (values == null) {
          values = '';
        }

        s = replaceAll(s, '{0}', values);
      }
    } else {
      s = s.replace(/{(\d+)}/g, function (match, number) {
        if (number >= 0 && number < _args.length) {
          var v = _args[number] == null ? '' : _args[number];
          return _args[number] != undefined ? v : match;
        } else {
          return match;
        }
      });
    }
  }

  var i = 0;
  var state = 0;
  var ex = '';
  var result = [];
  var temp = '';

  while (i < s.length) {
    var ch = s[i];

    switch (state) {
      case 0:
        if (ch == '{') {
          if (temp.length) {
            result.push(temp);
          }

          temp = '';
          state = 1;
        } else if (ch == '\\') {
          state = 2;
        } else {
          temp += ch;
        }

        break;

      case 1:
        if (ch == '}') {
          if (ex.trim()) {
            if (ex[0] == ':') {
              var e = format(ex.substr(1), _args);
              var exr = Function('return ' + e)();
              result.push(exr);
            } else {
              result.push('{' + ex + '}');
            }

            ex = '';
          }

          state = 0;
        } else {
          ex += ch;
        }

        break;

      case 2:
        if (ch == '{' || ch == '}') {
          result.push(ch);
        } else {
          result.push('\\' + ch);
        }

        state = 0;
        break;
    }

    i++;
  }

  if (temp.length) {
    result.push(temp);
  }

  return result.join('');
};

exports.format = format;

function configureStringExtensions(options) {
  var _options = (0, _locustjsExtensionsOptions.configureOptions)(options);

  if (!String.prototype.replaceAll || (0, _locustjsExtensionsOptions.shouldExtend)('replaceAll', _options)) {
    String.prototype.replaceAll = function (x) {
      return replaceAll(x);
    };
  }

  if (!String.prototype.reverse || (0, _locustjsExtensionsOptions.shouldExtend)('reverse', _options)) {
    String.prototype.reverse = function (x) {
      return _reverse(this);
    };
  }

  if (!String.prototype.ltrim || (0, _locustjsExtensionsOptions.shouldExtend)('ltrim', _options)) {
    String.prototype.ltrim = function () {
      return _ltrim(this);
    };
  }

  if (!String.prototype.rtrim || (0, _locustjsExtensionsOptions.shouldExtend)('rtrim', _options)) {
    String.prototype.rtrim = function () {
      return _rtrim(this);
    };
  }

  if (!String.prototype.toBytes || (0, _locustjsExtensionsOptions.shouldExtend)('toBytes', _options)) {
    String.prototype.toBytes = function () {
      return toBytes(this);
    };
  }

  if (!String.prototype.format || (0, _locustjsExtensionsOptions.shouldExtend)('format', _options)) {
    String.prototype.format = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      format.apply(void 0, [this].concat(args));
    };
  }

  if (!String.prototype.isPunctuation || (0, _locustjsExtensionsOptions.shouldExtend)('isPunctuation', _options)) {
    String.prototype.isPunctuation = function () {
      return isPunctuation(this);
    };
  }

  if (!String.prototype.isControl || (0, _locustjsExtensionsOptions.shouldExtend)('isControl', _options)) {
    String.prototype.isControl = function () {
      return isControl(this);
    };
  }

  if (!String.prototype.isAlpha || (0, _locustjsExtensionsOptions.shouldExtend)('isAlpha', _options)) {
    String.prototype.isAlpha = function () {
      return isAlpha(this);
    };
  }

  if (!String.prototype.isLetter || (0, _locustjsExtensionsOptions.shouldExtend)('isLetter', _options)) {
    String.prototype.isLetter = function () {
      return isAlpha(this);
    };
  }

  if (!String.prototype.isLower || (0, _locustjsExtensionsOptions.shouldExtend)('isLower', _options)) {
    String.prototype.isLower = function () {
      return isLower(this);
    };
  }

  if (!String.prototype.isUpper || (0, _locustjsExtensionsOptions.shouldExtend)('isUpper', _options)) {
    String.prototype.isUpper = function () {
      return isUpper(this);
    };
  }

  if (!String.prototype.isDigit || (0, _locustjsExtensionsOptions.shouldExtend)('isDigit', _options)) {
    String.prototype.isDigit = function () {
      return isDigit(this);
    };
  }

  if (!String.prototype.isAlphaNum || (0, _locustjsExtensionsOptions.shouldExtend)('isAlphaNum', _options)) {
    String.prototype.isAlphaNum = function () {
      return isAlphaNum(this);
    };
  }

  if (!String.prototype.isArithmatic || (0, _locustjsExtensionsOptions.shouldExtend)('isArithmatic', _options)) {
    String.prototype.isArithmatic = function () {
      return isArithmatic(this);
    };
  }

  if (!String.prototype.isLogic || (0, _locustjsExtensionsOptions.shouldExtend)('isLogic', _options)) {
    String.prototype.isLogic = function () {
      return isLogic(this);
    };
  }

  if (!String.prototype.isBitwise || (0, _locustjsExtensionsOptions.shouldExtend)('isBitwise', _options)) {
    String.prototype.isBitwise = function () {
      return isBitwise(this);
    };
  }

  if (!String.prototype.isComparison || (0, _locustjsExtensionsOptions.shouldExtend)('isComparison', _options)) {
    String.prototype.isComparison = function () {
      return isComparison(this);
    };
  }

  if (!String.prototype.isWhitespace || (0, _locustjsExtensionsOptions.shouldExtend)('isWhitespace', _options)) {
    String.prototype.isWhitespace = function () {
      return isWhitespace(this);
    };
  }

  if (!String.prototype.isMath || (0, _locustjsExtensionsOptions.shouldExtend)('isMath', _options)) {
    String.prototype.isMath = function () {
      return isMath(this);
    };
  }

  if (!String.prototype.left || (0, _locustjsExtensionsOptions.shouldExtend)('left', _options)) {
    String.prototype.left = function (n) {
      return left(this, n);
    };
  }

  if (!String.prototype.right || (0, _locustjsExtensionsOptions.shouldExtend)('right', _options)) {
    String.prototype.right = function (n) {
      return right(this, n);
    };
  }

  if (!String.prototype.transplit || (0, _locustjsExtensionsOptions.shouldExtend)('transplit', _options)) {
    String.prototype.transplit = function (separator, transforms) {
      return transplit(this, separator, transforms);
    };
  }

  if (!String.prototype.nestedSplit || (0, _locustjsExtensionsOptions.shouldExtend)('nestedSplit', _options)) {
    /* examples
    	input: "a=1&b=ali"
    	output:
    	[
    		["a",1],
    		["b","ali"]
    	]
    	
    	input: "a=1:b=ali&a=2:b=reza:c=true&a=3:b=:c=false&b=saeed:c=true"
    	output:
    		[
    			[ ["a",1],["b", "ali"] ],
    			[ ["a",2],["b", "reza"],["c", true] ],
    			[ ["a",3],["b", "" ],["c", false] ],
    			[ ["b", "saeed"],["c", true] ]
    		]
    */
    String.prototype.nestedSplit = function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return nestedSplit.apply(void 0, [this].concat(args));
    };
  }

  if (!String.prototype.pascalCase || (0, _locustjsExtensionsOptions.shouldExtend)('pascalcase', _options)) {
    String.prototype.pascalCase = function () {
      return pascalCase(this);
    };
  }

  if (!String.prototype.camelCase || (0, _locustjsExtensionsOptions.shouldExtend)('camelcase', _options)) {
    String.prototype.camelCase = function () {
      return camelCase(this);
    };
  }

  if (!String.prototype.capitalize || (0, _locustjsExtensionsOptions.shouldExtend)('capitalize', _options)) {
    String.prototype.capitalize = function () {
      return _capitalize(this);
    };
  }
}

var _default = configureStringExtensions;
exports.default = _default;