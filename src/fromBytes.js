import { isArray } from "@locustjs/base";

const utf8Decoder = new TextDecoder();

const fromBytes = (x) => {
  if (x instanceof Uint8Array) {
    return utf8Decoder.decode(x);
  } else if (isArray(x)) {
    return utf8Decoder.decode(new Uint8Array(x));
  } else {
    return "";
  }
};

export default fromBytes;
