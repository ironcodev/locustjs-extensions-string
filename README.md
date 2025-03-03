# About

This library contains extensions for `string`.

# Install

```
npm i @locustjs/extensions-string
```

# Current version

```
2.0.7
```

# Import

CommonJs

```javascript
var someFn = require("@locustjs/extensions-string").someFn;
```

ES6

```javascript
import { someFn } from "@locustjs/extensions-string";
```

# Usage

string extension methods can be used in three ways.

## 1. Direct call

```javascript
import { replaceAll } from "@locustjs/extensions-string";

const str = "Hello";

console.log(replaceAll(str, "l", "$")); // He$$o
```

**Pros**

- Works on `undefined` variables as well.

**Cons**

- Requires `import`

## 2. As extension method on `string` instances
First, we need to configure the extension method using `configureStringExtensions()` function. This has to be performed only once, like at the start point of the app. Then, we can freely call the extension on any string literal or variable.

```javascript
// app startup
configureStringExtensions("replaceAll,format");

...

let str = "Hello";

console.log(str.replaceAll("l", "$")); // He$$o

str = "Hello {0}";

console.log(str.format("ali")); // Hello ali
```

**Pros**

- Does not require `import`
- More readable code

**Cons**

- Does not work on `undefined` variables

## 3. As static method on `String`

```javascript
const str = "Hello";

console.log(String.replaceAll(str, "l", "$")); // He$$o
```

**Pros**

- Works on `undefined` variables as well.
- Does not require `import`

**Cons**

- More characters to type
- Less readable

# Classes

## `StringBuilder`

A helper class to concatenate strings more efficiently. It uses an internal array, places given strings inside the array, extends array size if needed, joins the array upon calling `toString` method and resets the array.

| **Method/Prop** | **Description** |
|--------|-------------|
| `append(x: any):int` | appends `x` to the internal buffer and returns index of new appended item in the internal buffer |
| `appendAt(index, x: any)` | adds `x` at `index` position in the internal buffer |
| `removeAt(index, count = 1)` | removes `count` items from `index` from the internal buffer |
| `replaceAt(index, item)` | replaces item at `index` position in the internal buffer with `item` |
| `itemAt(index)` | returns item at `index` position in the internal buffer |
| `clear()` | clears/resets internal buffer |
| `toString()` | joins and returns buffered items as a single `string` value and then resets internal buffer |
| `getString(from?, to?)` | joins buffered items starting at `from` index (inclusive, default = 0), ending at `to` index (exclusive, default = count) and returns a `string` value, but does not reset internal buffer |
| `toLower(from?, to?)` | changes items starting at `from` index (inclusive, default = 0), ending at `to` index (exclusive, default = count) to lowercase. It does not reset internal buffer |
| `toUpper(from?, to?)` | changes items starting at `from` index (inclusive, default = 0), ending at `to` index (exclusive, default = count) to uppercase. It does not reset internal buffer |
| `trim(from?, to?)` | trims items starting at `from` index (inclusive, default = 0), ending at `to` index (exclusive, default = count). It does not reset internal buffer |
| `length` | returns total length of buffered content |
| `count` | returns number of appended items in the buffer |

Example 1: basic
```javascript
const sb = new StringBuilder();

sb.append("Hello");
sb.append(" World");
sb.append("\n");
sb.append("Goodbye");

console.log(sb.toString());
/* output:
Hello World
Goodbye
*/
```

We can specify buffer size (length of the temporal array that holds appended items) in the constructor of `StringBuilder`. Default value is 32.

Example 2: bufferSize
```javascript
const sb = new StringBuilder(10);

sb.append("Hello");
sb.append(" World");
sb.append("\n");
sb.append("Goodbye");

console.log(sb.toString());
/* output:
Hello World
Goodbye
*/
```

`StringBuilder.append` returns index of current appended item in the internal buffer. Using this index and `StringBuilder.remove()`, we can later remove items from buffer.

