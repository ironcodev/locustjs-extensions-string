import { isObject, isSomeObject, isArray, isString, isSomeString, isNumeric, isFunction, forEach } from 'locustjs-base'
import Enum from 'locustjs-enum';
import { configureOptions, shouldExtend } from 'locustjs-extensions-options'

const SplitOptions = Enum.define({
	none						: 0,
	removeEmpties				: 1,
	trim						: 2,
	trimAndRemoveEmpties		: 3,
	toLower						: 4,
	trimToLowerAndRemoveEmpties	: 5,
	toUpper						: 6,
	trimToUpperAndRemoveEmpties	: 7
}, 'SplitOptions');

const replaceAll = (source, find, replace) =>
	source.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);

const reverse = (x) => isSomeString(x) ? x.split('').reverse().join(''): '';
const ltrim = (x) => isSomeString(x) ? x.trimLeft(): '';
const rtrim = (x) => isSomeString(x) ? x.trimRight(): '';
const toBytes = (x) => {
	let data = [];
	
	if (isSomeString(x)) {
		for (let i = 0; i < x.length; i++) {
			data.push(x.charCodeAt(i));
		}
	}
	
	return data;
}
const Chars = {
	punctuation: ['.', ',', ';', ':', '?', '!', '(', ')', '-', "'", '"', '/', '\\', '{', '}', '[', ']', '%', '#'],
	control: ['~','!','@','#','$','%','^','&','*','(',')','_','+','|','<','>','?',':','{','}','[',']',';','"', "'",',','.','/','-','=','\\','`'],
	arithmatic: ['/', '\\', '+', '-', '(', ')', '%', '^', '*', '++', '--'],
	logic: ['&&', '||', '!'],
	bitwise: ['&', '|', '>>', '<<'],
	comparison: ['==', '!=', '<>', '>', '<', '>=', '<=', '===', '!==']
}

