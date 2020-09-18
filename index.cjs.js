"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nsplit = exports.tsplit = exports.format = exports.stringTransforms = exports.right = exports.left = exports.isLetter = exports.camelCase = exports.pascalCase = exports.unString = exports.toggleCase = exports.stringify = exports.isMath = exports.isWhitespace = exports.isComparison = exports.isBitwise = exports.isLogic = exports.isArithmatic = exports.isWord = exports.isAlphaNum = exports.isDigit = exports.isUpper = exports.isLower = exports.isAlpha = exports.isControl = exports.isPunctuation = exports.isChar = exports.Chars = exports.toBytes = exports.rtrim = exports.ltrim = exports.reverse = exports.replaceAll = exports.SplitOptions = exports.default = void 0;

var _locustjsBase = require("locustjs-base");

var _locustjsEnum = _interopRequireDefault(require("locustjs-enum"));

var _locustjsExtensionsOptions = require("locustjs-extensions-options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var stringify = function stringify(x) {
  var ch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '"';
  return ch + x + ch;
};

exports.stringify = stringify;

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
    return x;
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
  'pascal': function pascal(x) {
    return pascalCase(x);
  },
  'reverse': function reverse(x) {
    return _reverse(x);
  },
  'unstring': function unstring(x) {
    return unString(x);
  },
  'togglecase': function togglecase(x) {
    return toggleCase(x);
  },
  isValid: function isValid(transform) {
    return (0, _locustjsBase.isFunction)(this[transform]);
  }
};
exports.stringTransforms = stringTransforms;

var _singleTransform = function _singleTransform(str, type) {
  var result = str;
  var t = stringTransforms[type];

  if (t != undefined) {
    result = t(str);
  }

  return result;
};

var _transform = function _transform(str, transArray) {
  var result = str;
  transArray.forEach(function (type) {
    result = _singleTransform(result, type);
  });
  return result;
};

var tsplit = function tsplit(str, separator, transforms) {
  var result = [];
  var arr = str.split(separator);
  var i = 0;
  var _transforms = [];

  if ((0, _locustjsBase.isArray)(transforms)) {
    _transforms = transforms;
  } else if (SplitOptions.isValid(transforms)) {
    transforms = SplitOptions.getNumber(transforms);

    switch (transforms) {
      case removeEmpties:
        _transforms = ['free'];
        break;

      case trim:
        _transforms = ['trim'];
        break;

      case trimAndRemoveEmpties:
        _transforms = ['trim', 'free'];
        break;

      case toLower:
        _transforms = ['lower'];
        break;

      case trimToLowerAndRemoveEmpties:
        _transforms = ['trim', 'lower', 'free'];
        break;

      case toUpper:
        _transforms = ['upper'];
        break;

      case trimToUpperAndRemoveEmpties:
        _transforms = ['trim', 'upper', 'free'];
        break;
    }
  } else if ((0, _locustjsBase.isSomeString)(transforms)) {
    _transforms = transforms.split(',');
  }

  while (i < arr.length) {
    var _item = void 0;

    var item = arr[i++];

    if (_transforms.length) {
      item = _transform(item, _transforms);

      if (_transforms[_transforms.length - 1] == 'free' && item.length == 0) {
        continue;
      }

      result.push(item);
    }
  }

  return result;
};

exports.tsplit = tsplit;

