# About
This library contains extensions for `string`.

# Install
```
npm i @locustjs/extensions-string
```

# Import

CommonJs
```javascript
var someFn = require('@locustjs/extensions-string').someFn;
```

ES6
```javascript
import { someFn } from '@locustjs/extensions-string'
```

# Usage
string extension methods can be used in three ways.
## 1. Direct call
```javascript
import { replaceAll } from '@locustjs/extensions-string';

const str = 'Hello';

console.log(replaceAll(str, 'l', '$'));  // He$$o
```

**Pros**
-  Works on `undefined` variables as well.

**Cons**
- Requires `import`

## 2. As extension method on `string` instances
```javascript
const str = 'Hello';

console.log(str.replaceAll('l', '$'));  // He$$o
```

**Pros**
- Does not require `import`
- More readable code

**Cons**
- Does not work on `undefined` variables

## 3. As static method on `String`
```javascript
const str = 'Hello';

console.log(String.replaceAll(str, 'l', '$'));  // He$$o
```

**Pros**
- Works on `undefined` variables as well.
- Does not require `import`

**Cons**
- More characters to type
- Less readable

# Classes
## `StringBuilder`
A helper class to concatenate strings more efficiently. It uses an internal array, places given strings inside the array, extends array size if needed,  joins the array upon calling `toString` method and resets the array.

```javascript
const sb = new StringBuilder();

sb.append('Hello')
sb.append(' World')
sb.append('\n')
sb.append('Goodbye')

console.log(sb.toString());
/* output:
Hello World
Goodbye
*/
```

# Functions
## `replaceAll(str, find, replace)`
Replaces `find` with `replace` in `str` string.

```javascript
let str = 'to be or not to be';

// usage 1: direct call
console.log(replaceAll(str, 'to', '2'));
// usage 2: as an extension method
console.log(str.replaceAll('to', '2'));
// usage 3: as static method
console.log(String.replaceAll(str, 'to', '2'));

/* output:
2 be or not 2 be
*/
```

## `reverse(str)`
Reverses `str` string.

```javascript
let str = 'Hello World';

// usage 1: direct call
console.log(reverse(str));
// usage 2: as an extension method
console.log(str.reverse());
// usage 3: as static method
console.log(String.reverse(str));

/* output:
dlroW olleH
*/
```

## `ltrim(str)`
Removes white-space character from left-side of `str` string.

```javascript
let str = '  Hello  ';

// usage 1: direct call
console.log(`"${ltrim(str)}"`);
// usage 2: as an extension method
console.log(`"${str.ltrim()}"`);
// usage 3: as static method
console.log(`"${String.ltrim(str)}"`);

/* output:
"Hello  "
*/
```

## `rtrim(str)`
Removes white-space character from right-side of `str` string.

```javascript
let str = '  Hello  ';

// usage 1: direct call
console.log(`"${rtrim(str)}"`);
// usage 2: as an extension method
console.log(`"${str.rtrim()}"`);
// usage 3: as static method
console.log(`"${String.rtrim(str)}"`);

/* output:
"  Hello"
*/
```

## `toArray(str)`
Converts `str` string into an array of ascii-codes.

```javascript
let str = 'Hello';

// usage 1: direct call
console.log(toArray(str));
// usage 2: as an extension method
console.log(str.toArray());
// usage 3: as static method
console.log(String.toArray(str));

/* output:
[72, 101, 108, 108, 111]
*/

str = 'سلام';

// usage 1: direct call
console.log(toArray(str));
// usage 2: as an extension method
console.log(str.toArray());
// usage 3: as static method
console.log(String.toArray(str));

/* output:
[1587, 1604, 1575, 1605]
*/
```

## `fromArray(arr)`
Converts `arr` array into a string.

```javascript
let arr = [72, 101, 108, 108, 111];

// usage 1: direct call
console.log(fromArray(arr));
// usage 3: as static method
console.log(String.fromArray(arr));

/* output:
Hello
*/
```

## `toBytes(str)`
Converts `str` string into an array of unsigned bytes.

```javascript
let str = 'سلام';

// usage 1: direct call
console.log(toBytes(str));
// usage 2: as an extension method
console.log(str.toBytes());
// usage 3: as static method
console.log(String.toBytes(str));

/* output:
[216, 179, 217, 132, 216, 167, 217, 133]
*/
```

## `fromBytes(arr)`
Converts `arr` byte-array into a string.

```javascript
let arr = new Uint8Array([216, 179, 217, 132, 216, 167, 217, 133])

// usage 1: direct call
console.log(fromBytes(arr));
// usage 3: as static method
console.log(String.fromBytes(arr));

/* output:
سلام
*/
```