Example 3: appendAt()
```javascript
const sb = new StringBuilder(100);

sb.append("a1");
sb.append("a2");
sb.append("a3");

sb.appendAt(1, "a4");

console.log(sb.toString()); // a1a4a2a3
```

Example 4: removeAt()
```javascript
const sb = new StringBuilder(100);

sb.append("a1");
sb.append("a2");
sb.append("a3");
sb.append("a4");
sb.append("a5");

sb.removeAt(1, 2);

console.log(sb.toString()); // a1a4a5
```

Example 5: replaceAt()
```javascript
const sb = new StringBuilder(100);

sb.append("a1");
sb.append("a2");
sb.append("a3");

sb.replaceAt(1, "a5");

console.log(sb.toString()); // a1a5a3
```

Example 6: getString()
```javascript
const sb = new StringBuilder(100);

sb.append("a1");
sb.append("a2");
sb.append("a3");
sb.append("a4");
sb.append("a5");

console.log(sb.getString()); // a1a2a3a4a5
console.log(sb.getString(2)); // a3a4a5
console.log(sb.getString(1, 4)); // a2a3a4
console.log(sb.getString(4, 1)); // a4a3a2
console.log(sb.getString()); // a1a2a3a4a5
```

# Functions

## `replaceAll(str, find, replace)`

Replaces `find` with `replace` in `str` string.

```javascript
let str = "to be or not to be";

// usage 1: direct call
console.log(replaceAll(str, "to", "2"));
// usage 2: as an extension method
console.log(str.replaceAll("to", "2"));
// usage 3: as static method
console.log(String.replaceAll(str, "to", "2"));

/* output:
2 be or not 2 be
*/
```

## `reverse(str)`

Reverses `str` string.

```javascript
let str = "Hello World";

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
let str = "  Hello  ";

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
let str = "  Hello  ";

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
let str = "Hello";

// usage 1: direct call
console.log(toArray(str));
// usage 2: as an extension method
console.log(str.toArray());
// usage 3: as static method
console.log(String.toArray(str));

/* output:
[72, 101, 108, 108, 111]
*/

str = "علی";

// usage 1: direct call
console.log(toArray(str));
// usage 2: as an extension method
console.log(str.toArray());
// usage 3: as static method
console.log(String.toArray(str));

/* output:
[1593, 1604, 1740]
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
let str = "سلام";

// usage 1: direct call
console.log(toBytes(str));
// usage 2: as an extension method
console.log(str.toBytes());
// usage 3: as static method
console.log(String.toBytes(str));

/* output:
[216, 185, 217, 132, 219, 140]
*/
```

## `fromBytes(arr)`

Converts `arr` byte-array into a string.

```javascript
let arr = new Uint8Array([216, 185, 217, 132, 219, 140]);

// usage 1: direct call
console.log(fromBytes(arr));
// usage 3: as static method
console.log(String.fromBytes(arr));

/* output:
علی
*/
```

## Character type checking

```javascript
// checks if input is only one character
console.log(String.isCharacter("a")); // true
console.log(String.isCharacter("ab")); // false

// punctuation letters: '.', ',', ';', ':', '?', '!', '(', ')', '-', "'", '"', '/', '\\', '{', '}', '[', ']', '%', '#'
console.log(String.isPunctuation(".")); // true
console.log(String.isPunctuation("+")); // false

// control characters: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '|', '<', '>', '?', ':', '{', '}', '[', ']', ';', '"', "'", ',', '.', '/', '-', '=', '\\', '`'
console.log(String.isControl("!")); // true
console.log(String.isControl("a")); // false

// checks if input is an alphabet character, upper or lower.
console.log(String.isAlpha("a")); // true
console.log(String.isAlpha("2")); // false

// isLetter() is the same as isAlpha()
console.log(String.isLetter("a")); // true
console.log(String.isLetter("2")); // false

