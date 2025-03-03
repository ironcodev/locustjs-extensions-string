import {
  isArray,
  isSomeString,
  isNumeric,
  isFunction,
} from "@locustjs/base";
import SplitOptions from "./SplitOptions";
import reverse from "./reverse";
import stringify from "./stringify";
import capitalize from "./capitalize";
import camelCase from "./camelCase";
import pascalCase from "./pascalCase";
import toggleCase from "./toggleCase";
import unString from "./unString";
import { ltrim, rtrim } from "./trim";
import { htmlEncode, htmlDecode } from "@locustjs/htmlencode";

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
    let trans = [...transforms];
    let limit;

    if (trans.length && isNumeric(trans[0])) {
      limit = trans[0];
      
      trans.splice(0, 1)
    }

    let _transforms = [];
    let _finalTransforms = [];

    for (let item of trans) {
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

    let arr = str.split(separator, limit);

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

export { StringTransformations, xsplit };
