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
const isLetter		= isAlpha;
const left			= (x, n) => isSomeString(x) ? x.substr(0, n): '';
const right			= (x, n) => isSomeString(x) ? (x.length > n ? x.substr(x.length - n, n): x) : '';
const stringTransforms = {
	'free': (x) => x,
	'trim': (x) => x.trim(),
	'ltrim': (x) => ltrim(x),
	'rtrim': (x) => rtrim(x),
	'upper': (x) => x.toUpperCase(),
	'lower': (x) => x.toLowerCase(),
	'camel': (x) => camelCase(x),
	'pascal': (x) => pascalCase(x),
	'reverse': (x) => reverse(x),
	'unstring': (x) => unString(x),
	'togglecase': (x) => toggleCase(x),
	isValid: function (transform) {
		return isFunction(this[transform])
	}
}
const _singleTransform = function (str, type) {
	let result = str;
	const t = stringTransforms[type];
	
	if (t != undefined) {
		result = t(str);
	}
	
	return result;
}
const _transform = function (str, transArray) {
	let result = str;
	
	transArray.forEach(type => {
		result = _singleTransform(result, type)
	});
	
	return result;
}
const tsplit		= function (str, separator, transforms) {
	let result = [];
	let arr = str.split(separator);
	let i = 0;
	let _transforms = [];
	
	if (isArray(transforms)) {
		_transforms = transforms
	} else if (SplitOptions.isValid(transforms)) {
		transforms = SplitOptions.getNumber(transforms);
		
		switch (transforms) {
			case removeEmpties			 	: _transforms = ['free']; break;
			case trim					 	: _transforms = ['trim']; break;
			case trimAndRemoveEmpties		: _transforms = ['trim', 'free']; break;
			case toLower					: _transforms = ['lower']; break;
			case trimToLowerAndRemoveEmpties: _transforms = ['trim', 'lower', 'free']; break;
			case toUpper					: _transforms = ['upper']; break;
			case trimToUpperAndRemoveEmpties: _transforms = ['trim', 'upper', 'free']; break;
		}
	} else if (isSomeString(transforms)) {
		_transforms = transforms.split(',')
	}
	
	while (i < arr.length) {
		let _item;
		let item = arr[i++];
		
		if (_transforms.length) {
			item = _transform(item, _transforms);
			
			if (_transforms[_transforms.length - 1] == 'free' && item.length == 0) {
				continue;
			}
			
			result.push(item)
		}
	}
	
	return result;
}
const nsplit = function (str, ...rest) {
	let result = [];
	let _transforms = [];
	let transforms = rest.length ? rest[rest.length - 1]: null;
	let separators = [];
	
	if (isArray(transforms)) {
		_transforms = transforms
	} else if (isSomeString(transforms) && stringTransforms.isValid(transforms)) {
		_transforms = transforms.split(',')
	} else if (SplitOptions.isValid(transforms)) {
		transforms = SplitOptions.getNumber(transforms);
		
		switch (transforms) {
			case removeEmpties				 : _transforms = ['free']; break;
			case trim					 : _transforms = ['trim']; break;
			case trimAndRemoveEmpties		 : _transforms = ['trim', 'free']; break;
			case toLower					 : _transforms = ['lower']; break;
			case trimToLowerAndRemoveEmpties: _transforms = ['trim', 'lower', 'free']; break;
			case toUpper					 : _transforms = ['upper']; break;
			case trimToUpperAndRemoveEmpties: _transforms = ['trim', 'upper', 'free']; break;
		}
	}
	
	if (!isEmpty(transforms)) {
		separators = rest.slice(0, rest.length - 1)
	}
	
	if (arguments.length > 0) {
		var splitOptions = SplitOptions.none;
		var separatorsCount = arguments.length;
		
		if (arguments.length > 1) {
			splitOptions = arguments[arguments.length - 1];
			if (splitOptions == SplitOptions.removeEmpties ||
				splitOptions == SplitOptions.trim ||
				splitOptions == SplitOptions.trimAndRemoveEmpties ||
				splitOptions == SplitOptions.toLower ||
				splitOptions == SplitOptions.trimToLowerAndRemoveEmpties ||
				splitOptions == SplitOptions.toUpper ||
				splitOptions == SplitOptions.trimToUpperAndRemoveEmpties) {
				separatorsCount--;
			} else {
			  splitOptions = SplitOptions.none;
			}
		}
		
		function splitStringArray(arr, separators, options, i) {
			var _result = [];
			
			if (i < separatorsCount) {
				w.Locust.eachKey(arr, function(index) {
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
		}
		
		result = splitStringArray([str.toString()], arguments, splitOptions, 0)[0];
	}
	
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

			if (typeof pv == 'object' && pv) {
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
			} else if (typeof values == "object" && values != null) {
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

	if (!String.prototype.tsplit || shouldExtend('tsplit', _options)) {
		String.prototype.tsplit = function (separator, transforms) {
			return tsplit(this, separator, transforms)
		}
	}

	if (!String.prototype.nsplit || shouldExtend('nsplit', _options)) {
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
				var splitOptions = SplitOptions.none;
				var separatorsCount = arguments.length;
				
				if (arguments.length > 1) {
					splitOptions = arguments[arguments.length - 1];
					if (splitOptions == SplitOptions.removeEmpties ||
						splitOptions == SplitOptions.trim ||
						splitOptions == SplitOptions.trimAndRemoveEmpties ||
						splitOptions == SplitOptions.toLower ||
						splitOptions == SplitOptions.trimToLowerAndRemoveEmpties ||
						splitOptions == SplitOptions.toUpper ||
						splitOptions == SplitOptions.trimToUpperAndRemoveEmpties) {
						separatorsCount--;
					} else {
					  splitOptions = SplitOptions.none;
					}
				}
				
				function splitStringArray(arr, separators, options, i) {
					var _result = [];
					
					if (i < separatorsCount) {
						w.Locust.eachKey(arr, function(index) {
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
				}
				
				result = splitStringArray([this.toString()], arguments, splitOptions, 0)[0];
			}
			
			return result;
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
	toggleCase		        ,
	unString            ,
	pascalCase          ,
	camelCase           ,
	isLetter            ,
	left                ,
	right               ,
	stringTransforms    ,
	format              ,
	tsplit              ,
	nsplit
}