var nsplit = function nsplit(str) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  var result = [];
  var _transforms = [];
  var transforms = rest.length ? rest[rest.length - 1] : null;
  var separators = [];

  if ((0, _locustjsBase.isArray)(transforms)) {
    _transforms = transforms;
  } else if ((0, _locustjsBase.isSomeString)(transforms) && stringTransforms.isValid(transforms)) {
    _transforms = transforms.split(',');
  } else if (SplitOptions.isValid(transforms)) {
    transforms = SplitOptions.getNumber(transforms);

    switch (transforms) {
      case removeEmpties:
        _transforms = ['free'];
        break;

      case trim:
        _transforms = ['trim'];
        break;

      case trimAndRemoveEmpties:
        _transforms = ['trim', 'free'];
        break;

      case toLower:
        _transforms = ['lower'];
        break;

      case trimToLowerAndRemoveEmpties:
        _transforms = ['trim', 'lower', 'free'];
        break;

      case toUpper:
        _transforms = ['upper'];
        break;

      case trimToUpperAndRemoveEmpties:
        _transforms = ['trim', 'upper', 'free'];
        break;
    }
  }

  if (!isEmpty(transforms)) {
    separators = rest.slice(0, rest.length - 1);
  }

  if (arguments.length > 0) {
    var splitStringArray = function splitStringArray(arr, separators, options, i) {
      var _result = [];

      if (i < separatorsCount) {
        w.Locust.eachKey(arr, function (index) {
          if (typeof arr[index] == "string") {
            var tempArr = arr[index].splitString(separators[i], options);
            var tempItem = splitStringArray(tempArr, separators, options, i + 1);

            _result.push(tempItem);
          }
        });
      } else {
        _result = arr;
      }

      return _result;
    };

    var splitOptions = SplitOptions.none;
    var separatorsCount = arguments.length;

    if (arguments.length > 1) {
      splitOptions = arguments[arguments.length - 1];

      if (splitOptions == SplitOptions.removeEmpties || splitOptions == SplitOptions.trim || splitOptions == SplitOptions.trimAndRemoveEmpties || splitOptions == SplitOptions.toLower || splitOptions == SplitOptions.trimToLowerAndRemoveEmpties || splitOptions == SplitOptions.toUpper || splitOptions == SplitOptions.trimToUpperAndRemoveEmpties) {
        separatorsCount--;
      } else {
        splitOptions = SplitOptions.none;
      }
    }

    result = splitStringArray([str.toString()], arguments, splitOptions, 0)[0];
  }

  return result;
};

exports.nsplit = nsplit;

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

      if (_typeof(pv) == 'object' && pv) {
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
        var _i = 0;
        values.forEach(function (value) {
          var v = value == null ? '' : value;
          s = replaceAll(s, '{' + _i + '}', v);
          _i++;
        });
      } else if (_typeof(values) == "object" && values != null) {
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
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
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

  if (!String.prototype.tsplit || (0, _locustjsExtensionsOptions.shouldExtend)('tsplit', _options)) {
    String.prototype.tsplit = function (separator, transforms) {
      return tsplit(this, separator, transforms);
    };
  }

  if (!String.prototype.nsplit || (0, _locustjsExtensionsOptions.shouldExtend)('nsplit', _options)) {
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
    			[ ["a",3],["b"],["c", false] ],
    			[ ["b", "saeed"],["c", true] ]
    		]
    */
    String.prototype.nsplit = function () {
      var result = [];

      if (arguments.length > 0) {
        var splitStringArray = function splitStringArray(arr, separators, options, i) {
          var _result = [];

          if (i < separatorsCount) {
            w.Locust.eachKey(arr, function (index) {
              if (typeof arr[index] == "string") {
                var tempArr = arr[index].splitString(separators[i], options);
                var tempItem = splitStringArray(tempArr, separators, options, i + 1);

                _result.push(tempItem);
              }
            });
          } else {
            _result = arr;
          }

          return _result;
        };

        var splitOptions = SplitOptions.none;
        var separatorsCount = arguments.length;

        if (arguments.length > 1) {
          splitOptions = arguments[arguments.length - 1];

          if (splitOptions == SplitOptions.removeEmpties || splitOptions == SplitOptions.trim || splitOptions == SplitOptions.trimAndRemoveEmpties || splitOptions == SplitOptions.toLower || splitOptions == SplitOptions.trimToLowerAndRemoveEmpties || splitOptions == SplitOptions.toUpper || splitOptions == SplitOptions.trimToUpperAndRemoveEmpties) {
            separatorsCount--;
          } else {
            splitOptions = SplitOptions.none;
          }
        }

        result = splitStringArray([this.toString()], arguments, splitOptions, 0)[0];
      }

      return result;
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
}

var _default = configureStringExtensions;
exports.default = _default;