const isChar		= (x) => isString(x) && x.length == 1;
const isPunctuation = (x) => isSomeString(x) && (Chars.punctuation.indexOf(x) >= 0);
const isControl		= (x) => isSomeString(x) && (Chars.control.indexOf(x) >= 0);
const isAlpha		= (x) => isSomeString(x) && x.match(/^[a-z]+$/i) !== null;
const isLower		= (x) => isSomeString(x) && x.match(/^[a-z]+$/) !== null;
const isUpper		= (x) => isSomeString(x) && x.match(/^[A-Z]+$/) !== null;
const isDigit		= (x) => isSomeString(x) && x.match(/^[0-9]+$/) !== null;
const isAlphaNum	= (x) => isSomeString(x) && x.match(/^[a-z0-9]+$/i) !== null;
const isWord		= (x) => isSomeString(x) && x.match(/^\w+$/i) !== null;
const isArithmatic	= (x) => isSomeString(x) && (Chars.arithmatic.indexOf(x) >= 0);
const isLogic		= (x) => isSomeString(x) && (Chars.logic.indexOf(x) >= 0);
const isBitwise		= (x) => isSomeString(x) && (Chars.bitwise.indexOf(x) >= 0);
const isComparison	= (x) => isSomeString(x) && (Chars.comparison.indexOf(x) >= 0);
const isWhitespace	= (x) => isSomeString(x) && x.match(/^\s+$/) !== null;
const isMath		= (x) => isArithmatic(x) || isLogic(x) || isBitwise(x) || isComparison(x);
const stringify		= (x, ch = '"') => ch + x + ch;
const toggleCase		= (x) => {
	let result = '';
	
	if (isSomeString(x)) {
		for (let i = 0; i < x.length; i++) {
			let code = x.charCodeAt(i);
			
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
	
	return result
}
const unString		= (x) => {
	let result = '';
	
	if (isSomeString(x)) {
		if (['"', "'", '`'].indexOf(x[0]) >= 0) {
			result = x.substr(1);
		}
		if (result.length && ['"', "'", '`'].indexOf(result[result.length - 1]) >= 0) {
			result = result.substr(0, result.length - 1);
		}
	}
	
	return result;
}
const pascalCase  = (x) => isSomeString(x) ? x.match(/[a-z]+/gi)
											.map(word => word.charAt(0).toUpperCase() + word.substr(1))
											.join('')
										: '';
const camelCase   = (x) => isSomeString(x) ? x.match(/[a-z]+/gi)
											.map((word, i) => (i == 0 ? word.charAt(0).toLowerCase(): word.charAt(0).toUpperCase()) + word.substr(1))
											.join('')
									: '';
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
		
		result = arr.join('');
	}
	
	return result;
}
const isLetter		= isAlpha;
const left			= (x, n) => isSomeString(x) ? x.substr(0, n): '';
const right			= (x, n) => isSomeString(x) ? (x.length > n ? x.substr(x.length - n, n): x) : '';
const stringTransforms = {
	'free': (x) => x.trim(),
	'trim': (x) => x.trim(),
	'ltrim': (x) => ltrim(x),
	'rtrim': (x) => rtrim(x),
	'upper': (x) => x.toUpperCase(),
	'lower': (x) => x.toLowerCase(),
	'camel': (x) => camelCase(x),
	'camelcase': (x) => camelCase(x),
	'pascal': (x) => pascalCase(x),
	'pascalcase': (x) => pascalCase(x),
	'toggle': (x) => toggleCase(x),
	'togglecase': (x) => toggleCase(x),
	'capitalize': (x) => capitalize(x),
	'reverse': (x) => reverse(x),
	'stringify': (x) => stringify(x),
	'unstring': (x) => unString(x),
	isValid: function (transform) {
		return isFunction(this[transform])
	}
}
const _singleTransform = function (str, transformType) {
	let result = str;
	
	if (isFunction(transformType)) {
		result = transformType(str);
	} else {
		const transform = stringTransforms[transformType];
		
		if (transform != undefined) {
			result = transform(str);
		}
	}
	
	return result;
}
const _transform = function (str, transArray) {
	let result = str;
	
	transArray.forEach(transformType => {
		result = _singleTransform(result, transformType)
	});
	
	return result;
}
const transplit = function (str, separator, ...transforms) {
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
				if (item.indexOf(',') >= 0) {
					let temp = transplit(item, ',', SplitOptions.trimToLowerAndRemoveEmpties);
					
					for (let subItem of temp) {
						_transforms.push(subItem);
					}
				} else {
					_transforms.push(item.trim().toLowerCase());
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
		
		let arr = str.split(separator);
		
		if (_finalTransforms.length) {
			let i = 0;
			
			while (i < arr.length) {
				let item = arr[i++];
				
				item = _transform(item, _finalTransforms);
				
				if (_finalTransforms[_finalTransforms.length - 1] == 'free' && (!item || item.length == 0)) {
					continue;
				}
				
				result.push(item)
			}
		} else {
			result = arr;
		}
	}
	
	return result;
}
const nestedSplit = function (str, ...rest) {
	let result = [];
	let separators = rest;
	let transforms = null;
	
	if (rest.length > 1) {
		transforms = rest[rest.length - 1];
		
		if ((isSomeString(transforms) && transforms != ',' && transforms.indexOf(',') >= 0) || isArray(transforms)) {
			separators = rest.slice(0, rest.length - 1);
		} else {
			transforms = null;
		}
	}
	
	separators = separators.flat();
	
	function splitStringArray(arr, i) {
		var _result = [];
		
		if (i < separators.length) {
			for (let index in arr) {
				if (isString(arr[index])) {
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
}
const format		= function () {
	let s = arguments.length ? arguments[0]: '';
	let _args = [];
	
	if (arguments.length) {
		forEach(arguments, a => { if (a.index > 0) _args.push(a.value) })
	}

	function formatWithObject(prefix, obj) {
		forEach(obj, function (args) {
			let key = args.key;
			let i = args.index;
			let pv = args.value;

			if (pv == null) {
				pv = '';
			}

			if (isObject(pv)) {
				formatWithObject(prefix + key + '.', pv);
			} else {
				s = replaceAll(s, '{' + prefix + key + '}', pv);
			}
		});
	}

	if (_args.length > 0) {
		if (_args.length == 1) {
			let values = _args[0];
			
			if (isArray(values)) {
				let i = 0;
				
				values.forEach(function (value) {
					let v = value == null ? '' : value;

					s = replaceAll(s, '{' + i + '}', v);
					i++;
				})
			} else if (isSomeObject(values)) {
				forEach(values, function (args) {
					let key = args.key;
					let i = args.index;
					let pv = args.value;

					if (pv == null) {
						pv = '';
					}

					if (isSomeObject(pv)) {
						if (isNumeric(key)) {
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
					let v = _args[number] == null ? '' : _args[number];

					return _args[number] != undefined ? v : match;
				} else {
					return match;
				}
			});
		}
	}
	
	let i = 0;
	let state = 0;
	let ex = '';
	let result = [];
	let temp = '';

	while (i < s.length) {
		let ch = s[i];

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
							let e = format(ex.substr(1), _args);
							let exr = (Function('return ' + e))();

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
}

function configureStringExtensions(options) {
	const _options = configureOptions(options)

	if (!String.prototype.replaceAll || shouldExtend('replaceAll', _options)) {
		String.prototype.replaceAll = function (x) {
			return replaceAll(x);
		}
	}

	if (!String.prototype.reverse || shouldExtend('reverse', _options)) {
		String.prototype.reverse = function (x) {
			return reverse(this);
		}
	}

	if (!String.prototype.ltrim || shouldExtend('ltrim', _options)) {
		String.prototype.ltrim = function () {
			return ltrim(this);
		}
	}

	if (!String.prototype.rtrim || shouldExtend('rtrim', _options)) {
		String.prototype.rtrim = function () {
			return rtrim(this);
		}
	}

	if (!String.prototype.toBytes || shouldExtend('toBytes', _options)) {
		String.prototype.toBytes = function () {
			return toBytes(this);
		}
	}

	if (!String.prototype.format || shouldExtend('format', _options)) {
		String.prototype.format = function (...args) {
			format(this, ...args)
		}
	}

	if (!String.prototype.isPunctuation || shouldExtend('isPunctuation', _options)) {
		String.prototype.isPunctuation = function () {
			return isPunctuation(this)
		}
	}

	if (!String.prototype.isControl || shouldExtend('isControl', _options)) {
		String.prototype.isControl = function () {
			return isControl(this)
		}
	}

	if (!String.prototype.isAlpha || shouldExtend('isAlpha', _options)) {
		String.prototype.isAlpha = function () {
			return isAlpha(this)
		}
	}

	if (!String.prototype.isLetter || shouldExtend('isLetter', _options)) {
		String.prototype.isLetter = function () {
			return isAlpha(this)
		}
	}

	if (!String.prototype.isLower || shouldExtend('isLower', _options)) {
		String.prototype.isLower = function () {
			return isLower(this)
		}
	}

	if (!String.prototype.isUpper || shouldExtend('isUpper', _options)) {
		String.prototype.isUpper = function () {
			return isUpper(this)
		}
	}

	if (!String.prototype.isDigit || shouldExtend('isDigit', _options)) {
		String.prototype.isDigit = function () {
			return isDigit(this)
		}
	}

	if (!String.prototype.isAlphaNum || shouldExtend('isAlphaNum', _options)) {
		String.prototype.isAlphaNum = function () {
			return isAlphaNum(this)
		}
	}

	if (!String.prototype.isArithmatic || shouldExtend('isArithmatic', _options)) {
		String.prototype.isArithmatic = function () {
			return isArithmatic(this)
		}
	}

	if (!String.prototype.isLogic || shouldExtend('isLogic', _options)) {
		String.prototype.isLogic = function () {
			return isLogic(this)
		}
	}

	if (!String.prototype.isBitwise || shouldExtend('isBitwise', _options)) {
		String.prototype.isBitwise = function () {
			return isBitwise(this)
		}
	}

	if (!String.prototype.isComparison || shouldExtend('isComparison', _options)) {
		String.prototype.isComparison = function () {
			return isComparison(this)
		}
	}

	if (!String.prototype.isWhitespace || shouldExtend('isWhitespace', _options)) {
		String.prototype.isWhitespace = function () {
			return isWhitespace(this)
		}
	}

	if (!String.prototype.isMath || shouldExtend('isMath', _options)) {
		String.prototype.isMath = function () {
			return isMath(this)
		}
	}

	if (!String.prototype.left || shouldExtend('left', _options)) {
		String.prototype.left = function (n) {
			return left(this, n)
		}
	}

	if (!String.prototype.right || shouldExtend('right', _options)) {
		String.prototype.right = function (n) {
			return right(this, n)
		}
	}

	if (!String.prototype.transplit || shouldExtend('transplit', _options)) {
		String.prototype.transplit = function (separator, transforms) {
			return transplit(this, separator, transforms)
		}
	}

	if (!String.prototype.nestedSplit || shouldExtend('nestedSplit', _options)) {
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
		String.prototype.nestedSplit = function (...args) {
			return nestedSplit(this, ...args)
		}
	}
	
	if (!String.prototype.pascalCase || shouldExtend('pascalcase', _options)) {
		String.prototype.pascalCase = function () {
			return pascalCase(this);
		}
	}
	
	if (!String.prototype.camelCase || shouldExtend('camelcase', _options)) {
		String.prototype.camelCase = function () {
			return camelCase(this);
		}
	}
	
	if (!String.prototype.capitalize || shouldExtend('capitalize', _options)) {
		String.prototype.capitalize = function () {
			return capitalize(this);
		}
	}
}

export default configureStringExtensions;
export {
	SplitOptions        ,
	replaceAll          ,
	reverse             ,
	ltrim               ,
	rtrim               ,
	toBytes             ,
	Chars               ,
	isChar		        ,
	isPunctuation       ,
	isControl		    ,
	isAlpha		        ,
	isLower		        ,
	isUpper		        ,
	isDigit		        ,
	isAlphaNum	        ,
	isWord		        ,
	isArithmatic	    ,
	isLogic		        ,
	isBitwise		    ,
	isComparison	    ,
	isWhitespace	    ,
	isMath		        ,
	stringify		    ,
	toggleCase		    ,
	unString            ,
	pascalCase          ,
	camelCase           ,
	capitalize			,
	isLetter            ,
	left                ,
	right               ,
	stringTransforms    ,
	format              ,
	transplit           ,
	nestedSplit
}