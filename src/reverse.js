import { isSomeString } from "@locustjs/base";

const reverse = (x) => (isSomeString(x) ? x.split("").reverse().join("") : "");

export default reverse;
