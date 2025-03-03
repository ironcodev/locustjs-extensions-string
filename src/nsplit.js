import { isSomeString, isFunction, isSomeArray } from "@locustjs/base";

function _nsplit(s, separators, callback, level, limit) {
  let result = s.split(separators[0], limit);

  if (separators.length > 1) {
    for (let i = 0; i < result.length; i++) {
      result[i] = _nsplit(
        result[i],
        separators.slice(1),
        callback,
        level + 1,
        limit
      );
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
function nsplit(s, separators, callback, limit) {
  if (isSomeString(s) && isSomeArray(separators)) {
    return _nsplit(s, separators, callback, 0, limit);
  }

  return [];
}

/* examples
		nsplit("a=1&b=ali", '&', '=') or nsplit("a=1&b=ali", ['&', '='])
		output:
		[
			["a",1],
			["b","ali"]
		]
		
		nsplit("a=1:b=ali&a=2:b=reza:c=true&a=3:b=:c=false&b=saeed:c=true", ['&', ':', '='])
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

export default nsplit;