## Character type checking

```javascript
// checks if input is only one character
console.log(String.isCharacter('a'));	// true
console.log(String.isCharacter('ab'));	// false

// punctuation letters: '.', ',', ';', ':', '?', '!', '(', ')', '-', "'", '"', '/', '\\', '{', '}', '[', ']', '%', '#'
console.log(String.isPunctuation('.'));	// true
console.log(String.isPunctuation('+'));	// false

// control characters: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '|', '<', '>', '?', ':', '{', '}', '[', ']', ';', '"', "'", ',', '.', '/', '-', '=', '\\', '`'
console.log(String.isControl('!'));	// true
console.log(String.isControl('a'));	// false

// checks if input is an alphabet character, upper or lower.
console.log(String.isAlpha('a'));	// true
console.log(String.isAlpha('2'));	// false

// isLetter() is the same as isAlpha()
console.log(String.isLetter('a'));	// true
console.log(String.isLetter('2'));	// false

// checks if input is a lower alphabet character
console.log(String.isLower('a'));	// true
console.log(String.isLower('A'));	// false

// checks if input is an upper alphabet character
console.log(String.isUpper('A'));	// true
console.log(String.isUpper('a'));	// false

// checks if input is a digit number 0-9
console.log(String.isDigit('2'));	// true
console.log(String.isDigit('a'));	// false

// checks if input is an alphabet or digit character
console.log(String.isAlphaNum('a'));	// true
console.log(String.isAlphaNum('2'));	// true
console.log(String.isAlphaNum('/'));	// false

// checks if input is a word string that contains only alphabet, digit or underscore
console.log(String.isWord('abc'));	// true
console.log(String.isWord('123'));	// true
console.log(String.isWord('a2'));	// true
console.log(String.isWord('a b'));	// false
console.log(String.isWord('a1 '));	// false

// checks if input is an arithmatic operator: '/', '\\', '+', '-', '(', ')', '%', '^', '*', '++', '--'
console.log(String.isArithmatic('+'));	// true
console.log(String.isArithmatic('&'));	// false

// checks if input is a logical operator: '&&', '||', '!'
console.log(String.isLogic('&&'));	// true
console.log(String.isLogic('&'));	// false

// checks if input is a bitwise operator: '&', '|', '>>', '<<'
console.log(String.isBitwise('&'));	// true
console.log(String.isBitwise('+'));	// false

// checks if input is a comparison operator: '==', '!=', '<>', '>', '<', '>=', '<=', '===', '!=='
console.log(String.isComparison('>'));	// true
console.log(String.isComparison('!'));	// false

// checks if input is a whitespace character or string
console.log(String.isWhitespace(' '));	// true
console.log(String.isWhitespace('    '));	// true
console.log(String.isWhitespace('\n'));	// true
console.log(String.isWhitespace('   \n'));	// true
console.log(String.isWhitespace('\t'));	// true
console.log(String.isWhitespace('='));	// false

// checks if input is an arithmatic, logical, bitwise or comparison character sequence
console.log(String.isMath('+'));	// true
console.log(String.isMath('&'));	// true
console.log(String.isMath('&&'));	// true
console.log(String.isMath('>'));	// true
console.log(String.isMath('<='));	// true
console.log(String.isMath('!'));	// true
console.log(String.isMath('/'));	// true
console.log(String.isMath('||'));	// true
console.log(String.isMath('|'));	// false
```

## `stringify(str, char = '"')`
Adds string characters to both sides of `str` string.

```javascript
let str = 'Hello';

// usage 1: direct call
console.log(stringify(str)); // "Hello"
console.log(stringify(str, "'")); // 'Hello'
// usage 2: as an extension method
console.log(str.stringify()); // "Hello"
console.log(str.stringify("'")); // 'Hello'
// usage 3: as static method
console.log(String.stringify(str)); // "Hello"
console.log(String.stringify(str, "'")); // 'Hello'
```

## `unString(str)`
Removes string characters from either side(s) of `str` string.

```javascript
let str = '"Hello"';

// usage 1: direct call
console.log(unString(str));
// usage 2: as an extension method
console.log(str.unString());
// usage 3: as static method
console.log(String.unString(str));

/* output:
Hello
*/
```

## `toggleCase(str)` or `changeCase(str)`
Changes alphabetic cases of alphabet characters in `str` string.

```javascript
let str = 'Google Play';

