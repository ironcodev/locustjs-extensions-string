import { isSomeString } from "@locustjs/base";

const utf8Encoder = new TextEncoder();

const toBytes = (x) => isSomeString(x) ? utf8Encoder.encode(x) : new Uint8Array();

export default toBytes;