// checks if input is a lower alphabet character
console.log(String.isLower("a")); // true
console.log(String.isLower("A")); // false

// checks if input is an upper alphabet character
console.log(String.isUpper("A")); // true
console.log(String.isUpper("a")); // false

// checks if input is a digit number 0-9
console.log(String.isDigit("2")); // true
console.log(String.isDigit("a")); // false

// checks if input is an alphabet or digit character
console.log(String.isAlphaNum("a")); // true
console.log(String.isAlphaNum("2")); // true
console.log(String.isAlphaNum("/")); // false

// checks if input is a word string that contains only alphabet, digit or underscore
console.log(String.isWord("abc")); // true
console.log(String.isWord("123")); // true
console.log(String.isWord("a2")); // true
console.log(String.isWord("a b")); // false
console.log(String.isWord("a1 ")); // false

// checks if input is an arithmatic operator: '/', '\\', '+', '-', '(', ')', '%', '^', '*', '++', '--'
console.log(String.isArithmatic("+")); // true
console.log(String.isArithmatic("&")); // false

// checks if input is a logical operator: '&&', '||', '!'
console.log(String.isLogic("&&")); // true
console.log(String.isLogic("&")); // false

// checks if input is a bitwise operator: '&', '|', '>>', '<<'
console.log(String.isBitwise("&")); // true
console.log(String.isBitwise("+")); // false

// checks if input is a comparison operator: '==', '!=', '<>', '>', '<', '>=', '<=', '===', '!=='
console.log(String.isComparison(">")); // true
console.log(String.isComparison("!")); // false

// checks if input is a whitespace character or string
console.log(String.isWhitespace(" ")); // true
console.log(String.isWhitespace("    ")); // true
console.log(String.isWhitespace("\n")); // true
console.log(String.isWhitespace("   \n")); // true
console.log(String.isWhitespace("\t")); // true
console.log(String.isWhitespace("=")); // false

// checks if input is an arithmatic, logical, bitwise or comparison character sequence
console.log(String.isMath("+")); // true
console.log(String.isMath("&")); // true
console.log(String.isMath("&&")); // true
console.log(String.isMath(">")); // true
console.log(String.isMath("<=")); // true
console.log(String.isMath("!")); // true
console.log(String.isMath("/")); // true
console.log(String.isMath("||")); // true
console.log(String.isMath("|")); // false
```

## `stringify(str, char = '"')`

Adds string characters to both sides of `str` string.

```javascript
let str = "Hello";

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
let str = "Google Play";

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

## `pascalCase(str, replacer)`

Turns first letters of words into uppercase in `str` string and removes other none-alphabetic characters.

Example 1:
```javascript
let str = "an introduction to javascript";

// usage 1: direct call
console.log(pascalCase(str));
// usage 2: as an extension method
console.log(str.pascalCase());
// usage 3: as static method
console.log(String.pascalCase(str));

/* output:
AnIntroductionToJavascript
*/
```

It is also possible to prevent removal of non-alpha characters.

Example 2:
```javascript
let str = "an introduction to javascript";

// usage 1: direct call
console.log(pascalCase(str, false));
// usage 2: as an extension method
console.log(str.pascalCase(false));
// usage 3: as static method
console.log(String.pascalCase(str, false));

/* output:
An Introduction To Javascript
*/
```

Using the second parameter, we can specify a `replacer` to be used to replace non-alpha characters.

Example 3:
```javascript
let str = "an introduction to javascript";

// usage 1: direct call
console.log(pascalCase(str, '-'));
// usage 2: as an extension method
console.log(str.pascalCase('-'));
// usage 3: as static method
console.log(String.pascalCase(str, '-'));

/* output:
An-Introduction-To-Javascript
*/
```

## `camelCase(str, replacer)`

Turns first letters of words into uppercase in `str` string except first word and removes other none-alphabetic characters.

