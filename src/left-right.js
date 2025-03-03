import { isSomeString } from "@locustjs/base";

const left = (x, n) => (isSomeString(x) ? x.substr(0, n) : "");
const right = (x, n) =>
  isSomeString(x) ? (x.length > n ? x.substr(x.length - n, n) : x) : "";

export { left, right };
