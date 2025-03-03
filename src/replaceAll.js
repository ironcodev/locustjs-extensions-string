const replaceAll = (source, find, replace) =>
  source.replace(
    new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"),
    replace
  );

export default replaceAll;
