import { isSomeString } from "@locustjs/base";
import { stringify, unString } from "../index.esm.js";

const tests = [
  [
    "stringify",
    function (expect) {
      const x = stringify("abc");

      expect(x).toBeDefined();
      expect(isSomeString(x)).toBeTrue();
      expect(x).toBe('"abc"');
    },
  ],
  [
    "unString",
    function (expect) {
      const x = unString("'abc'");

      expect(x).toBeDefined();
      expect(isSomeString(x)).toBeTrue();
      expect(x).toBe('abc');
    },
  ],
];

export default tests;