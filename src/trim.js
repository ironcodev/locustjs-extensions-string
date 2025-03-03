import { isSomeString } from "@locustjs/base";

const ltrim = (x) => (isSomeString(x) ? x.trimLeft() : "");
const rtrim = (x) => (isSomeString(x) ? x.trimRight() : "");

export { ltrim, rtrim };