```javascript
let str = "an introduction to javascript";

// usage 1: direct call
console.log(camelCase(str));
// usage 2: as an extension method
console.log(str.camelCase());
// usage 3: as static method
console.log(String.camelCase(str));

/* output:
anIntroductionToJavascript
*/
```

Example 2:
```javascript
let str = "an introduction to javascript";

// usage 1: direct call
console.log(camelCase(str, false));
// usage 2: as an extension method
console.log(str.camelCase(false));
// usage 3: as static method
console.log(String.camelCase(str, false));

/* output:
an Introduction To Javascript
*/
```

Example 3:
```javascript
let str = "an introduction to javascript";

// usage 1: direct call
console.log(camelCase(str, '-'));
// usage 2: as an extension method
console.log(str.camelCase('-'));
// usage 3: as static method
console.log(String.camelCase(str, '-'));

/* output:
an-Introduction-To-Javascript
*/
```

## `capitalize(str)`

Turns first letters of words into uppercase in `str` string.

```javascript
let str = "to be or not to be";

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

Returns `n` characters from left-side of `str`.

```javascript
let str = "abcdefgh";

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

Returns `n` characters from right-side of `str`.

```javascript
let str = "abcdefgh";

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

Formats given `str` based on given `args` arguments.

Example 1:

```javascript
const pattern = "My name is {0}; I am {1} years old.";

// usage 1: direct call
console.log(format(pattern, "John", 23));
// usage 2: as an extension method
console.log(pattern.format("John", 23));
// usage 3: as static method
console.log(String.format(pattern, "John", 23));

/* output:
My name is John; I am 23 years old.
*/
```

Example 2:

```javascript
const pattern = "My name is {name}; I am {age} years old.";
const arg = { name: "John", age: 23 };
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

Example 3:

```javascript
const pattern = `{{ and }} characters are used for escaping.
example: format("hello {{name}}", {{ name: '{name}' }})
result: hello {name}
`;
const arg = { name: "John" };
// usage 1: direct call
console.log(format(pattern, arg));
// usage 2: as an extension method
console.log(pattern.format(arg));
// usage 3: as static method
console.log(String.format(pattern, arg));

/* output:
{ and } characters are used for escaping.
example: format("hello {name}", { name: 'John' })
result: hello John
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

Example 1:
```javascript
const str = "a=10&b=john";

// usage 1: direct call
console.log(nsplit(str, ["&", "="]));
// usage 2: as an extension method
console.log(str.nsplit(["&", "="]));
// usage 3: as static method
console.log(String.nsplit(str, ["&", "="]));

/* output:
[
    ['a', '10'],
    ['b', 'john']
]
*/
```

Example 2:
```javascript
const str = "name=ali%20reza&age=23";
const result = nsplit(str, ['&', '='], ({ level, value }) => level == 1 ? decodeURI(value): value);

console.log(result);

/* output:
[
    ['name', 'ali reza'],
    ['age', '23']
]
*/
```

## `xsplit(str, separator, ...transforms)`

nsplit `str` string based on given `separator`, iterates over the segments and and transforms them based on requested transformations..

Possible `transforms`:

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
- `htmlencode` or `he`
- `htmldecode` or `hd`
- `urlencode` or `ue`
- `urldecode` or `ud`
- `free` or `f`

```javascript
const str = "   London, tehran  ,  ,, toKYO,,  istanbuL,";

// we want to remove empty strings, trim, lowercase and captalize items
// usage 1: direct call
console.log(xsplit(str, ",", "free","trim","lower","capitalize"));
console.log(xsplit(str, ",", "free,trim,lower,capitalize"));

// usage 2: as an extension method
console.log(str.xsplit(",", "f","t","l","cap"));  // same result
console.log(str.xsplit(",", "f,t,l,cap"));  // same result

// usage 3: as static method
console.log(String.xsplit(str, ",", "f,t,l,cap"));

/* output:
[
    "London",
    "Tehran",
    "Tokyo",
    "Istanbul"
]
*/
```