// usage 1: direct call
console.log(changeCase(str));
// usage 2: as an extension method
console.log(str.changeCase());
// usage 3: as static method
console.log(String.changeCase(str));

/* output:
gOOGLE pLAY
*/
```

## `pascalCase(str)`
Turns first letters of words into uppercase in `str` string and removes other none-alphabetic characters.

```javascript
let str = 'john doe';

// usage 1: direct call
console.log(pascalCase(str));
// usage 2: as an extension method
console.log(str.pascalCase());
// usage 3: as static method
console.log(String.pascalCase(str));

/* output:
JohnDoe
*/
```

## `camelCase(str)`
Turns first letters of words into uppercase in `str` string except first word and removes other none-alphabetic characters.

```javascript
let str = 'john doe';

// usage 1: direct call
console.log(camelCase(str));
// usage 2: as an extension method
console.log(str.camelCase());
// usage 3: as static method
console.log(String.camelCase(str));

/* output:
johnDoe
*/
```

## `capitalize(str)`
Turns first letters of words into uppercase in `str` string.

```javascript
let str = 'to be or not to be';

// usage 1: direct call
console.log(capitalize(str));
// usage 2: as an extension method
console.log(str.capitalize());
// usage 3: as static method
console.log(String.capitalize(str));

/* output:
To Be Or Not To Be
*/
```

## `left(str, n)`
Returns n characters from left-side of `str` string.

```javascript
let str = 'abcdefgh';

// usage 1: direct call
console.log(left(str, 3));
// usage 2: as an extension method
console.log(str.left(3));
// usage 3: as static method
console.log(String.left(str, 3));

/* output:
abc
*/
```

## `right(str, n)`
Returns n characters from right-side of `str` string.

```javascript
let str = 'abcdefgh';

// usage 1: direct call
console.log(right(str, 3));
// usage 2: as an extension method
console.log(str.right(3));
// usage 3: as static method
console.log(String.right(str, 3));

/* output:
fgh
*/
```

## `format(str, ...args)`
Formats given `str` string pattern based on given `args` arguments.

Example 1:
```javascript
const pattern = 'My name is {0}; I am {1} years old.';

// usage 1: direct call
console.log(format(pattern, 'John', 23));
// usage 2: as an extension method
console.log(pattern.format('John', 23));
// usage 3: as static method
console.log(String.format(pattern, 'John', 23));

/* output:
My name is John; I am 23 years old.
*/
```

Example 2:
```javascript
const pattern = 'My name is {name}; I am {age} years old.';
const arg = { name: 'John', age: 23 }
// usage 1: direct call
console.log(format(pattern, arg));
// usage 2: as an extension method
console.log(pattern.format(arg));
// usage 3: as static method
console.log(String.format(pattern, arg));

/* output:
My name is John; I am 23 years old.
*/
```

## `nsplit(str, separators, callback?)`
splits `str` based on given array of separators, calls `callback` function on each segment (if `callback` is specified).

**Callback signature**:
```javascript
callback({
    input: str,
    value: current part,
    index: part index,
    level: number,
    separator: current separator
})
```

If `callback` returns antyhing, `nsplit` uses that instead of passed segment.

```javascript
const str = 'a=10&b=john';

// usage 1: direct call
console.log(nsplit(str, ['&', '=']));
// usage 2: as an extension method
console.log(str.nsplit('John', 23));
// usage 3: as static method
console.log(String.nsplit(str, 'John', 23));

/* output:
[
    ['a', '10'],
    ['b', 'john']
]
*/
```

## `xsplit(str, separator, transforms)`
nsplit `str` string based on given `separator`, iterates over the segments and and transforms them based on requested transformations..

Possible values for `transforms`:
- `trim` or `t`
- `ltrim` or `lt`
- `rtrim` or `rt`
- `upper` or `u` or `up`
- `lower` or `l` or `low`
- `camel` or `c` or `cam`
- `pascal` or `p` or `pas`
- `changecase` or `cc`
- `capitalize` or `c`
- `stringify` or `s`
- `reverse` or `r` or `rev`
- `unstring` or `un`


```javascript
const str = 'London, tehran , toKYO,  istanbuL';
const transforms = 'trim,lower,capitalize'; // or 't,l,cap'
// i.e. trims, lowercases and captalizes each item

// usage 1: direct call
console.log(xsplit(str, ',', transforms));
// usage 2: as an extension method
console.log(str.xsplit(',', transforms));
// usage 3: as static method
console.log(String.xsplit(str, ',', transforms));

/* output:
[
    "London",
    "Tehran",
    "Tokyo",
    "Istanbul"
]
*/
```
